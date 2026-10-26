/** 장르·캐릭터 보관 키. all 은 전부, groupAll 은 왼쪽 그룹 목록, page 는 오른쪽 단 한 쪽(그룹과 쪽 번호별), pageAll 은 오른쪽 모든 쪽 */
export const genreCharacterKeys = {
  all: ['genre-character'] as const,
  groupAll: () => [...genreCharacterKeys.all, 'list'] as const,
  page: (groupId: number, page: number) => [...genreCharacterKeys.pageAll(), groupId, page] as const,
  pageAll: () => [...genreCharacterKeys.all, 'child-list'] as const,
};
