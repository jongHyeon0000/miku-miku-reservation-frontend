/** 예산 보관 키. all 은 예산 관련 전부, current 는 현황(GET /api/budget) 한 건 */
export const budgetKeys = {
  all: ['budget'] as const,
  current: () => [...budgetKeys.all, 'current'] as const,
};
