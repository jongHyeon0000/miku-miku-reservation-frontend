import { Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style';
import PostListTable from '@/app/community/component/list/PostListTable';
import useReadPostList from '@/app/community/service/useReadPostList';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 게시판 목록 화면 (/community)
 * 보는 쪽은 주소의 ?page= 에 두어서, 글을 보고 뒤로 가거나 새로고침해도 같은 쪽이 보인다.
 */
const PostListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get('page'));
  const page = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

  const { postListPage, postListLoading, fetchReadPostList } = useReadPostList(page);

  const isOk = postListPage !== undefined && postListPage.code === API_CODE.OK;
  const pageData = isOk ? postListPage.data : null;
  const items = pageData !== null ? pageData.items : [];
  const totalPages = pageData !== null ? pageData.totalPages : 0;

  const handleChangePage = (nextPage: number) => {
    setSearchParams({ page: String(nextPage) });
  };

  const handleOpen = (postId: number) => {
    navigate(`/community/${postId}`);
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          커뮤니티
        </PageTitle>
        <Button variant="contained" onClick={() => navigate('/community/new')}>
          글 쓰기
        </Button>
      </PageHeader>

      {postListPage && postListPage.code !== API_CODE.OK && <ErrorView message={postListPage.message} onRetry={fetchReadPostList} />}

      {pageData !== null && items.length === 0 && (
        <EmptyView
          message="아직 글이 없어요"
          action={
            <Button variant="contained" onClick={() => navigate('/community/new')}>
              글 쓰기
            </Button>
          }
        />
      )}

      {items.length > 0 && (
        <PostListTable items={items} page={page} totalPages={totalPages} onOpen={handleOpen} onChangePage={handleChangePage} />
      )}

      <LoadingOverlay open={postListLoading} />
    </PageContainer>
  );
};

export default PostListPage;
