import PostCommentItem from '@/app/community/component/comment/PostCommentItem';
import type { PostComment } from '@/app/community/interface/PostComment';
import { CommentStack, ReplyItem, ReplyList } from '@/app/community/style/PostComment.style';

interface PostCommentThreadProps {
  /** 최상위 댓글 (답글은 이 안의 replies) */
  comment: PostComment;
}

/**
 * 최상위 댓글 하나와 그 답글들. 부모 사진 아래의 줄기에서 답글마다 ㄴ 모양 가지가 나간다.
 */
const PostCommentThread = ({ comment }: PostCommentThreadProps) => {
  const hasReplies = comment.replies.length > 0;

  return (
    <CommentStack>
      <PostCommentItem comment={comment} hasReplies={hasReplies} />
      {hasReplies && (
        <ReplyList>
          {comment.replies.map((reply) => (
            <ReplyItem key={reply.postCommentId}>
              <PostCommentItem comment={reply} hasReplies={false} />
            </ReplyItem>
          ))}
        </ReplyList>
      )}
    </CommentStack>
  );
};

export default PostCommentThread;
