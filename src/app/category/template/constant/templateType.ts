import type { CategoryAxisKey } from '@/app/category/common/constant/categoryAxes';

/** 템플릿 종류 (서버의 templateType 과 같은 값) */
export const TEMPLATE_TYPES = ['GENRE_CHARACTER', 'SERIES', 'MAKER', 'SHOP', 'FIGURE_TYPE'] as const;

export type TemplateType = (typeof TEMPLATE_TYPES)[number];

/** 템플릿 종류가 채우는 분류 축. 한글 이름은 CATEGORY_AXIS_NAMES 를 그대로 쓴다 */
export const TEMPLATE_TYPE_AXES: Record<TemplateType, CategoryAxisKey> = {
  GENRE_CHARACTER: 'genre-character',
  SERIES: 'series',
  MAKER: 'maker',
  SHOP: 'shop',
  FIGURE_TYPE: 'figure-type',
};
