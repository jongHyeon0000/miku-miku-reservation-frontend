import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { Row, SpreadRow } from '@/app/common/style/CommonLayout.style';
import { PageContainer } from '@/app/common/style/CommonPage.style';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import PostCommentSection from '@/app/community/component/comment/PostCommentSection';
import PostDetailCard from '@/app/community/component/detail/PostDetailCard';
import useDeletePost from '@/app/community/service/useDeletePost';
import useReadPost from '@/app/community/service/useReadPost';
import useReadPostCommentList from '@/app/community/service/useReadPostCommentList';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';
import { styled } from '@mui/material/styles';

/** 삭제 확인창 글자 */
const DELETE_ALERT = {
  title: '해당 글을 삭제할까요?',
  text: '글을 삭제하면 다시 되돌릴 수 없어요.',
  confirmText: '삭제',
};

/**
 * 게시글 상세 화면 (/community/:postId)
 * 글은 화면에 들어올 때 한 번만 읽는다(읽을 때마다 조회수가 오르므로).
 */
const PostDetailPage = () => {
  const navigate = useNavigate();
  const postId = Number(useParams().postId);
  const showResult = useUiStore((state) => state.showResult);

  const { post, postLoading, fetchReadPost } = useReadPost(postId);
  const { postCommentList, postCommentListLoading, fetchReadPostCommentList } = useReadPostCommentList(postId);
  const { deletePostLoading, fetchDeletePost } = useDeletePost();

  const isOk = post !== undefined && post.code === API_CODE.OK;
  const detail = isOk ? post.data : null;
  const failed = post !== undefined && post.code !== API_CODE.OK ? post : null;

  const handleDelete = async () => {
    const confirmed = await showConfirmAlert({ ...DELETE_ALERT, danger: true, focusCancel: true });

    if (!confirmed) {
      return;
    }

    const res = await fetchDeletePost(postId);
    showResult(res);

    if (res.code === API_CODE.OK) {
      navigate('/community');
    }
  };

  return (
    <PageContainer>
      <DetailColumn>
        {failed !== null && <ErrorView message={failed.message} onRetry={fetchReadPost} />}
        {detail !== null && <PostDetailCard post={detail} />}

        <SpreadRow>
          <Button variant="outlined" color="inherit" onClick={() => navigate('/community')}>
            목록으로
          </Button>
          {detail !== null && detail.mine && (
            <Row>
              <TonalButton onClick={() => navigate(`/community/${postId}/edit`)}>수정</TonalButton>
              <TonalDangerButton onClick={handleDelete}>삭제</TonalDangerButton>
            </Row>
          )}
        </SpreadRow>

        {detail !== null && <PostCommentSection postCommentList={postCommentList} onRetry={fetchReadPostCommentList} />}
      </DetailColumn>

      <LoadingOverlay open={postLoading || postCommentListLoading || deletePostLoading} />
    </PageContainer>
  );
};

/** 글 카드와 아래 버튼 줄을 세로로 쌓는다 */
const DetailColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export default PostDetailPage;
