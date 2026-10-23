/** 제조사 보관 키. all 은 제조사 관련 전부, list 는 목록 */
export const makerKeys = {
  all: ['maker'] as const,
  list: () => [...makerKeys.all, 'list'] as const,
};
