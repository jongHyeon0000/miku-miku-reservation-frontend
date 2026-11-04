import type { UserProfile } from '@/app/auth/interface/UserProfile';

/** 내 정보 (GET /api/auth/me 의 data). 프로필 필드에 아이디, 이메일, 수정 일시가 더 있다 */
export interface UserInfo extends UserProfile {
  /** 로그인 아이디 (영문, 숫자 4~30자) */
  loginId: string;

  /** 이메일 */
  email: string;

  /** 수정 일시 */
  updatedAt: string;
}
