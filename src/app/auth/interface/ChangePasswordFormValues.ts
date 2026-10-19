import type { ChangePasswordRequestBody } from '@/app/auth/interface/ChangePasswordRequestBody';

export interface ChangePasswordFormValues extends ChangePasswordRequestBody {
  /** 새 비밀번호 확인 (화면에서만 쓰고 서버에는 보내지 않는다) */
  newPasswordConfirm: string;
}
