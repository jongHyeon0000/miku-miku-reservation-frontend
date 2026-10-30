import { Box, ListItemButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

/** 설명은 한 줄로 보여 주고, 길면 …로 줄인다 (전체 글은 이름 옆 아이콘에 올리면 툴팁으로 본다) */
export const TextBox = styled(Box)({
  flex: 1,
  minWidth: 0,
});

/** 취소선을 그을 수 있는 글자 칸 (struck 면 가운데 줄이 그어진다. 가져오기 확인 창의 제외 항목) */
export const StruckText = styled('span', { shouldForwardProp: (prop) => prop !== 'struck' })<{ struck?: boolean }>(({ struck = false }) => ({
  textDecoration: struck ? 'line-through' : 'none',
}));

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
