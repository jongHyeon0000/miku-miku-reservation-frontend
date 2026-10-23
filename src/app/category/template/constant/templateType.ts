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

/** 개수 뒤에 붙이는 단위 이름 (예: 캐릭터 297개) */
export const TEMPLATE_ITEM_UNITS: Record<TemplateType, string> = {
  GENRE_CHARACTER: '캐릭터',
  SERIES: '시리즈',
  MAKER: '제조사',
  SHOP: '스토어',
  FIGURE_TYPE: '형태',
};
