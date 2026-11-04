import { THUMBNAIL_EXTENSIONS, THUMBNAIL_MAX_BYTES } from '@/app/common/constant/thumbnailFile';
import type { PostComment } from '@/app/community/interface/PostComment';
import type { PostCommentReplyTarget } from '@/app/community/interface/PostCommentReplyTarget';
import { DEFAULT_POST_SEARCH_TYPE, POST_SEARCH_TYPE_OPTIONS } from '@/app/community/constant/postSearchTypes';
import type { PostListQuery } from '@/app/community/interface/PostListQuery';

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

/**
 * 화면 주소의 쿼리(?page=&searchType=&keyword=&authorId=&authorName=)를 목록 조건으로 바꾼다.
 * 쪽이 1보다 작거나 숫자가 아니면 1쪽, 검색 대상이 4종이 아니면 기본(제목+내용), 작성자 번호가 1 이상의 정수가 아니면 작성자 조건 없음이다.
 */
export const toPostListQuery = (searchParams: URLSearchParams): PostListQuery => {
  const pageParam = Number(searchParams.get('page'));
  const page = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

  const searchTypeParam = searchParams.get('searchType');
  const matchedOption = POST_SEARCH_TYPE_OPTIONS.find((option) => option.value === searchTypeParam);
  const searchType = matchedOption !== undefined ? matchedOption.value : DEFAULT_POST_SEARCH_TYPE;

  const keywordParam = searchParams.get('keyword');
  const keyword = keywordParam !== null ? keywordParam : '';

  const authorIdParam = Number(searchParams.get('authorId'));
  const authorId = Number.isInteger(authorIdParam) && authorIdParam >= 1 ? authorIdParam : null;

  const authorNameParam = searchParams.get('authorName');
  const authorName = authorNameParam !== null ? authorNameParam : '';

  return { page, searchType, keyword, authorId, authorName };
};

/**
 * 목록 조건을 화면 주소의 쿼리로 바꾼다. 검색어가 없으면 검색 대상과 검색어는 빼고, 작성자 조건은 검색어와 상관없이 남긴다.
 */
export const toPostListSearchParams = (query: PostListQuery): Record<string, string> => {
  const params: Record<string, string> = { page: String(query.page) };
  const keyword = query.keyword.trim();

  if (keyword !== '') {
    params.searchType = query.searchType;
    params.keyword = keyword;
  }

  if (query.authorId !== null) {
    params.authorId = String(query.authorId);
    params.authorName = query.authorName;
  }

  return params;
};
