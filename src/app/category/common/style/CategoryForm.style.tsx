import { Box } from '@mui/material';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { styled } from '@mui/material/styles';

/* 분류 추가, 수정 창의 배치 */
export const FormLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(1),
}));

/* 썸네일 칸의 크기. 높이는 오른쪽 입력칸 높이를 따라가고(설명칸 줄 수를 고정해 둠), 너비는 그 높이와 비슷하게 rem 으로 정한다 */
export const ThumbnailBox = styled(Box)({
  flexShrink: 0,
  width: '13.75rem',
});

export const FieldColumn = styled(FieldStack)({
  flex: 1,
});
