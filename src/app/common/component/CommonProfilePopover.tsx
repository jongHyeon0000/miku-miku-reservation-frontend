import type { ReactNode } from 'react';
import { Typography } from '@mui/material';
import type { UserProfile } from '@/app/auth/interface/UserProfile';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import CommonProfileStats from '@/app/common/component/CommonProfileStats';
import { ProfilePopover, ProfilePopoverCard, ProfilePopoverHead } from '@/app/common/style/CommonProfile.style';
import { ClampText } from '@/app/common/style/CommonText.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';

interface CommonProfilePopoverProps {
  /** 누른 자리 (사진이나 이름). null 이면 닫혀 있다 */
  anchorEl: HTMLElement | null;

  /** 누른 자리의 어느 쪽 끝에 맞출지 (GNB 는 오른쪽, 커뮤니티 작성자는 왼쪽) */
  align: 'left' | 'right';

  /** 바깥을 누르거나 Esc 를 눌렀을 때 */
  onClose: () => void;

  /** 보여 줄 프로필. 내 정보(UserInfo)도 그대로 넘길 수 있다. null 이면 fallback 을 보여 준다 */
  profile: UserProfile | null;

  /** 프로필이 없을 때(읽기 실패) 카드 안에 보여 줄 것 */
  fallback?: ReactNode;

  /** 카드 맨 아래 버튼 줄 (프로필 보기, 로그아웃 등) */
  actions?: ReactNode;
}

/**
 * 프로필 팝오버 (GNB 내 사진, 커뮤니티 글과 댓글 작성자). 누른 자리 아래에 작은 카드가 뜬다.
 * 카드: 사진과 닉네임, 자기소개 두 줄(없으면 줄째 숨김), 글, 댓글, 가입 세 칸, 맨 아래 버튼 줄. 세 칸은 프로필 머리와 같은 모양을 작게 쓴다.
 */
const CommonProfilePopover = ({ anchorEl, align, onClose, profile, fallback, actions }: CommonProfilePopoverProps) => {
  return (
    <ProfilePopover
      open={anchorEl !== null}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: align }}
      transformOrigin={{ vertical: 'top', horizontal: align }}
    >
      <ProfilePopoverCard>{profile === null ? fallback : <ProfileCardBody profile={profile} actions={actions} />}</ProfilePopoverCard>
    </ProfilePopover>
  );
};

interface ProfileCardBodyProps {
  /** 보여 줄 프로필 */
  profile: UserProfile;

  /** 맨 아래 버튼 줄 */
  actions?: ReactNode;
}

/** 프로필 카드 안쪽 */
const ProfileCardBody = ({ profile, actions }: ProfileCardBodyProps) => {
  return (
    <>
      <ProfilePopoverHead>
        <ThumbAvatar size="lg" src={imageUrl(profile.thumbnailUrl)} />
        <Typography variant="h6" component="p">
          {profile.name}
        </Typography>
      </ProfilePopoverHead>
      {profile.biography && <ClampText variant="body2">{profile.biography}</ClampText>}
      <CommonProfileStats profile={profile} size="md" />
      {actions}
    </>
  );
};

export default CommonProfilePopover;
