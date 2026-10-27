/**
 * 서버가 준 날짜시간('2026-10-26T10:30:00')을 '2026.10.26' 모양으로 바꾼다.
 */
export const formatPostDate = (dateTime: string): string => {
  const dateOnly = dateTime.slice(0, 10);
  return dateOnly.replace(/-/g, '.');
};

/**
 * [게시글 폼]
 *
 * 제목: 앞뒤 공백을 뺀 1~200자
 */
export const validatePostTitle = (value: string): string | undefined => {
  const trimmed = value.trim();

  if (trimmed === '') {
    return '제목을 입력해 주세요.';
  }

  if (trimmed.length > 200) {
    return '제목은 200자 이하로 입력해 주세요.';
  }

  return undefined;
};

/**
 * [게시글 폼]
 *
 * 본문: 비어 있으면 안 된다(에디터는 내용이 없으면 빈 글자를 준다)
 */
export const validatePostContent = (value: string): string | undefined => {
  if (value.trim() === '') {
    return '내용을 입력해 주세요.';
  }

  return undefined;
};
