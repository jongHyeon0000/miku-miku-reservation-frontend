import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { ChangePasswordRequestBody } from '@/app/auth/interface/ChangePasswordRequestBody';

/**
 * 비밀번호 변경 훅 (PATCH /api/auth/password, 로그인한 상태)
 * 현재 비밀번호가 틀리면 서버가 400을 준다(로그인 상태라서 401이 아니다). 성공해도 data 가 없고 기존 토큰은 계속 유효하다.
 */
const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchChangePassword = async (body: ChangePasswordRequestBody): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.patch<ApiResponse<null>>('/api/auth/password', body);
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { changePasswordLoading: loading, fetchChangePassword };
};

export default useChangePassword;
