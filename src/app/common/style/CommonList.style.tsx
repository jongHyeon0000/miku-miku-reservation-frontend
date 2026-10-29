import { Box, Button, Checkbox } from '@mui/material';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { alpha, styled } from '@mui/material/styles';

/** 목록을 담는 패널 (분류 목록, 템플릿 목록, 게시판 목록이 같이 쓴다) */
export const Panel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.cardRadius,
  overflow: 'hidden',
}));

/** 패널 안 한 줄. 줄무늬와 마우스 올림 색이 있다 */
export const RowBox = styled(SpreadRow)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  /* 줄무늬: 같은 부모 안에서 홀수/짝수 줄 색을 번갈아 쓴다 (부모는 이 줄들만 담는 상자여야 한다) */
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.rowStripe },
  '&:nth-of-type(even)': { backgroundColor: theme.palette.rowStripeAlt },
  '&:hover': { backgroundColor: theme.palette.rowHover },
}));

/** 패널 머리 칸 아래의 본문 묶음 (안쪽 여백을 두고 칸들을 세로로 쌓는다. 예산의 이번 기간, 예산 설정이 같이 쓴다) */
export const PanelBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
}));

/** 선택 모드의 체크칸 (상품 카드, 분류 줄이 같이 쓴다). 줄 세로 가운데에 둔다 */
export const SelectCheck = styled(Checkbox)(({ theme }) => ({
  alignSelf: 'center',
  marginLeft: theme.spacing(1),
}));

/** 패널 아래쪽에 붙는 칸 (하위 추가 칸). 위에 선이 있다 */
export const AddRow = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

/** 목록과 하위 추가 칸 사이의 쪽 번호 칸. 패널 맨 위 칸과 같은 어두운 면에 하위 추가 칸과 같은 여백과 선 */
export const PagerRow = styled(AddRow)(({ theme }) => ({
  backgroundColor: theme.palette.surfaceSunken,
}));

/** 목록에 줄을 더 넣는 자리처럼 보이는 점선 칸 (분류 하위 추가, 예산 증감 추가가 같이 쓴다) */
export const AddButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 0),
  borderStyle: 'dashed',
  borderColor: alpha(theme.palette.primary.main, 0.5),
  '&:hover': { borderStyle: 'dashed' },
}));
