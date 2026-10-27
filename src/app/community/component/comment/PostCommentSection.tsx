import { Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import { ColumnCard } from '@/app/common/style/CommonCard.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import PostCommentThread from '@/app/community/component/comment/PostCommentThread';
import type { PostComment } from '@/app/community/interface/PostComment';
import { CommentStack } from '@/app/community/style/PostComment.style';
import { countComments } from '@/app/community/utils/PostUtils';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';

interface PostCommentSectionProps {
  /** 댓글 목록 조회 결과 (읽는 중이면 없다) */
  postCommentList: ApiResponse<PostComment[] | null> | undefined;

  /** 읽기에 실패했을 때 다시 시도를 눌렀을 때 */
  onRetry: () => void;
}

/**
 * 글 아래의 댓글 카드. 머리에 댓글 수, 아래에 최상위 댓글 묶음들을 오래된 것부터 보여 준다.
 */
const PostCommentSection = ({ postCommentList, onRetry }: PostCommentSectionProps) => {
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
            <PostCommentThread key={comment.postCommentId} comment={comment} />
          ))}
        </CommentStack>
      )}
    </ColumnCard>
  );
};

export default PostCommentSection;
