/** 예산 시작(POST /api/budget/start)과 설정 변경(PUT /api/budget/setting)의 요청 본문. 두 값을 항상 같이 보낸다 */
export interface BudgetSettingRequestBody {
  /** 기간 시작일 (1~28) */
  startDay: number;

  /** 기본 예산(원, 0 이상) */
  defaultBudget: number;
}
