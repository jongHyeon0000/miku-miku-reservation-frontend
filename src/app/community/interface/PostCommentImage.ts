/** 댓글에 붙은 이미지 한 장 */
export interface PostCommentImage {
  /** 댓글 이미지 id (댓글 수정 때 유지할 이미지는 이 값을 다시 보낸다) */
  postCommentImageId: number;

  /** 이미지 주소 ('/uploads/...' 상대 경로) */
  url: string;
}
