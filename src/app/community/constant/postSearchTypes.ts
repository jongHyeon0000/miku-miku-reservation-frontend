/** 게시판 검색 대상 (서버 searchType 값 그대로) */
export type PostSearchType = 'TITLE_CONTENT' | 'TITLE' | 'CONTENT' | 'AUTHOR';

interface PostSearchTypeOption {
  value: PostSearchType;
  label: string;
}

/** 검색 대상 4종 (첫 번째가 기본) */
export const POST_SEARCH_TYPE_OPTIONS: readonly PostSearchTypeOption[] = [
  { value: 'TITLE_CONTENT', label: '제목+내용' },
  { value: 'TITLE', label: '제목' },
  { value: 'CONTENT', label: '내용' },
  { value: 'AUTHOR', label: '작성자' },
];

export const DEFAULT_POST_SEARCH_TYPE: PostSearchType = 'TITLE_CONTENT';
