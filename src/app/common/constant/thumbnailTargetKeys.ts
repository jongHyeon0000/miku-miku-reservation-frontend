import type { QueryKey } from '@tanstack/react-query';
import type { ThumbnailTarget } from '@/app/common/constant/thumbnailTarget';
import { shopKeys } from '@/app/category/shop/constant/shopQueryKeys';
import { figureTypeKeys } from '@/app/category/figure-type/constant/figureTypeQueryKeys';
import { seriesKeys } from '@/app/category/series/constant/seriesQueryKeys';
import { genreCharacterKeys } from '@/app/category/genre-character/constant/genreCharacterQueryKeys';
import { makerKeys } from '@/app/category/maker/constant/makerQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';

/* 썸네일이 바뀌면 낡아지는 키. 분류 썸네일은 상품 응답 안에도 들어 있어서 상품 전체를 함께 울린다 */
export const THUMBNAIL_QUERY_KEYS: Record<ThumbnailTarget, (targetId: number) => QueryKey[]> = {
  'figure': (targetId) => [figureKeys.detail(targetId), figureKeys.list()],
  'shop-group': () => [shopKeys.list(), figureKeys.all],
  'shop': () => [shopKeys.list(), figureKeys.all],
  'figure-type-group': () => [figureTypeKeys.list(), figureKeys.all],
  'figure-type': () => [figureTypeKeys.list(), figureKeys.all],
  'series-group': () => [seriesKeys.list(), figureKeys.all],
  'series': () => [seriesKeys.list(), figureKeys.all],
  'genre-character-group': () => [genreCharacterKeys.list(), figureKeys.all],
  'genre-character': () => [genreCharacterKeys.list(), figureKeys.all],
  'maker': () => [makerKeys.list(), figureKeys.all],
  'user': () => [],
};
