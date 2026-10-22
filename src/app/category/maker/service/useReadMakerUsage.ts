import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';

interface MakerUsage {
  /** 이 분류를 쓰고 있는 상품 수 */
  count: number;
}

/**
 * 제조사 상위 삭제 전 영향 상품 수 조회 훅 (GET /api/maker/{id}/usage)
 * 결과를 화면에 담아 두지 않고, 삭제 확인창을 띄우는 핸들러가 바로 쓰도록 반환한다.
 */
const useReadMakerUsage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadMakerUsage = async (id: number): Promise<ApiResponse<MakerUsage | null>> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<MakerUsage | null>>(`/api/maker/${id}/usage`);
      return res.data;
    } catch (err) {
      return toApiResponse<MakerUsage>(err);
    } finally {
      setLoading(false);
    }
  };

  return { makerUsageLoading: loading, fetchReadMakerUsage };
};

export default useReadMakerUsage;
