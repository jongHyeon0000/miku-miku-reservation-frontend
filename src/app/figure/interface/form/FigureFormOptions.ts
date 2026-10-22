import type { FigureTypeGroup } from '@/app/category/figure-type/interface/FigureTypeGroup';
import type { GenreCharacterGroup } from '@/app/category/genre-character/interface/GenreCharacterGroup';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';
import type { SeriesGroup } from '@/app/category/series/interface/SeriesGroup';
import type { ShopGroup } from '@/app/category/shop/interface/ShopGroup';

/** 상품 폼과 상세가 쓰는 분류 선택지 묶음 (5개 축) */
export interface FigureFormOptions {
  /** 판매처 채널 > 스토어 */
  shops: ShopGroup[];

  /** 형태 > 하위 형태 */
  types: FigureTypeGroup[];

  /** 시리즈 그룹 > 시리즈 */
  series: SeriesGroup[];

  /** 장르 > 캐릭터 */
  genres: GenreCharacterGroup[];

  /** 제조사 (상하위 없이 평면) */
  makers: MakerItem[];
}
