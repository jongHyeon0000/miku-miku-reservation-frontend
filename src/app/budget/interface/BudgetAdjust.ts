/** 이번 기간의 증감 한 줄 */
export interface BudgetAdjust {
  /** 증감 id (수정, 삭제에 쓴다) */
  budgetAdjustId: number;

  /** 속한 기간 id */
  budgetPeriodId: number;

  /** 증감 금액(원, 부호 있음) */
  amount: number;

  /** 메모. 없으면 서버가 이 필드를 생략한다 */
  memo?: string;

  /** 등록 시각 ("YYYY-MM-DDTHH:mm:ss", 시간대 없음) */
  createdAt: string;

  /** 수정 시각 ("YYYY-MM-DDTHH:mm:ss", 시간대 없음) */
  updatedAt: string;
}
