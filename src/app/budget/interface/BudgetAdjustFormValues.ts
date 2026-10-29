/** 증감 입력 줄 폼 값. 금액은 입력칸이라 글자로 받고, 보낼 때 숫자로 바꾼다 */
export interface BudgetAdjustFormValues {
  /** 증감 금액(원) 입력값. 빼려면 앞에 -를 붙인다 */
  amount: string;

  /** 이유 메모 입력값 (비워도 된다) */
  memo: string;
}
