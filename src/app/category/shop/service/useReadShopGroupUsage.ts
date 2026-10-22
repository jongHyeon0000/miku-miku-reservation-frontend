import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';

interface ShopGroupUsage {
  /** 이 분류를 쓰고 있는 상품 수 */
  count: number;
}

/**
 * 판매처 상위 삭제 전 영향 상품 수 조회 훅 (GET /api/shop-group/{id}/usage)
 * 결과를 화면에 담아 두지 않고, 삭제 확인창을 띄우는 핸들러가 바로 쓰도록 반환한다.
 */
const useReadShopGroupUsage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadShopGroupUsage = async (id: number): Promise<ApiResponse<ShopGroupUsage | null>> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<ShopGroupUsage | null>>(`/api/shop-group/${id}/usage`);
      return res.data;
    } catch (err) {
      return toApiResponse<ShopGroupUsage>(err);
    } finally {
      setLoading(false);
    }
  };

  return { shopGroupUsageLoading: loading, fetchReadShopGroupUsage };
};

export default useReadShopGroupUsage;
