import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { ColumnCard } from '@/app/common/style/CommonCard.style';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { styled } from '@mui/material/styles';

interface ProfileHeaderProps {
  /** 닉네임 */
  name: string;

  /** 자기소개. 없으면 비어 보인다 */
  biography?: string;

  /** 쓴 글 수 */
  postCount: number;

  /** 쓴 답변 수 */
  commentCount: number;

  /** 가입 일시 */
  createdAt: string;

  /** 사진 자리 (내 프로필은 업로더와 저장 버튼, 남의 프로필은 사진만) */
  media: ReactNode;

  /** 닉네임 줄 오른쪽 끝에 둘 버튼 (내 프로필만 수정 버튼, 남의 프로필은 비워 둔다) */
  actions?: ReactNode;
}

/**
 * 프로필 머리 카드. 왼쪽은 사진 자리, 오른쪽은 닉네임, 자기소개, 글, 답변, 가입일.
 * 고치는 부분(업로더, 버튼)은 밖에서 꽂아서, 남의 프로필에서도 같은 모양으로 쓸 수 있다.
 */
const ProfileHeader = ({ name, biography, postCount, commentCount, createdAt, media, actions }: ProfileHeaderProps) => {
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
              {name}
            </Typography>
          </div>
          {actions}
        </SpreadRow>
        <div>
          <Typography>
            <Highlight>자기소개</Highlight>
          </Typography>
          <Biography>{biography}</Biography>
        </div>
        <StatsRow>
          <Stat>
            <Typography variant="body2">
              <Highlight>글</Highlight>
            </Typography>
            <StatNumber>{postCount}</StatNumber>
          </Stat>
          <Stat>
            <Typography variant="body2">
              <Highlight>답변</Highlight>
            </Typography>
            <StatNumber>{commentCount}</StatNumber>
          </Stat>
          <Stat>
            <Typography variant="body2">
              <Highlight>가입</Highlight>
            </Typography>
            <StatDate>{dayjs(createdAt).format('YYYY.MM.DD')}</StatDate>
          </Stat>
        </StatsRow>
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

/** 글, 답변, 가입을 같은 폭 세 칸으로 나눈다. 맨 위에 구분선을 긋는다 */
const StatsRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

/** 이름표(위)와 값(아래)을 가운데로 쌓는 칸. 칸 사이에 옅은 세로선을 긋는다 */
const Stat = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.25),
  padding: theme.spacing(2, 1, 0),
  '&:not(:first-of-type)': {
    borderLeft: `1px solid ${theme.palette.lineSubtle}`,
  },
}));

/** 글, 답변 수. 크고 굵은 고정폭 글꼴 */
const StatNumber = styled(Typography)(({ theme }) => ({
  ...theme.typography.mono,
  fontSize: '1.75rem',
  fontWeight: 700,
  lineHeight: 1.2,
}));

/** 가입일. 숫자 칸보다 작은 글자이고, 칸 높이가 같도록 줄 높이를 글자 크기에 비례해 맞춘다(1.75 × 1.2 ÷ 1.25) */
const StatDate = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 500,
  lineHeight: 1.68,
});
