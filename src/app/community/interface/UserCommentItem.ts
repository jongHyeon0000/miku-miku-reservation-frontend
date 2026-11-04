/** 사용자가 쓴 최근 댓글 한 건 (GET /api/user/{userId}/comment 의 data 한 건). 정상 댓글과 답글 중 달린 글도 정상인 것만 온다 */
export interface UserCommentItem {
  /** 댓글 id */
  postCommentId: number;

  /** 댓글 내용. 이미지만 올린 댓글이면 없다 */
  content?: string;

  /** 작성일 */
  createdAt: string;

  /** 댓글이 달린 글 id (눌러서 글로 이동할 때 쓴다) */
  postId: number;

  /** 댓글이 달린 글 제목 */
  postTitle: string;
}
