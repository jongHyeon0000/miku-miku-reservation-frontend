import { useNavigate } from 'react-router-dom';
import CommonProfilePopover from '@/app/common/component/CommonProfilePopover';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import useAuth from '@/app/auth/service/useAuth';
import useReadUserProfile from '@/app/my-page/service/useReadUserProfile';
import { API_CODE } from '@/config/axios/constant/apiCode';

interface PostAuthorPopoverProps {
  /** 작성자 id */
  userId: number;

  /** 누른 자리 (작성자 사진이나 이름). null 이면 닫혀 있다 */
  anchorEl: HTMLElement | null;

  /** 닫을 때 */
  onClose: () => void;
}

/**
 * 글과 댓글 작성자의 프로필 팝오버. 열릴 때 그 사람 프로필을 읽고(읽는 동안 화면 로딩), 실패하면 카드 안에 실패 화면을 보여 준다.
 * 버튼은 하나이고, 내 프로필이면 "내 프로필 보기"(마이페이지), 남이면 "프로필 보기"(타인 프로필)로 간다.
 */
const PostAuthorPopover = ({ userId, anchorEl, onClose }: PostAuthorPopoverProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMine = user !== null && user.userId === userId;
  const { userProfile, userProfileLoading, fetchReadUserProfile } = useReadUserProfile(userId, anchorEl !== null);

  if (userProfileLoading) {
    return <LoadingOverlay open />;
  }

  const handleOpenProfile = () => {
    onClose();

    if (isMine) {
      navigate('/my-page');
      return;
    }

    navigate(`/profile/${userId}`);
  };

  const isOk = userProfile !== undefined && userProfile.code === API_CODE.OK;
  const profile = isOk ? userProfile.data : null;
  const message = userProfile === undefined ? '프로필을 불러오지 못했어요' : userProfile.message;

  return (
    <CommonProfilePopover
      anchorEl={anchorEl}
      align="left"
      onClose={onClose}
      profile={profile}
      fallback={<ErrorView message={message} onRetry={fetchReadUserProfile} />}
      actions={
        <TonalButton fullWidth onClick={handleOpenProfile}>
          {isMine ? '내 프로필 보기' : '프로필 보기'}
        </TonalButton>
      }
    />
  );
};

export default PostAuthorPopover;
