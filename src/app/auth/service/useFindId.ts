import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';

interface FindIdResponseData {
  /** 이메일로 찾은 로그인 아이디 (전체) */
  loginId: string;
}

/**
 * 아이디 찾기 훅 (POST /api/auth/find-id, 로그인하지 않은 상태)
 * 이메일 인증(FIND_ID)을 마친 뒤 30분 안에 한 번만 쓸 수 있다. 인증이 없거나 지났으면 서버가 400을 준다.
 */
const useFindId = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFindId = async (email: string): Promise<ApiResponse<FindIdResponseData | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<FindIdResponseData>>('/api/auth/find-id', { email });
      return res.data;
    } catch (err) {
      return toApiResponse<FindIdResponseData>(err);
    } finally {
      setLoading(false);
    }
  };

  return { findIdLoading: loading, fetchFindId };
};

export default useFindId;
