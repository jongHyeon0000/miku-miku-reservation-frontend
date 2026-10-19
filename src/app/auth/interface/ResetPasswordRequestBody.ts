export interface ResetPasswordRequestBody {
  /** 로그인 아이디 (코드를 받을 때 입력한 것과 같아야 한다) */
  loginId: string;

  /** 인증을 마친 이메일 (코드를 받을 때 입력한 것과 같아야 한다) */
  email: string;

  /** 새 비밀번호 (8~20자) */
  newPassword: string;
}
