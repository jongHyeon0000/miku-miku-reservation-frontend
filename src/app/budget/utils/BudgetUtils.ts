import dayjs, { type Dayjs } from 'dayjs';
import type { BudgetSettingRequestBody } from '@/app/budget/interface/BudgetSettingRequestBody';
import { formatPrice } from '@/app/common/utils/CommonUtils';
import type { BudgetStartFormValues } from '@/app/budget/interface/BudgetStartFormValues';

const LABEL_FORMAT = 'MM/DD';

/**
 * 시작일 설정으로 오늘이 속한 기간을 "10/25 ~ 11/24" 모양으로 만든다 (시작하기, 다시 켜기 화면의 안내용).
 * 기간은 시작일부터 다음 달 시작일 전날까지다. 실제 기간은 서버가 만들고, 여기서는 안내 문구에만 쓴다.
 */
export const getBudgetPeriodLabel = (startDay: number, today: Dayjs = dayjs()): string => {
  const thisMonthStart = today.date(startDay);
  const start = today.date() >= startDay ? thisMonthStart : thisMonthStart.subtract(1, 'month');
  const end = start.add(1, 'month').subtract(1, 'day');

  return `${start.format(LABEL_FORMAT)} ~ ${end.format(LABEL_FORMAT)}`;
};

/**
 * 시작하기 폼의 처음 값. 서버가 준 마지막 설정으로 채우고, 기본 예산이 0이면 칸을 비워 둔다
 */
export const toBudgetStartFormValues = (startDay: number, defaultBudget: number): BudgetStartFormValues => {
  return { startDay: startDay, defaultBudget: defaultBudget > 0 ? String(defaultBudget) : '' };
};

/**
 * 시작하기 폼 값을 서버 요청 본문으로 바꾼다
 */
export const toBudgetSettingRequestBody = (values: BudgetStartFormValues): BudgetSettingRequestBody => {
  return { startDay: values.startDay, defaultBudget: Number(values.defaultBudget) };
};

/**
 * 날짜 글자를 "10/20" 모양으로 바꾼다 (증감, 지출 줄의 날짜). "2026-10-20"과 "2026-10-20T10:13:50" 모두 받는다
 */
export const formatBudgetDate = (date: string): string => {
  return dayjs(date).format(LABEL_FORMAT);
};

/**
 * 기간 범위를 "2026.10.25 ~ 2026.11.24" 모양으로 만든다 (이번 기간 카드 제목 옆)
 */
export const formatBudgetPeriod = (startDate: string, endDate: string): string => {
  return `${dayjs(startDate).format('YYYY.MM.DD')} ~ ${dayjs(endDate).format('YYYY.MM.DD')}`;
};

/**
 * 부호를 붙인 금액 (예: 50000 -> "+50,000원", -30000 -> "-30,000원")
 */
export const formatSignedPrice = (amount: number): string => {
  return amount > 0 ? `+${formatPrice(amount)}` : formatPrice(amount);
};

/**
 * 총 예산 대비 지출 비율(%). 100을 넘을 수 있다. 총 예산이 0 이하이면 지출이 있을 때만 100으로 본다
 */
export const getBudgetUsagePercent = (spent: number, totalBudget: number): number => {
  if (totalBudget <= 0) {
    return spent > 0 ? 100 : 0;
  }

  return Math.round((spent / totalBudget) * 100);
};

/**
 * 금액의 부호 칸 글자. 0보다 크면 "+", 작으면 "−", 0이면 빈 글자 (증감 합계, 증감 줄의 부호 칸)
 */
export const getBudgetSignMark = (amount: number): string => {
  if (amount > 0) {
    return '+';
  }

  if (amount < 0) {
    return '−';
  }

  return '';
};
