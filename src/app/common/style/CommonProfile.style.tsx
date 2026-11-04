import { Typography } from '@mui/material';
import { FilterColumn, FilterPopover } from '@/app/common/style/CommonFilter.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import { styled } from '@mui/material/styles';

/** 세 칸 통계의 크기. md 는 프로필 팝오버, lg 는 프로필 머리(마이페이지, 타인 프로필) */
type ProfileStatSize = 'md' | 'lg';

/**
* 프로필 팝오버 (GNB 내 사진, 커뮤니티 작성자). 투명한 바깥 틀과 누른 자리와의 간격이 필터 팝오버와 같아서 더하는 값 없이 이어받는다
* */
export const ProfilePopover = styled(FilterPopover)({});

/**
* 프로필 팝오버 카드. 면, 선, 모서리, 그림자는 필터 목록 카드와 같고, 폭은 검색어 칸과 같다.
* 안쪽은 사진과 이름, 자기소개, 세 칸, 버튼 줄을 세로로 쌓는다
* */
export const ProfilePopoverCard = styled(FilterColumn)(({ theme }) => ({
  width: theme.spacing(35),
  maxHeight: 'none',
  overflowY: 'visible',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

/**
* 프로필 팝오버 카드 맨 위의 사진과 닉네임 줄. 사진과 닉네임 사이는 카드 안 줄 사이와 같은 간격이다
* */
export const ProfilePopoverHead = styled(Row)(({ theme }) => ({
  gap: theme.spacing(2),
}));

/**
* 글, 댓글, 가입을 같은 폭 세 칸으로 나눈다. 맨 위에 구분선을 긋는다
* */
export const ProfileStatsRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

/**
* 이름표(위)와 값(아래)을 가운데로 쌓는 칸. 칸 사이에 옅은 세로선을 긋는다. 구분선과의 간격은 크기마다 다르다
* */
export const ProfileStat = styled('div', { shouldForwardProp: (prop) => prop !== 'size' })<{ size: ProfileStatSize }>(
  ({ theme, size }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(0.25),
    padding: size === 'lg' ? theme.spacing(2, 1, 0) : theme.spacing(1, 1, 0),
    '&:not(:first-of-type)': {
      borderLeft: `1px solid ${theme.palette.lineSubtle}`,
    },
  }),
);

/**
* 글, 댓글 수. 크고 굵은 고정폭 글꼴
* */
export const ProfileStatNumber = styled(Typography, { shouldForwardProp: (prop) => prop !== 'size' })<{ size: ProfileStatSize }>(
  ({ theme, size }) => ({
    ...theme.typography.mono,
    fontSize: size === 'lg' ? '1.75rem' : '1.125rem',
    fontWeight: 700,
    lineHeight: 1.2,
  }),
);

/**
* 가입일. 숫자 칸보다 작은 글자이고, 칸 높이가 같도록 줄 높이를 글자 크기에 비례해 맞춘다
* (lg: 1.75 × 1.2 ÷ 1.25, md: 1.125 × 1.2 ÷ 0.875)
* */
export const ProfileStatDate = styled(Typography, { shouldForwardProp: (prop) => prop !== 'size' })<{ size: ProfileStatSize }>(
  ({ size }) => ({
    fontSize: size === 'lg' ? '1.25rem' : '0.875rem',
    fontWeight: 500,
    lineHeight: size === 'lg' ? 1.68 : 1.543,
  }),
);
