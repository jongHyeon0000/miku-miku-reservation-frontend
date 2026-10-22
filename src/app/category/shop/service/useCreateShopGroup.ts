import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { ShopFormValues } from '@/app/category/shop/interface/ShopFormValues';
import type { ShopItem } from '@/app/category/shop/interface/ShopItem';
import { toShopRequest } from '@/app/category/shop/utils/ShopUtils';

/**
 * 판매처 상위 추가 훅 (POST /api/shop-group)
 * 이름이 중복이면 서버가 400을 준다. 상위를 추가하면 서버가 기본 하위 '기타'를 같이 만든다.
 */
const useCreateShopGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreateShopGroup = async (values: ShopFormValues): Promise<ApiResponse<ShopItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<ShopItem | null>>('/api/shop-group', toShopRequest(values));
      return res.data;
    } catch (err) {
      return toApiResponse<ShopItem>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createShopGroupLoading: loading, fetchCreateShopGroup };
};

export default useCreateShopGroup;
