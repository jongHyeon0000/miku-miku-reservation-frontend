/** 댓글, 답글 등록 요청 본문 (POST /api/post/{postId}/comment) */
export interface PostCommentSaveRequestBody {
  /** 내용 (앞뒤 공백을 뺀 1000자 이하 일반 텍스트. 멘션 글자(@이름)는 적지 않는다). 이미지만 보낼 때는 필드를 뺀다 */
  content?: string;

  /** 답글일 때만: 최상위 댓글의 id (답글에 다는 답글도 그 답글이 아니라 최상위 댓글 id) */
  parentPostCommentId?: number;

  /** 답글일 때만: 누구에게 다는 답글인지(대상 댓글의 userId). 삭제, 탈퇴한 댓글에 달면 없다 */
  mentionUserId?: number;

  /** 먼저 올려서 받은 이미지 id 0~2개 (배열 순서가 표시 순서) */
  postCommentImageIds?: number[];
}
