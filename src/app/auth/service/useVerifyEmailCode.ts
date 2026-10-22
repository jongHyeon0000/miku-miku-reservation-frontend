import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { EmailPurpose } from '@/app/auth/constant/emailPurpose';

interface EmailVerifyRequestBody {
  /** 코드를 받은 이메일 */
  email: string;

  /** 코드를 발송한 기능과 같은 목적 */
  purpose: EmailPurpose;

  /** 메일로 받은 6자리 숫자 */
  code: string;
}

/**
 * 이메일 인증 코드 확인 훅 (POST /api/auth/email-verification/verify, 목적과 상관없이 공통)
 * 코드가 틀리거나 만료되거나 5번을 넘기면 서버가 400과 사용자용 문구를 준다.
 */
const useVerifyEmailCode = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchVerifyEmailCode = async (body: EmailVerifyRequestBody): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<null>>('/api/auth/email-verification/verify', body);
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { verifyEmailCodeLoading: loading, fetchVerifyEmailCode };
};

export default useVerifyEmailCode;
