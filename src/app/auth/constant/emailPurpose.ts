/* 이메일 인증 목적별 코드 발송 경로 (가입, 아이디 찾기, 비밀번호 재설정이 같은 인증 코드 흐름을 쓴다) */
export const EMAIL_CODE_PATHS = {
  SIGNUP: '/api/auth/signup/email-code',
  FIND_ID: '/api/auth/find-id/email-code',
  RESET_PASSWORD: '/api/auth/reset-password/email-code',
} as const;

/* 인증 목적. 서버의 purpose 값과 같다 */
export type EmailPurpose = keyof typeof EMAIL_CODE_PATHS;
