/** 게시글 등록, 수정 요청 본문 (POST /api/post, PUT /api/post/{postId}). 글 쓰기 폼의 값과 같다 */
export interface PostSaveRequestBody {
  /** 제목 (앞뒤 공백을 뺀 1~200자) */
  title: string;

  /** 본문 (에디터가 만든 HTML. 이미지는 먼저 올려서 받은 '/uploads/...' 주소를 src 로 쓴다) */
  content: string;
}
