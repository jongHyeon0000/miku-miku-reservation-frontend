/**
 * 서버가 준 날짜시간('2026-10-26T10:30:00')을 '2026.10.26' 모양으로 바꾼다.
 */
export const formatPostDate = (dateTime: string): string => {
  const dateOnly = dateTime.slice(0, 10);
  return dateOnly.replace(/-/g, '.');
};
