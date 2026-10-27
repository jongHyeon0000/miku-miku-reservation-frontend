import type { PostCommentReplyTarget } from '@/app/community/interface/PostCommentReplyTarget';

/** 지금 열려 있는 입력 상자 하나 (답글 쓰는 중 또는 댓글 수정 중). 열려 있는 것이 없으면 null 로 둔다 */
export type PostCommentComposer =
  | {
      /** 답글 쓰기 */
      kind: 'reply';

      /** 답글을 쓰는 대상 */
      target: PostCommentReplyTarget;
    }
  | {
      /** 댓글 수정 */
      kind: 'edit';

      /** 수정하는 댓글(또는 답글) id */
      postCommentId: number;
    };
