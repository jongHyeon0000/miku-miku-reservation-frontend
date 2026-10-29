import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
* 가로 한 줄 (세로 가운데 정렬, 요소 사이 기본 간격). 버튼 묶음, 아이콘+글자 줄 등에 쓴다
* */
export const Row = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

/**
* 세로로 쌓는 작은 묶음 (요소 사이 간격이 좁아서 서로 붙은 한 덩어리로 보인다. 예산의 이름과 막대, 이름과 큰 숫자)
* */
export const GroupStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
  minWidth: 0,
}));

/**
* 양 끝 정렬 한 줄 (왼쪽 묶음, 오른쪽 묶음). 필터 줄, 패널 머리글 등에 쓴다
* */
export const SpreadRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));

/**
* 오른쪽 정렬 한 줄 (폼 맨 아래 버튼 줄 등)
* */
export const EndRow = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

/**
* 왼쪽 2 : 오른쪽 1 두 열 배치 (좁은 화면에서는 한 열). 상세, 폼, 마이페이지가 같이 쓴다. 왼쪽은 정보, 오른쪽은 썸네일 쪽
* */
export const SplitLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
  },
}));

/**
* SplitLayout 의 오른쪽 열 (위 칸은 내용 높이, 아래 칸은 남는 높이를 채운다)
* */
export const SideColumn = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: theme.spacing(2),
}));
