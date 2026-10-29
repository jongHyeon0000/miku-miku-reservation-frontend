import type { BudgetAdjust } from '@/app/budget/interface/BudgetAdjust';
import type { BudgetPeriod } from '@/app/budget/interface/BudgetPeriod';
import type { BudgetSpending } from '@/app/budget/interface/BudgetSpending';

/** 예산 현황 (GET /api/budget). 이 값의 enabled, resumable 로 보여 줄 화면을 고른다 */
export interface BudgetStatus {
  /** 예산 사용 여부 */
  enabled: boolean;

  /** 꺼져 있을 때만 의미가 있다. 이번 기간 기록이 남아 있어 입력 없이 다시 켤 수 있는지(켜져 있으면 항상 false) */
  resumable: boolean;

  /** 기간 시작일 설정(1~28). 꺼져 있으면 마지막 설정값, 처음이면 1 */
  startDay: number;

  /** 기본 예산 설정(원). 꺼져 있으면 마지막 설정값, 처음이면 0 */
  defaultBudget: number;

  /** 이번 기간 현황. 꺼져 있으면 null */
  period: BudgetPeriod | null;

  /** 이번 기간 증감 목록(최근 순). 꺼져 있으면 빈 배열 */
  adjusts: BudgetAdjust[];

  /** 이번 기간 지출 목록(최근 결제일 순). 꺼져 있으면 빈 배열 */
  spendings: BudgetSpending[];
}
