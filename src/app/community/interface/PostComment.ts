import type { PostCommentImage } from '@/app/community/interface/PostCommentImage';
import type { PostHiddenStatus } from '@/app/community/interface/PostStatus';

/** 가려진 댓글(삭제 또는 탈퇴). 내용 없이 자리만 오고, 아래 답글은 그대로 보인다 */
interface PostCommentHidden {
  /** 댓글 id */
  postCommentId: number;

  /** 부모(최상위) 댓글 id. 최상위 댓글이면 없다 */
  parentPostCommentId?: number;

  /** 삭제 또는 탈퇴 */
  status: PostHiddenStatus;

  /** 작성일 */
  createdAt: string;

  /** 답글 목록. 최상위 댓글만 채워지고 답글은 빈 배열 */
  replies: PostComment[];
}

/** 정상 댓글 또는 답글 (댓글 목록, 등록, 수정 응답의 한 건. 등록과 수정 응답의 replies 는 빈 배열) */
export interface PostCommentNormal {
  /** 댓글 id */
  postCommentId: number;

  /** 부모(최상위) 댓글 id. 최상위 댓글이면 없다 */
  parentPostCommentId?: number;

  /** 작성자 id. 이 사람에게 답글을 달 때 mentionUserId 로 쓴다 */
  userId: number;

  /** 작성자 이름 */
  authorName: string;

  /** 답글 대상 사용자 id. 멘션이 없거나 그 사용자가 탈퇴했으면 mentionUserName 과 함께 없다 */
  mentionUserId?: number;

  /** 답글 대상 사용자 이름. 화면에서 '@이름'으로 그린다 */
  mentionUserName?: string;

  /** 내용 (일반 텍스트, 줄바꿈 포함 가능. 멘션 글자는 들어 있지 않다) */
  content: string;

  /** 붙은 이미지 0~2장, 표시 순서대로 */
  images: PostCommentImage[];

  /** 작성일 */
  createdAt: string;

  /** 수정일 */
  updatedAt: string;

  /** 정상 */
  status: 'NORMAL';

  /** 내가 쓴 댓글인지 */
  mine: boolean;

  /** 답글 목록. 최상위 댓글만 채워지고 답글은 빈 배열 */
  replies: PostComment[];
}

/** 댓글 한 건. status 가 NORMAL 인지 확인하면 정상 댓글의 값을 바로 쓸 수 있다 */
export type PostComment = PostCommentNormal | PostCommentHidden;
