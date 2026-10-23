/** 시리즈 보관 키. all 은 시리즈 관련 전부, list 는 목록 */
export const seriesKeys = {
  all: ['series'] as const,
  list: () => [...seriesKeys.all, 'list'] as const,
};
