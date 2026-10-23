/** 상품 보관 키. all 은 상품 관련 전부, detail 은 상세 한 건 */
export const figureKeys = {
  all: ['figure'] as const,
  detail: (figureId: number) => [...figureKeys.all, 'detail', figureId] as const,
};
