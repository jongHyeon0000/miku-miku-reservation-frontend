import type { FigureTypeItem } from '@/app/category/figure-type/interface/FigureTypeItem';

/** 형태 상위 한 건 (하위 목록 포함) */
export interface FigureTypeGroup extends FigureTypeItem {
  /** 하위 분류 목록 (없으면 빈 배열) */
  children: FigureTypeItem[];
}
