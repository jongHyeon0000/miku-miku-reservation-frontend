import { Box, Pagination } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

interface PageNumbersProps {
  /** 지금 보는 페이지 (1부터) */
  page: number;

  /** 전체 페이지 수 */
  totalPages: number;

  /** 번호를 눌러 페이지가 바뀌었을 때 */
  onChange: (page: number) => void;
}

/**
 * 페이지 번호 줄. 가운데에 번호를 늘어놓고, 누르면 그 페이지 번호를 알려 준다.
 * 선택된 번호는 TonalButton 과 같은 금색 은은한 채움이다.
 */
const PageNumbers = ({ page, totalPages, onChange }: PageNumbersProps) => {
  return (
    <Pager>
      <ThemedPagination count={totalPages} page={page} onChange={(_, nextPage) => onChange(nextPage)} />
    </Pager>
  );
};

const Pager = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const ThemedPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: theme.palette.text.primary,
    '&:hover': { backgroundColor: theme.palette.rowHover },
    '&.MuiPaginationItem-previousNext': { color: theme.palette.text.secondary },
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: 700,
      backgroundColor: alpha(theme.palette.primary.main, 0.26),
      '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.38) },
    },
  },
}));

export default PageNumbers;
