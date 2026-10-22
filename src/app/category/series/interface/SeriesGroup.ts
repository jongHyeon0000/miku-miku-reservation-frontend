import type { SeriesItem } from '@/app/category/series/interface/SeriesItem';

/** 시리즈 상위 한 건 (하위 목록 포함) */
export interface SeriesGroup extends SeriesItem {
  /** 하위 분류 목록 (없으면 빈 배열) */
  children: SeriesItem[];
}
