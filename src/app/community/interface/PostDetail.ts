/** 글 상세 (GET /api/post/{postId}, 등록과 수정 응답도 같은 모양). 상세는 항상 정상 글이다 */
export interface PostDetail {
  /** 게시글 id */
  postId: number;

  /** 제목 */
  title: string;

  /** 본문 (에디터가 만든 HTML) */
  content: string;

  /** 작성자 이름 */
  authorName: string;

  /** 조회수 (상세를 읽으면 서버가 올린 뒤의 값) */
  viewCount: number;

  /** 댓글 수 */
  commentCount: number;

  /** 작성일 */
  createdAt: string;

  /** 수정일 (등록 직후엔 작성일과 같다) */
  updatedAt: string;

  /** 정상 */
  status: 'NORMAL';

  /** 내가 쓴 글인지 */
  mine: boolean;
}
