import type { EmailPurpose } from '@/app/auth/constant/emailPurpose';

export interface EmailVerifyRequestBody {
  /** 코드를 받은 이메일 */
  email: string;

  /** 코드를 발송한 기능과 같은 목적 */
  purpose: EmailPurpose;

  /** 메일로 받은 6자리 숫자 */
  code: string;
}
