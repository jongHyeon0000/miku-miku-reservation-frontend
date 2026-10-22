/** 필터 목록의 상위 한 건과 그 아래 하위들 */
export interface FigureFilterOptionGroup {
  groupId: number;
  groupName: string;
  items: FigureFilterOptionItem[];
}

/** 필터 목록의 하위(또는 제조사) 한 건 */
export interface FigureFilterOptionItem {
  id: number;
  name: string;
}

/** 지금 탭의 상품에 쓰인 분류만 모은 필터 선택지 */
export interface FigureFilterOptions {
  figureType: FigureFilterOptionGroup[];
  shop: FigureFilterOptionGroup[];
  series: FigureFilterOptionGroup[];
  character: FigureFilterOptionGroup[];
  maker: FigureFilterOptionItem[];

  /** 배송예정월 ("YYYY-MM", 오름차순) */
  months: string[];
}

/**
 * 분류 필터에서 고른 값.
 * 상위만 골랐으면 itemId 가 null (그 상위의 하위 전부), 하위를 골랐으면 itemId 가 그 하위.
 * 제조사처럼 상위가 없는 분류는 groupId 가 null 이다.
 */
export interface FigureFilterValue {
  groupId: number | null;
  itemId: number | null;
}

/** 분류 필터 종류 */
export type FigureFilterKey = 'figureType' | 'shop' | 'maker' | 'series' | 'character';

/** 분류 필터마다 고른 값. 고르지 않았으면 null */
export type FigureFilters = Record<FigureFilterKey, FigureFilterValue | null>;
