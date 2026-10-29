import dayjs, { type Dayjs } from 'dayjs';

/** 기간 범위 ("YYYY-MM-DD", 종료일 포함) */
interface BudgetPeriodRange {
  startDate: string;
  endDate: string;
}

const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * 시작일 설정으로 오늘이 속한 기간을 미리 계산한다 (시작하기 화면의 "이번 기간" 안내용).
 * 기간은 시작일부터 다음 달 시작일 전날까지다. 예: 시작일 25일, 오늘 10/29 이면 10/25 ~ 11/24.
 * 실제 기간은 서버가 만들고, 여기서는 안내 문구에만 쓴다.
 */
export const getBudgetPeriodRange = (startDay: number, today: Dayjs = dayjs()): BudgetPeriodRange => {
  const thisMonthStart = today.date(startDay);
  const start = today.date() >= startDay ? thisMonthStart : thisMonthStart.subtract(1, 'month');
  const end = start.add(1, 'month').subtract(1, 'day');

  return { startDate: start.format(DATE_FORMAT), endDate: end.format(DATE_FORMAT) };
};
