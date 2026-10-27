import PostCommentForm from '@/app/community/component/comment/PostCommentForm';
import PostCommentItem from '@/app/community/component/comment/PostCommentItem';
import type { PostComment } from '@/app/community/interface/PostComment';
import type { PostCommentReplyTarget } from '@/app/community/interface/PostCommentReplyTarget';
import { CommentStack, ReplyItem, ReplyList } from '@/app/community/style/PostComment.style';
import { toReplyTarget } from '@/app/community/utils/PostUtils';

interface PostCommentThreadProps {
  /** 댓글을 쓰는 글 */
  postId: number;

  /** 최상위 댓글 (답글은 이 안의 replies) */
  comment: PostComment;

  /** 지금 열려 있는 답글 상자의 대상 (없으면 null). 이 묶음 대상이면 답글 목록 맨 끝에 상자를 연다 */
  replyTarget: PostCommentReplyTarget | null;

  /** "답글"을 눌러 대상이 정해졌을 때 */
  onReply: (target: PostCommentReplyTarget) => void;

  /** 답글 상자를 닫을 때 */
  onCloseReply: () => void;
}

/**
 * 최상위 댓글 하나와 그 답글들. 부모 사진 아래의 줄기에서 답글마다 ㄴ 모양 가지가 나간다.
 * 어느 댓글이나 답글에 "답글"을 눌러도 상자는 이 묶음의 답글 목록 맨 끝에 열린다(서버 규칙상 부모는 항상 최상위 댓글).
 */
const PostCommentThread = ({ postId, comment, replyTarget, onReply, onCloseReply }: PostCommentThreadProps) => {
  const isFormOpen = replyTarget !== null && replyTarget.parentPostCommentId === comment.postCommentId;
  const hasReplies = comment.replies.length > 0;

  return (
    <CommentStack>
      <PostCommentItem
        comment={comment}
        hasReplies={hasReplies || isFormOpen}
        onReply={() => onReply(toReplyTarget(comment.postCommentId, comment))}
      />
      {(hasReplies || isFormOpen) && (
        <ReplyList>
          {comment.replies.map((reply) => (
            <ReplyItem key={reply.postCommentId}>
              <PostCommentItem
                comment={reply}
                hasReplies={false}
                onReply={() => onReply(toReplyTarget(comment.postCommentId, reply))}
              />
            </ReplyItem>
          ))}
          {isFormOpen && (
            <ReplyItem>
              <PostCommentForm postId={postId} replyTarget={replyTarget} onClose={onCloseReply} />
            </ReplyItem>
          )}
        </ReplyList>
      )}
    </CommentStack>
  );
};

export default PostCommentThread;
