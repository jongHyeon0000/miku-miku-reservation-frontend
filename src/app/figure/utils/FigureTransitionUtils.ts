import dayjs, { type Dayjs } from 'dayjs';
import { formatPrice } from '@/app/common/utils/CommonUtils';
import { FIGURE_STATUS_LABELS, type FigureStatus, type FigureTabKey } from '@/app/figure/constant/figureStatus';
import { FIGURE_TRANSITIONS, type FigureTransition } from '@/app/figure/constant/figureTransition';
import type { FigureStatusFormValues } from '@/app/figure/interface/status/FigureStatusFormValues';
import type { FigureStatusRequestBody } from '@/app/figure/interface/status/FigureStatusRequestBody';
import type { FigureSummary } from '@/app/figure/interface/common/FigureSummary';
import { getTotalPrice } from '@/app/figure/utils/FigureUtils';
import type { BudgetSpendingKind } from '@/app/budget/constant/budgetSpendingKind';
import type { BudgetPaymentCheckRequestBody } from '@/app/budget/interface/BudgetPaymentCheckRequestBody';
import type { BudgetPaymentWarning } from '@/app/budget/interface/BudgetPaymentWarning';
import type { BudgetSpending } from '@/app/budget/interface/BudgetSpending';

/** 확인창 글자 (sweetalert2). 계산이 필요한 글자는 함수 값 */
const STATUS_ALERT = {
  /* 미구매 상품을 일괄 구매완료로 바꿀 때만 덧붙인다 (전액 결제로 확정되므로) */
  fullPayment: '<br><br>예약금으로 구매한 상품이 섞여 있다면 취소하고 상세 화면에서 하나씩 예약완료로 바꿔 주세요.',
  bulk: (count: number, nextLabel: string, dateText: string, fullPaymentText: string) => ({
    title: `${count}개를 ${nextLabel}로 바꿀까요?`,
    html: `${dateText}하나라도 처리할 수 없는 상품이 있으면 전부 취소돼요.<br>저장하면 되돌릴 수 없어요.${fullPaymentText}`,
    confirmText: '변경',
    cancelText: '취소',
  }),
  single: (nextLabel: string, detail: string) => ({
    title: `${nextLabel}로 바꿀까요?`,
    text: `${detail} 저장하면 되돌릴 수 없어요.`,
    confirmText: '변경',
    cancelText: '취소',
  }),
  reservedNoDue: (deposit: string, paidAt: string) => ({
    title: '잔금 기한이 비어 있어요',
    html:
      `예약금 ${deposit} · 결제일 ${paidAt} 로 예약완료 처리할게요.<br><br>` +
      '잔금 기한을 입력하지 않으면 이 상품은 <b>잔금 마감 알림이 뜨지 않아요.</b> ' +
      '잔금은 직접 챙겨서 납부해 주시고, 납부한 뒤에는 잊지 말고 구매완료로 바꿔 주세요.<br><br>' +
      '저장하면 예약금과 날짜는 <b>수정할 수 없어요.</b>',
    confirmText: '그대로 저장',
    cancelText: '기한 입력하러 가기',
    focusCancel: true,
  }),
  reservedWithDue: (deposit: string, paidAt: string, dueDate: string) => ({
    title: '이 내용으로 저장할까요?',
    html: `예약금 ${deposit} · 결제일 ${paidAt} · 잔금 기한 ${dueDate}<br>저장하면 수정할 수 없어요.`,
    confirmText: '저장',
    cancelText: '다시 확인',
  }),
};

/** 목록에서 이 탭의 상품을 한 번에 바꿀 수 있는 전이. 없으면 undefined (전체, 배송완료 탭) */
export const findBulkTransition = (tab: FigureTabKey): FigureTransition | undefined => {
  return FIGURE_TRANSITIONS.find((transition) => transition.from === tab && transition.bulk);
};

/** 이 상태에서 갈 수 있는 전이들 */
export const findTransitions = (status: FigureStatus): FigureTransition[] => {
  return FIGURE_TRANSITIONS.filter((transition) => transition.from === status);
};

/** 바꿀 상태 이름으로 만든 버튼 글자 (예: 구매완료로 변경) */
export const getTransitionLabel = (transition: FigureTransition): string => {
  return `${FIGURE_STATUS_LABELS[transition.next]}로 변경`;
};

/** 창을 열 때의 입력값. 날짜는 오늘, 바꿀 상태는 첫 번째 전이 */
export const toStatusFormValues = (transitions: FigureTransition[], totalPrice: number): FigureStatusFormValues => {
  return { nextStatus: transitions[0].next, depositAmount: '', date: dayjs(), balanceDueDate: null, totalPrice };
};

/** 입력값을 요청 본문으로 (날짜 칸이 없는 전이는 날짜를 보내지 않는다) */
export const toStatusRequestBody = (
  transition: FigureTransition,
  values: FigureStatusFormValues,
  figureIds?: number[],
): FigureStatusRequestBody => {
  const body: FigureStatusRequestBody = { status: transition.next };

  if (transition.paymentType !== null) {
    body.paymentType = transition.paymentType;
  }

  if (transition.dateField !== null && values.date !== null) {
    body[transition.dateField] = values.date.format('YYYY-MM-DD');
  }

  if (transition.next === 'RESERVED') {
    body.depositAmount = Number(values.depositAmount);

    if (values.balanceDueDate?.isValid()) {
      body.balanceDueDate = values.balanceDueDate.format('YYYY-MM-DD');
    }
  }

  if (figureIds !== undefined) {
    body.figureIds = figureIds;
  }

  return body;
};

