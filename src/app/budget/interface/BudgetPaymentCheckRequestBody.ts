import type { FigureStatus } from '@/app/figure/constant/figureStatus';

/** 결제 전 예산 확인(POST /api/budget/payment-check) 요청 본문. 읽기 전용이라 아무것도 바꾸지 않는다 */
export interface BudgetPaymentCheckRequestBody {
  /** 대상 상품 id 목록 (단건도 1개짜리 목록). 예약완료는 1개만 가능 */
  figureIds: number[];

  /** 넘기려는 상태 */
  status: Extract<FigureStatus, 'RESERVED' | 'PURCHASED'>;

  /** 예약금(원). 예약완료일 때 필수 */
  depositAmount?: number;

  /** 예약금 결제일 ("YYYY-MM-DD"). 생략하면 서버가 오늘로 본다 */
  depositPaidAt?: string;

  /** 전액, 잔금 결제일 ("YYYY-MM-DD"). 생략하면 서버가 오늘로 본다 */
  paidAt?: string;
}
