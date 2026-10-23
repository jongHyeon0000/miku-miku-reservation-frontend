/** 상품 보관 키. all 은 상품 관련 전부, list 는 목록, formOptions 는 분류 선택지, detail 은 상세 한 건 */
export const figureKeys = {
  all: ['figure'] as const,
  list: () => [...figureKeys.all, 'list'] as const,
  formOptions: () => [...figureKeys.all, 'form-options'] as const,
  detail: (figureId: number) => [...figureKeys.all, 'detail', figureId] as const,
};
