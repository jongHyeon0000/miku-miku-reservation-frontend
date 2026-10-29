/** 증감 추가(POST)와 수정(PATCH)의 요청 본문. 수정은 한 줄을 통째로 덮어쓰므로 금액과 메모를 항상 같이 보낸다 */
export interface BudgetAdjustRequestBody {
  /** 증감 금액(원). 0이 아닌 정수이고 더하면 양수, 빼면 음수 */
  amount: number;

  /** 이유 메모 (100자 이하). 수정에서 비우면 지워진다 */
  memo?: string;
}
