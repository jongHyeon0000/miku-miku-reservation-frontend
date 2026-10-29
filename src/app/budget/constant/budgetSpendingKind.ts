/** 지출 종류 (전액 / 예약금 / 잔금). 한 상품이 예약금과 잔금을 같은 기간에 냈으면 두 줄로 온다 */
export const BUDGET_SPENDING_KINDS = ['FULL', 'DEPOSIT', 'BALANCE'] as const;

export type BudgetSpendingKind = (typeof BUDGET_SPENDING_KINDS)[number];
