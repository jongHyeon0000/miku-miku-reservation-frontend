/** 답글을 쓰는 대상 (답글 상자가 열려 있는 동안 섹션이 들고 있는다) */
export interface PostCommentReplyTarget {
  /** 최상위 댓글 id (누구에게 달든 서버에는 항상 이 값을 보낸다) */
  parentPostCommentId: number;

  /** 답글 대상 사용자 id. 대상이 삭제, 탈퇴한 댓글이면 없다 */
  mentionUserId?: number;

  /** 답글 대상 사용자 이름. 상자 위에 "@이름 에게 답글"로 보여 준다 */
  mentionUserName?: string;
}
