/** 예산 시작하기 폼 값. 기본 예산은 입력칸이라 글자로 받고, 보낼 때 숫자로 바꾼다 */
export interface BudgetStartFormValues {
  /** 기간 시작일 (1~28) */
  startDay: number;

  /** 기본 예산(원) 입력값 */
  defaultBudget: string;
}
