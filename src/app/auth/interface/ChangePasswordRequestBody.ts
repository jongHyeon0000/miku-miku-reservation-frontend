export interface ChangePasswordRequestBody {
  /** 현재 비밀번호 (평문) */
  currentPassword: string;

  /** 새 비밀번호 (8~20자) */
  newPassword: string;
}
