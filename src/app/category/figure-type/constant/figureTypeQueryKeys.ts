/** 형태 보관 키. all 은 형태 관련 전부, list 는 목록 */
export const figureTypeKeys = {
  all: ['figure-type'] as const,
  list: () => [...figureTypeKeys.all, 'list'] as const,
};
