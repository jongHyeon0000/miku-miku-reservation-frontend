import { useEffect, useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tab } from '@mui/material';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import ThumbnailUploader from '@/app/common/component/ThumbnailUploader';
import type { ThumbnailChange } from '@/app/common/interface/ThumbnailChange';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { EndRow } from '@/app/common/style/CommonLayout.style';
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style';
import { UnderlineTabs } from '@/app/common/style/CommonTabs.style';
import useDeleteThumbnail from '@/app/common/service/useDeleteThumbnail';
import useUploadThumbnail from '@/app/common/service/useUploadThumbnail';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import type { ChangePasswordRequestBody } from '@/app/auth/interface/ChangePasswordRequestBody';
import type { UpdateProfileRequestBody } from '@/app/auth/interface/UpdateProfileRequestBody';
import useAuth from '@/app/auth/service/useAuth';
import useChangePassword from '@/app/auth/service/useChangePassword';
import useReadMe from '@/app/auth/service/useReadMe';
import useUpdateProfile from '@/app/auth/service/useUpdateProfile';
import useWithdraw from '@/app/auth/service/useWithdraw';
import ChangePasswordDialog from '@/app/my-page/component/ChangePasswordDialog';
import EditProfileDialog from '@/app/my-page/component/EditProfileDialog';
import ProfileHeader from '@/app/my-page/component/ProfileHeader';
import ProfileView from '@/app/my-page/component/ProfileView';
import UserCommentList from '@/app/my-page/component/UserCommentList';
import UserPostList from '@/app/my-page/component/UserPostList';
import WithdrawForm from '@/app/my-page/component/WithdrawForm';
import { isMyPageTabKey, MY_PAGE_TABS, type MyPageTabKey } from '@/app/my-page/constant/myPageTab';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

const WITHDRAW_ALERT = {
  title: '정말 탈퇴할까요?',
  text: '모든 상품, 분류, 이미지가 삭제되고 되돌릴 수 없어요.',
  confirmText: '탈퇴',
};

/**
 * 마이페이지 (/my-page)
 * 위에 프로필 머리(이미지 포함)가 항상 보이고, 아래 내 정보, 최근 글, 최근 답변, 회원 탈퇴를 탭으로 나눈다. 탭은 주소 없이 화면 상태로만 바꾼다. 열릴 때 내 정보를 다시 읽어 글, 답변 수를 최신으로 맞춘다.
 */
const MyPagePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { meLoading, fetchReadMe } = useReadMe();
  const { uploadThumbnailLoading, fetchUploadThumbnail } = useUploadThumbnail();
  const { deleteThumbnailLoading, fetchDeleteThumbnail } = useDeleteThumbnail();
  const { withdrawLoading, fetchWithdraw } = useWithdraw();
  const { updateProfileLoading, fetchUpdateProfile } = useUpdateProfile();
  const { changePasswordLoading, fetchChangePassword } = useChangePassword();
  const showResult = useUiStore((state) => state.showResult);
  const [tab, setTab] = useState<MyPageTabKey>('PROFILE');
  const [thumbnail, setThumbnail] = useState<ThumbnailChange>({ type: 'none' });
  const [profileDialogOpen, setProfileDialogOpen] = useState<boolean>(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState<boolean>(false);

  /* 마이페이지가 열릴 때마다 내 정보를 다시 읽는다(커뮤니티에서 글을 쓰고 돌아오면 글, 답변 수가 바뀌어 있어야 한다) */
  useEffect(() => {
    fetchReadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageLoading = uploadThumbnailLoading || deleteThumbnailLoading || meLoading;

  const handleTabChange = (_event: SyntheticEvent, value: string) => {
    if (isMyPageTabKey(value)) {
      setTab(value);
    }
  };

  /* 고른 프로필 이미지를 올리거나 지우고, 헤더 아이콘도 바뀌도록 내 정보를 다시 불러온다 */
  const handleThumbnailSave = async () => {
    if (thumbnail.type === 'none') {
      return;
    }

    const res =
      thumbnail.type === 'upload'
        ? await fetchUploadThumbnail('user', user!.userId, thumbnail.file)
        : await fetchDeleteThumbnail('user', user!.userId);
    showResult(res);

    if (res.code !== API_CODE.OK) {
      return;
    }

    setThumbnail({ type: 'none' });
    await fetchReadMe();
  };

  /* 성공하면 창을 닫는다. 내 정보는 훅이 응답으로 이미 바꿨다 */
  const handleUpdateProfile = async (body: UpdateProfileRequestBody) => {
    const res = await fetchUpdateProfile(body);
    showResult(res);

    if (res.code === API_CODE.OK) {
      setProfileDialogOpen(false);
    }
  };

  /* 성공하면 창을 닫는다. 로그인 상태는 그대로 유지된다(기존 토큰이 계속 유효) */
  const handleChangePassword = async (body: ChangePasswordRequestBody) => {
    const res = await fetchChangePassword(body);
    showResult(res);

    if (res.code === API_CODE.OK) {
      setPasswordDialogOpen(false);
    }
  };

  const handleWithdraw = async (password: string) => {
    const confirmed = await showConfirmAlert({ ...WITHDRAW_ALERT, danger: true, focusCancel: true });

    if (!confirmed) {
      return;
    }

    const res = await fetchWithdraw(password);
    showResult(res);

    if (res.code !== API_CODE.OK) {
      return;
    }

    logout();
    navigate('/intro', { replace: true });
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          마이페이지
        </PageTitle>
      </PageHeader>

      <ProfileHeader
        name={user!.name}
        biography={user!.biography}
        postCount={user!.postCount}
        commentCount={user!.commentCount}
        createdAt={user!.createdAt}
        media={
          <FieldStack>
            <ThumbnailUploader currentUrl={user!.thumbnailUrl} value={thumbnail} onChange={setThumbnail} disabled={imageLoading} />
            <EndRow>
              <Button variant="contained" disabled={imageLoading || thumbnail.type === 'none'} onClick={handleThumbnailSave}>
                이미지 저장
              </Button>
            </EndRow>
          </FieldStack>
        }
        actions={<TonalButton onClick={() => setProfileDialogOpen(true)}>프로필 수정</TonalButton>}
      />

      <UnderlineTabs value={tab} onChange={handleTabChange}>
        {Object.entries(MY_PAGE_TABS).map(([key, name]) => (
          <Tab key={key} value={key} label={name} />
        ))}
      </UnderlineTabs>

      {tab === 'PROFILE' && <ProfileView user={user!} onChangePassword={() => setPasswordDialogOpen(true)} />}
      {tab === 'POSTS' && <UserPostList user={user!} />}
      {tab === 'COMMENTS' && <UserCommentList userId={user!.userId} />}
      {tab === 'WITHDRAW' && <WithdrawForm loading={withdrawLoading} onSubmit={handleWithdraw} />}

      {profileDialogOpen && (
        <EditProfileDialog
          currentName={user!.name}
          currentBiography={user!.biography ? user!.biography : ''}
          loading={updateProfileLoading}
          onSubmit={handleUpdateProfile}
          onClose={() => setProfileDialogOpen(false)}
        />
      )}
      {passwordDialogOpen && (
        <ChangePasswordDialog
          loading={changePasswordLoading}
          onSubmit={handleChangePassword}
          onClose={() => setPasswordDialogOpen(false)}
        />
      )}

      <LoadingOverlay open={imageLoading || withdrawLoading} />
    </PageContainer>
  );
};

export default MyPagePage;
