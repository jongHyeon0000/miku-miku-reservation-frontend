/**
* 마이페이지 탭 (내 정보, 최근 글, 최근 답변, 회원 탈퇴)
* */
export const MY_PAGE_TABS = {
  PROFILE: '내 정보',
  POSTS: '최근 글',
  COMMENTS: '최근 답변',
  WITHDRAW: '회원 탈퇴',
} as const;

export type MyPageTabKey = keyof typeof MY_PAGE_TABS;

export const isMyPageTabKey = (value: string): value is MyPageTabKey => value in MY_PAGE_TABS;
