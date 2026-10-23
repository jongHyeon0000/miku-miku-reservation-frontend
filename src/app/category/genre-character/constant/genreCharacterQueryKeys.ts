/** 장르·캐릭터 보관 키. all 은 장르·캐릭터 관련 전부, list 는 목록 */
export const genreCharacterKeys = {
  all: ['genre-character'] as const,
  list: () => [...genreCharacterKeys.all, 'list'] as const,
};
