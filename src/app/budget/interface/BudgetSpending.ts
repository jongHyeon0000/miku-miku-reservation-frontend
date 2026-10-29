import type { BudgetSpendingKind } from '@/app/budget/constant/budgetSpendingKind';

/** 이번 기간의 지출 한 줄 (상품의 결제 한 번) */
export interface BudgetSpending {
  /** 상품 id (상세로 이동) */
  figureId: number;

  /** 상품명 */
  figureName: string;

  /** 지출 종류 */
  kind: BudgetSpendingKind;

  /** 결제일 ("YYYY-MM-DD") */
  paidDate: string;

  /** 그 결제로 나간 금액(원) */
  amount: number;
}
