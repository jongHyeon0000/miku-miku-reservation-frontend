/** 결제 전 예산 확인 결과 */
export interface BudgetPaymentCheckResponseData {
  /** 결제하면 예산을 넘는지. 경고창을 띄울지 정하는 값 */
  exceeded: boolean;

  /** 이번에 나갈 결제 금액 합계(원). 예산이 꺼져 있으면 null */
  payAmount: number | null;

  /** 결제일이 속한 기간의 현재 남은 돈(원). 꺼져 있거나 그 기간이 없으면 null */
  remaining: number | null;

  /** 결제 후 남은 돈(원) = remaining - payAmount. 초과면 음수 */
  remainingAfter: number | null;
}
