import { Box, ListItemButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
