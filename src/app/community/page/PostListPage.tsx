import { Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style';
import PostListTable from '@/app/community/component/list/PostListTable';
import PostSearchBar from '@/app/community/component/list/PostSearchBar';
import type { PostSearchValues } from '@/app/community/interface/PostListQuery';
import useReadPostList from '@/app/community/service/useReadPostList';
import { toPostListQuery, toPostListSearchParams } from '@/app/community/utils/PostUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 게시판 목록 화면 (/community)
 * 보는 쪽과 검색 조건은 주소의 ?page=&searchType=&keyword= 에 두어서, 글을 보고 뒤로 가거나 새로고침해도 같은 목록이 보인다.
 */
const PostListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = toPostListQuery(searchParams);
  const searching = query.keyword.trim() !== '';

  const { postListPage, postListLoading, fetchReadPostList } = useReadPostList(query);

  const isOk = postListPage !== undefined && postListPage.code === API_CODE.OK;
  const pageData = isOk ? postListPage.data : null;
  const items = pageData !== null ? pageData.items : [];
  const totalPages = pageData !== null ? pageData.totalPages : 0;

  /* 검색 중에는 검색 조건을 그대로 두고 쪽만 바꾼다 */
  const handleChangePage = (nextPage: number) => {
    setSearchParams(toPostListSearchParams({ ...query, page: nextPage }));
  };

  /* 검색 결과는 쪽 수가 달라서 1쪽부터 본다 */
  const handleSearch = (values: PostSearchValues) => {
    setSearchParams(toPostListSearchParams({ ...values, page: 1 }));
  };

  const handleOpen = (postId: number) => {
    navigate(`/community/${postId}`);
  };

  /* 글이 하나도 없을 때. 검색 중이면 결과가 없다는 문구만 보여 준다 */
  const emptyView = searching ? (
    <EmptyView message="검색 결과가 없어요" />
  ) : (
    <EmptyView
      message="아직 글이 없어요"
      action={
        <Button variant="contained" onClick={() => navigate('/community/new')}>
          글 쓰기
        </Button>
      }
    />
  );

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

      {/* 주소의 검색 조건이 바뀌면(뒤로 가기 등) 칸을 새로 그려 처음 값을 다시 맞춘다 */}
      <PostSearchBar key={`${query.searchType}:${query.keyword}`} value={query} onSearch={handleSearch} />

      {postListPage && postListPage.code !== API_CODE.OK && <ErrorView message={postListPage.message} onRetry={fetchReadPostList} />}

      {pageData !== null && items.length === 0 && emptyView}

      {items.length > 0 && (
        <PostListTable items={items} page={query.page} totalPages={totalPages} onOpen={handleOpen} onChangePage={handleChangePage} />
      )}

      <LoadingOverlay open={postListLoading} />
    </PageContainer>
  );
};

export default PostListPage;
