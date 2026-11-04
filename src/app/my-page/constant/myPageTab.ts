/**
* 마이페이지 탭 (내 정보, 최근 글, 최근 댓글, 회원 탈퇴)
* */
export const MY_PAGE_TABS = {
  PROFILE: '내 정보',
  POSTS: '최근 글',
  COMMENTS: '최근 댓글',
  WITHDRAW: '회원 탈퇴',
} as const;

export type MyPageTabKey = keyof typeof MY_PAGE_TABS;

export const isMyPageTabKey = (value: string): value is MyPageTabKey => value in MY_PAGE_TABS;

/**
* 타인 프로필 탭 (최근 글, 최근 댓글). 내 정보와 회원 탈퇴는 내 것이라 없다
* */
export const USER_PROFILE_TABS = {
  POSTS: '최근 글',
  COMMENTS: '최근 댓글',
} as const;

export type UserProfileTabKey = keyof typeof USER_PROFILE_TABS;

export const isUserProfileTabKey = (value: string): value is UserProfileTabKey => value in USER_PROFILE_TABS;
