import dayjs, { type Dayjs } from 'dayjs';
import type { BudgetSettingRequestBody } from '@/app/budget/interface/BudgetSettingRequestBody';
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
