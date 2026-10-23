/** 판매처 보관 키. all 은 판매처 관련 전부, list 는 목록 */
export const shopKeys = {
  all: ['shop'] as const,
  list: () => [...shopKeys.all, 'list'] as const,
};
