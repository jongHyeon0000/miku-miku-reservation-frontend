import dayjs from 'dayjs';
import { pickWelcomeIntroFigures } from '@/app/welcome-intro/constant/welcomeIntroFigures';
import { getTotalPrice } from '@/app/figure/utils/FigureUtils';
import type { BudgetAdjust } from '@/app/budget/interface/BudgetAdjust';
import type { BudgetPaymentWarning } from '@/app/budget/interface/BudgetPaymentWarning';
import type { BudgetPeriod } from '@/app/budget/interface/BudgetPeriod';
import type { BudgetSpending } from '@/app/budget/interface/BudgetSpending';

/**
* 예산 소개 화면 데모에 쓰는 목데이터 (실제 응답의 모양 그대로, 실제 내역과 무관).
* 기간은 항상 "이번 달"로 만들어 언제 열어도 이번 기간처럼 보이게 한다. 상품은 처음 화면의 목데이터를 가져다 쓴다.
* */

const DATE_FORMAT = 'YYYY-MM-DD';

const dayBefore = (days: number): string => dayjs().subtract(days, 'day').format(DATE_FORMAT);

/** 2장 데모 대본: 시작일과 기본 예산이 이 순서로 바뀐다 */
export const BUDGET_INTRO_PERIOD_STEPS = [
  { startDay: 25, defaultBudget: 550000 },
  { startDay: 1, defaultBudget: 300000 },
  { startDay: 10, defaultBudget: 400000 },
  { startDay: 15, defaultBudget: 700000 },
  { startDay: 28, defaultBudget: 250000 },
];

/** 3장 데모 대본: 지출이 이 순서로 늘고 줄며, 총 예산(620,000)을 넘기는 값도 있다 */
export const BUDGET_INTRO_SPENT_STEPS = [450000, 280000, 600000, 700000, 350000];

const BASE_BUDGET = 550000;
const ADJUST_TOTAL = 70000;

/** 지출에 따라 달라지는 이번 기간 현황 (기본 예산 550,000 + 증감 70,000 = 총 예산 620,000) */
export const toBudgetIntroPeriod = (spent: number): BudgetPeriod => {
  const totalBudget = BASE_BUDGET + ADJUST_TOTAL;

  return {
    budgetPeriodId: 1,
    startDate: dayjs().startOf('month').format(DATE_FORMAT),
    endDate: dayjs().endOf('month').format(DATE_FORMAT),
    amount: BASE_BUDGET,
    adjustTotal: ADJUST_TOTAL,
    totalBudget: totalBudget,
    spent: spent,
    remaining: totalBudget - spent,
  };
};

/** 이번 기간 증감 (보너스 +100,000, 경조사 -30,000) */
export const BUDGET_INTRO_ADJUSTS: BudgetAdjust[] = [
  { budgetAdjustId: 1, budgetPeriodId: 1, amount: 100000, memo: '보너스', createdAt: `${dayBefore(6)}T10:00:00`, updatedAt: `${dayBefore(6)}T10:00:00` },
  { budgetAdjustId: 2, budgetPeriodId: 1, amount: -30000, memo: '경조사', createdAt: `${dayBefore(3)}T10:00:00`, updatedAt: `${dayBefore(3)}T10:00:00` },
];

const SPENDING_FIGURES = pickWelcomeIntroFigures([4, 5, 6]);
const SPENDING_AMOUNTS = [250000, 120000, 80000];

/** 이번 기간 지출 (합계 450,000) */
export const BUDGET_INTRO_SPENDINGS: BudgetSpending[] = SPENDING_FIGURES.map((figure, index) => ({
  figureId: figure.figureId,
  figureName: figure.name,
  kind: 'FULL',
  paidDate: dayBefore(index + 1),
  amount: SPENDING_AMOUNTS[index],
}));

/** 4장 데모가 보여 줄 상품 (경고 모달 뒤에 카드로 같이 보인다. 모달 높이만큼 데모 영역이 필요해서 셋이다. 첫 번째가 경고 대상) */
export const BUDGET_INTRO_LINK_FIGURES = pickWelcomeIntroFigures([3, 4, 5]);

const WARNING_FIGURE = BUDGET_INTRO_LINK_FIGURES[0];
const WARNING_REMAINING_AFTER = -40000;
const WARNING_PAY_AMOUNT = getTotalPrice(WARNING_FIGURE);

/** 상태를 바꾸면 예산을 넘는 경고 모달의 목데이터 (결제 후 남은 돈이 -40,000원) */
export const BUDGET_INTRO_WARNING: BudgetPaymentWarning = {
  figures: [WARNING_FIGURE],
  payments: [
    {
      figureId: WARNING_FIGURE.figureId,
      figureName: WARNING_FIGURE.name,
      kind: 'FULL',
      paidDate: dayjs().format(DATE_FORMAT),
      amount: WARNING_PAY_AMOUNT,
    },
  ],
  payAmount: WARNING_PAY_AMOUNT,
  remaining: WARNING_PAY_AMOUNT + WARNING_REMAINING_AFTER,
  remainingAfter: WARNING_REMAINING_AFTER,
};
