import type { ShopItem } from '@/app/category/shop/interface/ShopItem';

/** 판매처 상위 한 건 (하위 목록 포함) */
export interface ShopGroup extends ShopItem {
  /** 하위 분류 목록 (없으면 빈 배열) */
  children: ShopItem[];
}
