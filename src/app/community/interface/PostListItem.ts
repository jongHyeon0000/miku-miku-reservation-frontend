import type { PostHiddenStatus } from '@/app/community/interface/PostStatus';

/** 가려진 글 한 줄(삭제 또는 탈퇴). 내용 없이 자리만 온다 */
interface PostListItemHidden {
  /** 게시글 id */
  postId: number;

  /** 삭제 또는 탈퇴 */
  status: PostHiddenStatus;

  /** 작성일 */
  createdAt: string;
}

/** 정상 글 한 줄 (GET /api/post 의 items 한 건). 본문(content)은 목록에 없다 */
interface PostListItemNormal {
  /** 게시글 id */
  postId: number;

  /** 정상 */
  status: 'NORMAL';

  /** 제목 */
  title: string;

  /** 작성자 이름 */
  authorName: string;

  /** 조회수 */
  viewCount: number;

  /** 댓글 수(삭제, 탈퇴한 댓글과 답글 포함 전체) */
  commentCount: number;

  /** 작성일 */
  createdAt: string;

  /** 내가 쓴 글인지 */
  mine: boolean;
}

/** 글 목록 한 줄. status 가 NORMAL 인지 확인하면 정상 글의 값을 바로 쓸 수 있다 */
export type PostListItem = PostListItemNormal | PostListItemHidden;
