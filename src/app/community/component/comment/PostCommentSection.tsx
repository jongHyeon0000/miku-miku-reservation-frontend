import { useState } from 'react';
import { Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { ColumnCard } from '@/app/common/style/CommonCard.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import PostCommentForm from '@/app/community/component/comment/PostCommentForm';
import PostCommentThread from '@/app/community/component/comment/PostCommentThread';
import type { PostComment } from '@/app/community/interface/PostComment';
import type { PostCommentComposer } from '@/app/community/interface/PostCommentComposer';
import useDeletePostComment from '@/app/community/service/useDeletePostComment';
import { CommentStack } from '@/app/community/style/PostComment.style';
import { countComments } from '@/app/community/utils/PostUtils';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

/** 삭제 확인창 글자 */
const DELETE_ALERT = {
  title: '해당 댓글을 삭제할까요?',
  text: '삭제하면 되돌릴 수 없어요. 이 댓글에 달린 답글은 그대로 남아요.',
  confirmText: '삭제',
};

interface PostCommentSectionProps {
  /** 댓글을 쓰는 글 */
  postId: number;

  /** 댓글 목록 조회 결과 (읽는 중이면 없다) */
  postCommentList: ApiResponse<PostComment[] | null> | undefined;

  /** 읽기에 실패했을 때 다시 시도를 눌렀을 때 */
  onRetry: () => void;
}

/**
 * 글 아래의 댓글 카드. 머리에 댓글 수, 아래에 최상위 댓글 묶음들을 오래된 것부터 보여 주고, 맨 아래에 새 댓글 상자를 둔다.
 * 답글 상자와 수정 상자는 한 번에 하나만 열리며, 어느 것이 열려 있는지는 여기서 한 곳(composer)에 들고 있는다. 삭제도 여기서 처리한다.
 */
const PostCommentSection = ({ postId, postCommentList, onRetry }: PostCommentSectionProps) => {
  const showResult = useUiStore((state) => state.showResult);
  const { deletePostCommentLoading, fetchDeletePostComment } = useDeletePostComment(postId);
  const [composer, setComposer] = useState<PostCommentComposer | null>(null);

  /* 확인창을 거쳐 지운다. 지울 수 없었던 경우(이미 삭제됨 등)에는 목록을 다시 읽어 화면을 서버와 맞춘다 */
  const handleDelete = async (postCommentId: number) => {
    const confirmed = await showConfirmAlert({ ...DELETE_ALERT, danger: true, focusCancel: true });

    if (!confirmed) {
      return;
    }

    const res = await fetchDeletePostComment(postCommentId);
    showResult(res);

    if (res.code !== API_CODE.OK) {
      onRetry();
    }
  };

  if (postCommentList === undefined) {
    return null;
  }

  const comments = postCommentList.data;

  if (postCommentList.code !== API_CODE.OK || comments === null) {
    return (
      <ColumnCard>
        <ErrorView message={postCommentList.message} onRetry={onRetry} />
      </ColumnCard>
    );
  }

  return (
    <ColumnCard>
      <Typography variant="body2" color="text.secondary" component="div">
        <Row>
          <ChatBubbleOutlineIcon fontSize="small" />
          댓글 {countComments(comments)}
        </Row>
      </Typography>

      {comments.length === 0 && <EmptyView message="아직 댓글이 없어요" />}
      {comments.length > 0 && (
        <CommentStack>
          {comments.map((comment) => (
            <PostCommentThread
              key={comment.postCommentId}
              postId={postId}
              comment={comment}
              composer={composer}
              onReply={(target) => setComposer({ kind: 'reply', target })}
              onEdit={(postCommentId) => setComposer({ kind: 'edit', postCommentId })}
              onDelete={handleDelete}
              onCloseComposer={() => setComposer(null)}
            />
          ))}
        </CommentStack>
      )}

      <PostCommentForm postId={postId} />
      <LoadingOverlay open={deletePostCommentLoading} />
    </ColumnCard>
  );
};

export default PostCommentSection;
