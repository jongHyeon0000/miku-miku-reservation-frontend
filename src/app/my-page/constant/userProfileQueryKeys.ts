/** 사용자 프로필 보관 키. all 은 전부, detail 은 한 사용자의 프로필 */
export const userProfileKeys = {
  all: ['user-profile'] as const,
  detail: (userId: number) => [...userProfileKeys.all, 'detail', userId] as const,
};
