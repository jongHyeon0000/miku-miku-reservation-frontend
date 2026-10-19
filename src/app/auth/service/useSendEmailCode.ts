import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { EMAIL_CODE_PATHS, type EmailPurpose } from '@/app/auth/constant/emailPurpose';
import type { EmailCodeRequestBody } from '@/app/auth/interface/EmailCodeRequestBody';

/**
 * 이메일 인증 코드 발송 훅 (가입, 아이디 찾기, 비밀번호 재설정 공통)
 * 목적에 따라 경로가 다르다. 같은 이메일과 목적은 60초 안에 다시 보낼 수 없고(400), 메일 발송이 실패하면 500이다.
 */
const useSendEmailCode = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSendEmailCode = async (purpose: EmailPurpose, body: EmailCodeRequestBody): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<null>>(EMAIL_CODE_PATHS[purpose], body);
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { sendEmailCodeLoading: loading, fetchSendEmailCode };
};

export default useSendEmailCode;
