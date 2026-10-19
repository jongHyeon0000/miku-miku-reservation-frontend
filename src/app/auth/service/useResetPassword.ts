import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { ResetPasswordRequestBody } from '@/app/auth/interface/ResetPasswordRequestBody';

/**
 * 비밀번호 재설정 훅 (POST /api/auth/reset-password, 로그인하지 않은 상태)
 * 이메일 인증(RESET_PASSWORD)을 마친 뒤 30분 안에 한 번만 쓸 수 있다. 인증이 없거나 지났으면 서버가 400을 주고, 성공해도 data 가 없다.
 */
const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResetPassword = async (body: ResetPasswordRequestBody): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<null>>('/api/auth/reset-password', body);
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { resetPasswordLoading: loading, fetchResetPassword };
};

export default useResetPassword;
