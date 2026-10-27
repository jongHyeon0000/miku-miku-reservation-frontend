import { Box, Button } from '@mui/material';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { alpha, styled } from '@mui/material/styles';

/** 분류 목록 패널 배치 (5개 축이 같은 모양을 쓴다) */
export const TreeLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '240px 1fr',
  gap: theme.spacing(2),
  alignItems: 'start',
}));

export const PanelHeader = styled(SpreadRow)(({ theme }) => ({
  padding: theme.spacing(1.5, 1, 1.5, 2),
}));

/** 패널 맨 위 칸(제목과 설명). 목록보다 어두운 면에 가는 금색 밑줄로 목록과 나눈다 */
export const PanelTop = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.surfaceSunken,
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));

/** 하위를 더 넣는 자리처럼 보이는 점선 칸 */
export const AddButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 0),
  borderStyle: 'dashed',
  borderColor: alpha(theme.palette.primary.main, 0.5),
  '&:hover': { borderStyle: 'dashed' },
}));

/** 하위 일괄 삭제를 시작하는 점선 칸. 하위 추가 칸(AddButton)과 모양이 같고 경고색이다 */
export const BulkDeleteButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 0),
  borderStyle: 'dashed',
  borderColor: alpha(theme.palette.error.main, 0.5),
  '&:hover': { borderStyle: 'dashed' },
}));
