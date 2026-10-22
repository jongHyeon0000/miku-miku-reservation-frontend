import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { ShopFormValues } from '@/app/category/shop/interface/ShopFormValues';
import type { ShopItem } from '@/app/category/shop/interface/ShopItem';
import { toShopRequest } from '@/app/category/shop/utils/ShopUtils';

/**
 * 판매처 하위 추가 훅 (POST /api/shop)
 * 이름이 중복이면 서버가 400을 준다.
 */
const useCreateShop = () => {
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * @param groupId 하위가 속할 상위 id
   */
  const fetchCreateShop = async (groupId: number, values: ShopFormValues): Promise<ApiResponse<ShopItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<ShopItem | null>>('/api/shop', toShopRequest(values, groupId));
      return res.data;
    } catch (err) {
      return toApiResponse<ShopItem>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createShopLoading: loading, fetchCreateShop };
};

export default useCreateShop;
