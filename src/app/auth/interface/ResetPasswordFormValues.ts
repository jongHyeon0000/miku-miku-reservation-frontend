export interface ResetPasswordFormValues {
  /** 새 비밀번호 (8~20자) */
  newPassword: string;

  /** 새 비밀번호 확인 (화면에서만 쓰고 서버에는 보내지 않는다) */
  newPasswordConfirm: string;
}
