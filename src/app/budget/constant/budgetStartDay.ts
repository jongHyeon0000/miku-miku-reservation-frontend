/** 기간 시작일로 고를 수 있는 날짜 (1~28. 29일 이후는 없는 달이 있어 서버가 받지 않는다) */
export const BUDGET_START_DAYS = Array.from({ length: 28 }, (_, index) => index + 1);
