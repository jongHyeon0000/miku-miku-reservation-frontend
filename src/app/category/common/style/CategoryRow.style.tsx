import { Box, ListItemButton, Typography } from '@mui/material';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { styled } from '@mui/material/styles';

/* 분류 한 줄과 상위 항목의 모양 */
export const RowBox = styled(SpreadRow)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  /* 줄무늬: 같은 부모 안에서 홀수/짝수 줄 색을 번갈아 쓴다 (부모는 이 줄들만 담는 상자여야 한다) */
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.rowStripe },
  '&:nth-of-type(even)': { backgroundColor: theme.palette.rowStripeAlt },
  '&:hover': { backgroundColor: theme.palette.rowHover },
}));

/* 설명은 한 줄로 보여 주고, 길면 …로 줄인다 (전체 글은 이름 옆 아이콘에 올리면 툴팁으로 본다) */
export const TextBox = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const Description = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(1),
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})) as typeof Typography;

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexShrink: 0,
  gap: theme.spacing(0.5),
}));

export const GroupButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  '&.Mui-selected': {
    backgroundColor: theme.palette.surfaceRaised,
    color: theme.palette.primary.main,
  },
}));
