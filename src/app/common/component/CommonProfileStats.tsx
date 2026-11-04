import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import type { UserProfile } from '@/app/auth/interface/UserProfile';
import { ProfileStat, ProfileStatDate, ProfileStatNumber, ProfileStatsRow } from '@/app/common/style/CommonProfile.style';
import { Highlight } from '@/app/common/style/CommonText.style';

/** 크기마다 이름표(글, 댓글, 가입) 글자 */
const LABEL_VARIANT = {
  md: 'caption',
  lg: 'body2',
} as const;

interface CommonProfileStatsProps {
  /** 보여 줄 프로필 (글 수, 댓글 수, 가입일을 쓴다) */
  profile: UserProfile;

  /** md 는 프로필 팝오버, lg 는 프로필 머리(마이페이지, 타인 프로필) */
  size: 'md' | 'lg';
}

/**
 * 프로필의 글, 댓글, 가입 세 칸. 프로필 머리와 프로필 팝오버가 같이 쓰고, 크기만 다르다.
 */
const CommonProfileStats = ({ profile, size }: CommonProfileStatsProps) => {
  const labelVariant = LABEL_VARIANT[size];

  return (
    <ProfileStatsRow>
      <ProfileStat size={size}>
        <Typography variant={labelVariant}>
          <Highlight>글</Highlight>
        </Typography>
        <ProfileStatNumber size={size}>{profile.postCount}</ProfileStatNumber>
      </ProfileStat>
      <ProfileStat size={size}>
        <Typography variant={labelVariant}>
          <Highlight>댓글</Highlight>
        </Typography>
        <ProfileStatNumber size={size}>{profile.commentCount}</ProfileStatNumber>
      </ProfileStat>
      <ProfileStat size={size}>
        <Typography variant={labelVariant}>
          <Highlight>가입</Highlight>
        </Typography>
        <ProfileStatDate size={size}>{dayjs(profile.createdAt).format('YYYY.MM.DD')}</ProfileStatDate>
      </ProfileStat>
    </ProfileStatsRow>
  );
};

export default CommonProfileStats;
