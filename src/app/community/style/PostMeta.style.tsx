import { styled } from '@mui/material/styles';
import { Row } from '@/app/common/style/CommonLayout.style';

/**
 * 닉네임과 날짜는 글자 크기가 달라서, 글자 밑선(기준선)을 맞춰 한 줄로 보이게 한다. 사진은 이 묶음 옆에서 가운데 정렬이다
 */
export const NameLine = styled(Row)({
  alignItems: 'baseline',
});

/**
 * 글자 사이의 구분점
 */
export const Dot = styled('span')(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

/**
 * 마우스를 올리면 수정일이 보이는 글자 (점선 밑줄과 도움말 커서)
 */
export const EditedMark = styled('span')(({ theme }) => ({
  borderBottom: `1px dotted ${theme.palette.text.secondary}`,
  cursor: 'help',
}));
