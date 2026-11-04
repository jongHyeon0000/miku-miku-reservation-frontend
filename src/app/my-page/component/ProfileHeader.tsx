import type { ReactNode } from 'react';
import { Typography } from '@mui/material';
import type { UserProfile } from '@/app/auth/interface/UserProfile';
import CommonProfileStats from '@/app/common/component/CommonProfileStats';
import { ColumnCard } from '@/app/common/style/CommonCard.style';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { styled } from '@mui/material/styles';

interface ProfileHeaderProps {
  /** 보여 줄 프로필 (닉네임, 자기소개, 글 수, 댓글 수, 가입일). 마이페이지는 내 정보, 타인 프로필은 그 사람 프로필. 자기소개가 없으면 비어 보인다 */
  profile: UserProfile;

  /** 사진 자리 (내 프로필은 업로더와 저장 버튼, 남의 프로필은 사진만) */
  media: ReactNode;

  /** 닉네임 줄 오른쪽 끝에 둘 버튼 (내 프로필만 수정 버튼, 남의 프로필은 비워 둔다) */
  actions?: ReactNode;
}

/**
 * 프로필 머리 카드. 왼쪽은 사진 자리, 오른쪽은 닉네임, 자기소개, 글, 댓글, 가입일.
 * 고치는 부분(업로더, 버튼)은 밖에서 꽂아서, 남의 프로필에서도 같은 모양으로 쓸 수 있다.
 */
const ProfileHeader = ({ profile, media, actions }: ProfileHeaderProps) => {
  return (
    <HeaderCard>
      <div>{media}</div>
      <Content>
        <SpreadRow>
          <div>
            <Typography>
              <Highlight>닉네임</Highlight>
            </Typography>
            <Typography variant="h4" component="p">
              {profile.name}
            </Typography>
          </div>
          {actions}
        </SpreadRow>
        <div>
          <Typography>
            <Highlight>자기소개</Highlight>
          </Typography>
          <Biography>{profile.biography}</Biography>
        </div>
        <CommonProfileStats profile={profile} size="lg" />
      </Content>
    </HeaderCard>
  );
};

export default ProfileHeader;

/** ───────── styles ───────── */

/** 사진 열 1 : 내용 열 3 (좁은 화면에서는 한 열). 아래 탭과 같은 간격을 띄운다 */
const HeaderCard = styled(ColumnCard)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)',
  },
}));

/** 내용 열 안의 줄들을 세로로 쌓는다 */
const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minWidth: 0,
}));

/** 자기소개 글은 이름표보다 조금 크게 보인다 */
const Biography = styled(Typography)({
  fontSize: '1.125rem',
});
