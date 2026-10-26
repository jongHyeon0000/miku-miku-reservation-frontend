/** 제조사 보관 키. all 은 전부, page 는 단 한 쪽(쪽 번호별), pageAll 은 모든 쪽 */
export const makerKeys = {
  all: ['maker'] as const,
  page: (page: number) => [...makerKeys.pageAll(), page] as const,
  pageAll: () => [...makerKeys.all, 'list'] as const,
};
