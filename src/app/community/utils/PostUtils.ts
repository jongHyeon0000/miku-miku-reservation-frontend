import { THUMBNAIL_EXTENSIONS, THUMBNAIL_MAX_BYTES } from '@/app/common/constant/thumbnailFile';
import type { PostComment } from '@/app/community/interface/PostComment';
import type { PostCommentReplyTarget } from '@/app/community/interface/PostCommentReplyTarget';

/**
 * 서버가 준 날짜시간('2026-10-26T10:30:00')을 '2026.10.26' 모양으로 바꾼다.
 */
export const formatPostDate = (dateTime: string): string => {
  const dateOnly = dateTime.slice(0, 10);
  return dateOnly.replace(/-/g, '.');
};

/**
 * [게시글 폼]
 *
 * 제목: 앞뒤 공백을 뺀 1~200자
 */
export const validatePostTitle = (value: string): string | undefined => {
  const trimmed = value.trim();

  if (trimmed === '') {
    return '제목을 입력해 주세요.';
  }

  if (trimmed.length > 200) {
    return '제목은 200자 이하로 입력해 주세요.';
  }

  return undefined;
};

/**
 * [게시글 폼]
 *
 * 본문: 비어 있으면 안 된다(에디터는 내용이 없으면 빈 글자를 준다)
 */
export const validatePostContent = (value: string): string | undefined => {
  if (value.trim() === '') {
    return '내용을 입력해 주세요.';
  }

  return undefined;
};

/**
 * 댓글 수를 센다. 최상위 댓글과 모든 답글의 합이고, 삭제나 탈퇴로 자리만 남은 것도 센다.
 */
export const countComments = (comments: PostComment[]): number => {
  let count = comments.length;

  comments.forEach((comment) => {
    count += comment.replies.length;
  });

  return count;
};

/**
 * [댓글 폼]
 *
 * 내용: 앞뒤 공백을 뺀 1000자 이하. 비어도 통과한다(이미지만 있는 댓글이 있으므로, 글도 이미지도 없는 경우는 등록 버튼이 막는다)
 */
export const validatePostComment = (value: string): string | undefined => {
  const trimmed = value.trim();

  if (trimmed.length > 1000) {
    return '댓글은 1000자 이하로 입력해 주세요.';
  }

  return undefined;
};

/**
 * [댓글 이미지]
 *
 * 한 장의 확장자와 용량. 서버 규칙이 썸네일과 같아서 같은 상수를 쓴다(파일 내용은 서버만 검사한다)
 */
export const validateCommentImageFile = (file: File): string | undefined => {
  const extension = file.name.includes('.') ? (file.name.split('.').pop() ?? '').toLowerCase() : '';

  if (!(THUMBNAIL_EXTENSIONS as readonly string[]).includes(extension)) {
    return 'jpg, png, gif, webp 파일만 올릴 수 있어요.';
  }

  if (file.size > THUMBNAIL_MAX_BYTES) {
    return '5MB 이하의 이미지만 올릴 수 있어요.';
  }

  return undefined;
};

/**
 * 답글을 쓰는 대상을 만든다. 부모는 항상 최상위 댓글이고, 멘션은 누른 댓글의 작성자다(삭제, 탈퇴한 댓글이면 멘션 없음).
 */
export const toReplyTarget = (parentPostCommentId: number, target: PostComment): PostCommentReplyTarget => {
  if (target.status !== 'NORMAL') {
    return { parentPostCommentId };
  }

  return { parentPostCommentId, mentionUserId: target.userId, mentionUserName: target.authorName };
};
