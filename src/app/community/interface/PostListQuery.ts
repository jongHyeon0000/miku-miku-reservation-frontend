import type { PostSearchType } from '@/app/community/constant/postSearchTypes';

/** 검색 칸에 넣는 값 */
export interface PostSearchValues {
  /** 검색 대상 */
  searchType: PostSearchType;

  /** 검색어. 비어 있으면 검색 없이 전체 목록 */
  keyword: string;
}

/** 게시판 목록을 읽는 조건 (화면 주소의 쿼리와 같다) */
export interface PostListQuery extends PostSearchValues {
  /** 보는 쪽 (1부터) */
  page: number;
}
