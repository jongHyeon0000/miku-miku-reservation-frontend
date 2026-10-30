import type { FigureSummary } from '@/app/figure/interface/common/FigureSummary';
import type { BudgetSpending } from '@/app/budget/interface/BudgetSpending';

/** 결제 초과 경고 모달이 보여 줄 값 (서버의 결제 전 예산 확인 결과 + 화면이 이미 가진 값) */
export interface BudgetPaymentWarning {
  /** 결제하려는 상품 (카드로 보여 준다) */
  figures: FigureSummary[];

  /** 상품별 결제 내역. 합이 서버의 결제 합계와 다르면 비워 두고 합계만 보여 준다 */
  payments: BudgetSpending[];

  /** 이번에 나갈 결제 금액 합계(원) */
  payAmount: number;

  /** 결제일이 속한 기간의 현재 남은 돈(원) */
  remaining: number;

  /** 결제 후 남은 돈(원) */
  remainingAfter: number;
}
