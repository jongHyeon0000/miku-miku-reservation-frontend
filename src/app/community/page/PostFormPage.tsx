import { Typography } from '@mui/material';
import { PageContainer } from '@/app/common/style/CommonPage.style';

interface PostFormPageProps {
  /** insert: 글 쓰기, edit: 글 수정 */
  mode: 'insert' | 'edit';
}

/**
 * 게시글 쓰기, 수정 화면(준비 중)
 */
const PostFormPage = ({ mode }: PostFormPageProps) => {
  return (
    <PageContainer>
      <Typography variant="h5">{mode === 'insert' ? '글 쓰기' : '글 수정'}</Typography>
    </PageContainer>
  );
};

export default PostFormPage;
