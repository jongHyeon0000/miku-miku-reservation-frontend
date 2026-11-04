import { useState, type SyntheticEvent } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Tab } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { FillImage, StateIcon, ThumbFrame } from '@/app/common/style/CommonMedia.style';
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style';
import { UnderlineTabs } from '@/app/common/style/CommonTabs.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import useAuth from '@/app/auth/service/useAuth';
import ProfileHeader from '@/app/my-page/component/ProfileHeader';
import UserCommentList from '@/app/my-page/component/UserCommentList';
import UserPostList from '@/app/my-page/component/UserPostList';
import { isUserProfileTabKey, USER_PROFILE_TABS, type UserProfileTabKey } from '@/app/my-page/constant/myPageTab';
import useReadUserProfile from '@/app/my-page/service/useReadUserProfile';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 타인 프로필 (/profile/:userId)
 * 마이페이지와 같은 프로필 머리를 보기 전용으로 쓰고(사진만, 버튼 없음), 아래 최근 글, 최근 댓글을 탭으로 나눈다.
 * 내 id 로 들어오면 마이페이지로 보낸다.
 */
const UserProfilePage = () => {
  const userId = Number(useParams().userId);
  const { user } = useAuth();
  const isMine = user !== null && user.userId === userId;

  const { userProfile, userProfileLoading, fetchReadUserProfile } = useReadUserProfile(userId, !isMine);
  const [tab, setTab] = useState<UserProfileTabKey>('POSTS');

  const handleTabChange = (_event: SyntheticEvent, value: string) => {
    if (isUserProfileTabKey(value)) {
      setTab(value);
    }
  };

  if (isMine) {
    return <Navigate to="/my-page" replace />;
  }

  if (userProfileLoading) {
    return <LoadingOverlay open />;
  }

  if (userProfile === undefined || userProfile.code !== API_CODE.OK || userProfile.data === null) {
    const message = userProfile === undefined ? '프로필을 불러오지 못했어요' : userProfile.message;
    return (
      <PageContainer>
        <ErrorView message={message} onRetry={fetchReadUserProfile} />
      </PageContainer>
    );
  }

  const profile = userProfile.data;

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          프로필
        </PageTitle>
      </PageHeader>

      <ProfileHeader
        profile={profile}
        media={
          <ThumbFrame>
            {profile.thumbnailUrl ? (
              <FillImage src={imageUrl(profile.thumbnailUrl)} alt={profile.name} />
            ) : (
              <StateIcon size="lg">
                <ImageOutlinedIcon fontSize="inherit" color="disabled" />
              </StateIcon>
            )}
          </ThumbFrame>
        }
      />

      <UnderlineTabs value={tab} onChange={handleTabChange}>
        {Object.entries(USER_PROFILE_TABS).map(([key, name]) => (
          <Tab key={key} value={key} label={name} />
        ))}
      </UnderlineTabs>

      {tab === 'POSTS' && <UserPostList user={profile} />}
      {tab === 'COMMENTS' && <UserCommentList userId={profile.userId} />}
    </PageContainer>
  );
};

export default UserProfilePage;
