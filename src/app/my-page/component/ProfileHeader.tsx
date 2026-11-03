import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { ColumnCard } from '@/app/common/style/CommonCard.style';
import { Row, SpreadRow } from '@/app/common/style/CommonLayout.style';
import { LabelText, ValueText } from '@/app/common/style/CommonText.style';
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
            <LabelText>닉네임</LabelText>
            <Typography variant="h4" component="p">
              {name}
            </Typography>
          </div>
          {actions}
        </SpreadRow>
        <div>
          <LabelText>자기소개</LabelText>
          <Typography>{biography}</Typography>
        </div>
        <StatsRow>
          <Typography color="text.secondary">
            글 <ValueText>{postCount}</ValueText>
          </Typography>
          <Typography color="text.secondary">
            답변 <ValueText>{commentCount}</ValueText>
          </Typography>
          <Typography color="text.secondary">
            가입 <ValueText>{dayjs(createdAt).format('YYYY.MM.DD')}</ValueText>
          </Typography>
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

/** 글, 답변, 가입일을 한 줄에 둔다. 맨 위에 구분선을 긋는다 */
const StatsRow = styled(Row)(({ theme }) => ({
  gap: theme.spacing(3),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));
