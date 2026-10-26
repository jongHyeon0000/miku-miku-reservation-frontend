/** 페이지 단위 목록 응답의 data 모양 (서버가 주는 모양 그대로) */
export interface PageData<T> {
  /** 이번 페이지 항목. 없으면 빈 배열 */
  items: T[];

  /** 실제로 적용된 페이지 번호 (1부터) */
  page: number;

  /** 실제로 적용된 한 페이지 개수 */
  size: number;

  /** 조건에 맞는 전체 항목 수 */
  totalCount: number;

  /** 전체 페이지 수. 항목이 없으면 0 */
  totalPages: number;
}
