import PostCommentForm from '@/app/community/component/comment/PostCommentForm';
import PostCommentItem from '@/app/community/component/comment/PostCommentItem';
import type { PostComment } from '@/app/community/interface/PostComment';
import type { PostCommentComposer } from '@/app/community/interface/PostCommentComposer';
import type { PostCommentReplyTarget } from '@/app/community/interface/PostCommentReplyTarget';
import { CommentStack, ReplyItem, ReplyList } from '@/app/community/style/PostComment.style';
import { toReplyTarget } from '@/app/community/utils/PostUtils';

interface PostCommentThreadProps {
  /** 댓글을 쓰는 글 */
  postId: number;

  /** 최상위 댓글 (답글은 이 안의 replies) */
  comment: PostComment;

  /** 지금 열려 있는 입력 상자 (답글 또는 수정. 없으면 null) */
  composer: PostCommentComposer | null;

  /** "답글"을 눌러 대상이 정해졌을 때 */
  onReply: (target: PostCommentReplyTarget) => void;

  /** ⋮ 메뉴의 "수정"을 눌렀을 때 (수정할 댓글 id) */
  onEdit: (postCommentId: number) => void;

  /** ⋮ 메뉴의 "삭제"를 눌렀을 때 (삭제할 댓글 id) */
  onDelete: (postCommentId: number) => void;

  /** 입력 상자를 닫을 때 */
  onCloseComposer: () => void;
}

/**
 * 최상위 댓글 하나와 그 답글들. 부모 사진 아래의 줄기에서 답글마다 ㄴ 모양 가지가 나간다.
 * 어느 댓글이나 답글에 "답글"을 눌러도 상자는 이 묶음의 답글 목록 맨 끝에 열린다(서버 규칙상 부모는 항상 최상위 댓글).
 * 수정 중인 댓글은 그 자리에서 입력 상자로 바뀐다.
 */
const PostCommentThread = ({ postId, comment, composer, onReply, onEdit, onDelete, onCloseComposer }: PostCommentThreadProps) => {
  const replyTarget = composer !== null && composer.kind === 'reply' ? composer.target : null;
  const isFormOpen = replyTarget !== null && replyTarget.parentPostCommentId === comment.postCommentId;
  const hasReplies = comment.replies.length > 0;
  const hasChildren = hasReplies || isFormOpen;

  /* 수정 중인 댓글이면 입력 상자를, 아니면 댓글 한 줄을 그린다 */
  const renderComment = (target: PostComment, hasChildrenBelow: boolean) => {
    const isEditing = composer !== null && composer.kind === 'edit' && composer.postCommentId === target.postCommentId;

    if (isEditing && target.status === 'NORMAL') {
      return <PostCommentForm postId={postId} editTarget={target} hasReplies={hasChildrenBelow} onClose={onCloseComposer} />;
    }

    return (
      <PostCommentItem
        comment={target}
        hasReplies={hasChildrenBelow}
        onReply={() => onReply(toReplyTarget(comment.postCommentId, target))}
        onEdit={() => onEdit(target.postCommentId)}
        onDelete={() => onDelete(target.postCommentId)}
      />
    );
  };

  return (
    <CommentStack>
      {renderComment(comment, hasChildren)}
      {hasChildren && (
        <ReplyList>
          {comment.replies.map((reply) => (
            <ReplyItem key={reply.postCommentId}>{renderComment(reply, false)}</ReplyItem>
          ))}
          {isFormOpen && (
            <ReplyItem>
              <PostCommentForm postId={postId} replyTarget={replyTarget} onClose={onCloseComposer} />
            </ReplyItem>
          )}
        </ReplyList>
      )}
    </CommentStack>
  );
};

export default PostCommentThread;
