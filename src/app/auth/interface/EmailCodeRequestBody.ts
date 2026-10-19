export interface EmailCodeRequestBody {
  /** 인증 코드를 받을 이메일 (서버가 소문자로 바꿔 처리) */
  email: string;

  /** 로그인 아이디 (비밀번호 재설정 발송에서만 보낸다) */
  loginId?: string;
}
