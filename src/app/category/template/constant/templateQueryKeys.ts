import type { QueryKey } from '@tanstack/react-query';
import { figureTypeKeys } from '@/app/category/figure-type/constant/figureTypeQueryKeys';
import { genreCharacterKeys } from '@/app/category/genre-character/constant/genreCharacterQueryKeys';
import { makerKeys } from '@/app/category/maker/constant/makerQueryKeys';
import { seriesKeys } from '@/app/category/series/constant/seriesQueryKeys';
import { shopKeys } from '@/app/category/shop/constant/shopQueryKeys';
import type { TemplateType } from '@/app/category/template/constant/templateType';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';

/** 템플릿 보관 키. all 은 템플릿 관련 전부, list 는 목록 */
export const templateKeys = {
  all: ['template'] as const,
  list: () => [...templateKeys.all, 'list'] as const,
};

/* 가져오기가 성공하면 낡아지는 키. 분류 생성과 같은 규칙이다(해당 축 목록과 상품 폼의 선택지). 템플릿은 바뀌지 않으므로 템플릿 목록 키는 울리지 않는다 */
export const TEMPLATE_IMPORT_QUERY_KEYS: Record<TemplateType, QueryKey[]> = {
  GENRE_CHARACTER: [genreCharacterKeys.list(), figureKeys.formOptions()],
  SERIES: [seriesKeys.list(), figureKeys.formOptions()],
  MAKER: [makerKeys.list(), figureKeys.formOptions()],
  SHOP: [shopKeys.list(), figureKeys.formOptions()],
  FIGURE_TYPE: [figureTypeKeys.list(), figureKeys.formOptions()],
};
