/** 이번 기간 현황 */
export interface BudgetPeriod {
  /** 기간 id */
  budgetPeriodId: number;

  /** 기간 시작일 ("YYYY-MM-DD") */
  startDate: string;

  /** 기간 종료일, 포함 ("YYYY-MM-DD") */
  endDate: string;

  /** 그 기간의 기본 예산(원) */
  amount: number;

  /** 증감 합계(원, 부호 있음) */
  adjustTotal: number;

  /** 총 예산(원) = 기본 예산 + 증감 합계 */
  totalBudget: number;

  /** 지출 합계(원). 결제일이 이 기간에 속하는 결제 금액의 합 */
  spent: number;

  /** 남은 돈(원) = 총 예산 - 지출. 음수일 수 있다 */
  remaining: number;
}