const formatMonthDay = (date: Dayjs): string => date.format('M/D');

/** 일괄 변경 확인창 */
export const getBulkConfirm = (transition: FigureTransition, count: number, date: Dayjs | null) => {
  const dateText = date !== null ? `${transition.dateLabel} ${formatMonthDay(date)}로 처리해요.<br><br>` : '';
  const fullPaymentText = transition.paymentType === 'FULL' ? STATUS_ALERT.fullPayment : '';
  return STATUS_ALERT.bulk(count, FIGURE_STATUS_LABELS[transition.next], dateText, fullPaymentText);
};

/** 개별 변경 확인창. 예약완료는 잔금 기한을 비웠는지에 따라 문구가 다르다 */
export const getSingleConfirm = (transition: FigureTransition, values: FigureStatusFormValues) => {
  const nextLabel = FIGURE_STATUS_LABELS[transition.next];
  const date = values.date;

  if (transition.next === 'RESERVED') {
    const deposit = formatPrice(Number(values.depositAmount));
    const paidAt = formatMonthDay(date!);

    if (!values.balanceDueDate?.isValid()) {
      return STATUS_ALERT.reservedNoDue(deposit, paidAt);
    }

    return STATUS_ALERT.reservedWithDue(deposit, paidAt, formatMonthDay(values.balanceDueDate));
  }

  const detail = date !== null ? `${transition.dateLabel} ${formatMonthDay(date)}로 ${nextLabel} 처리할게요.` : `${nextLabel}로 바꿀게요.`;
  return STATUS_ALERT.single(nextLabel, detail);
};

/** 이 전이가 돈을 내는 전이인지 (예약금, 전액, 잔금). 예산 확인은 이런 전이에서만 한다 */
export const isPaymentTransition = (transition: FigureTransition): boolean => {
  return transition.next === 'RESERVED' || transition.next === 'PURCHASED';
};

/** 결제 한 번의 종류: 예약완료는 예약금, 미구매에서 구매완료는 전액, 예약완료에서 구매완료는 잔금 */
const getPaymentKind = (transition: FigureTransition): BudgetSpendingKind => {
  if (transition.next === 'RESERVED') {
    return 'DEPOSIT';
  }

  if (transition.paymentType === 'FULL') {
    return 'FULL';
  }

  return 'BALANCE';
};

/** 상품 하나의 결제 금액. 서버의 계산식과 같다: 예약금은 입력한 금액, 전액은 가격 × 수량, 잔금은 가격 × 수량 − 낸 예약금 */
const getPaymentAmount = (figure: FigureSummary, kind: BudgetSpendingKind, depositAmount: number): number => {
  if (kind === 'DEPOSIT') {
    return depositAmount;
  }

  const totalPrice = getTotalPrice(figure);

  if (kind === 'FULL') {
    return totalPrice;
  }

  const paidDeposit = figure.depositAmount === null ? 0 : figure.depositAmount;
  return totalPrice - paidDeposit;
};

/** 결제 전 예산 확인 요청 본문. 상태 변경 요청과 같은 값(상품, 결제일, 예약금)을 쓴다 */
export const toPaymentCheckRequestBody = (
  transition: FigureTransition,
  figureIds: number[],
  paidAt: string,
  depositAmount: number,
): BudgetPaymentCheckRequestBody => {
  if (transition.next === 'RESERVED') {
    return { figureIds: figureIds, status: 'RESERVED', depositAmount: depositAmount, depositPaidAt: paidAt };
  }

  return { figureIds: figureIds, status: 'PURCHASED', paidAt: paidAt };
};

/**
 * 결제 초과 경고 모달의 내용. 상품별 결제 내역은 화면이 계산하므로, 합이 서버의 결제 합계와 다르면 비워서 합계만 보여 준다.
 */
export const toBudgetPaymentWarning = (
  transition: FigureTransition,
  figures: FigureSummary[],
  paidAt: string,
  depositAmount: number,
  payAmount: number,
  remaining: number,
  remainingAfter: number,
): BudgetPaymentWarning => {
  const kind = getPaymentKind(transition);
  const payments: BudgetSpending[] = figures.map((figure) => ({
    figureId: figure.figureId,
    figureName: figure.name,
    kind: kind,
    paidDate: paidAt,
    amount: getPaymentAmount(figure, kind, depositAmount),
  }));
  const paymentsTotal = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const subtitle = `${FIGURE_STATUS_LABELS[transition.next]}로 바꾸는 상품 ${figures.length}개 · ${transition.dateLabel} ${paidAt.replaceAll('-', '.')}`;

  return {
    subtitle: subtitle,
    figures: figures,
    payments: paymentsTotal === payAmount ? payments : [],
    payAmount: payAmount,
    remaining: remaining,
    remainingAfter: remainingAfter,
  };
};
