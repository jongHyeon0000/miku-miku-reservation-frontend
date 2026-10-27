/** 댓글 이미지 업로드 결과 (POST /api/upload/comment-image). 쓰는 값만 둔다 */
export interface PostCommentImageUploadResponseData {
  /** 댓글 이미지 id (댓글 등록 때 postCommentImageIds 로 보낸다) */
  postCommentImageId: number;

  /** 이미지 주소 ('/uploads/...' 상대 경로). 작성 중 미리보기에 쓴다 */
  url: string;
}
