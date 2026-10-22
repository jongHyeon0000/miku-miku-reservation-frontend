import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { ShopGroup } from '@/app/category/shop/interface/ShopGroup';

/**
 * 판매처 목록 조회 훅 (GET /api/shop-group)
 * 서버 응답을 그대로 담는다.
 */
const useReadShopList = () => {
  const [shopList, setShopList] = useState<ApiResponse<ShopGroup[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadShopList = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<ShopGroup[] | null>>('/api/shop-group');
      setShopList(res.data);
    } catch (err) {
      setShopList(toApiResponse<ShopGroup[]>(err));
    } finally {
      setLoading(false);
    }
  };

  return { shopList, shopListLoading: loading, fetchReadShopList };
};

export default useReadShopList;
