/** 분류 축 (화면 탭 하나). 주소의 ?axis= 값으로도 쓴다 */
export type CategoryAxisKey = 'shop' | 'figure-type' | 'series' | 'genre-character' | 'maker';

/** 분류 단계. group 은 상위, child 는 하위 */
export type CategoryLevel = 'group' | 'child';

/** 탭에 보여 줄 축 이름 (탭 순서는 이 순서) */
export const CATEGORY_AXIS_NAMES: Record<CategoryAxisKey, string> = {
  'shop': '판매처',
  'figure-type': '형태',
  'series': '시리즈',
  'genre-character': '장르·캐릭터',
  'maker': '제조사',
};

/** 주소에 축이 없거나 알 수 없는 값이면 처음 보여 줄 축 */
export const DEFAULT_CATEGORY_AXIS: CategoryAxisKey = 'shop';

/** 서버가 이름 변경과 삭제를 막아 둔 기본 분류의 이름 */
export const PROTECTED_CATEGORY_NAME = '기타';

/** 주소의 ?axis= 값이 축 이름인지 확인 */
export const isCategoryAxisKey = (value: string | null): value is CategoryAxisKey => {
  return value !== null && value in CATEGORY_AXIS_NAMES;
};
