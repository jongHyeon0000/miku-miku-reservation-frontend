import type { SignupRequestBody } from '@/app/auth/interface/SignupRequestBody';

export interface SignupFormValues extends SignupRequestBody {
  /** 비밀번호 확인 (화면에서만 쓰고 서버에는 보내지 않는다) */
  passwordConfirm: string;

  /** 이메일로 받은 인증 코드 (화면에서만 쓰고 가입 요청에는 보내지 않는다) */
  emailCode: string;
}
