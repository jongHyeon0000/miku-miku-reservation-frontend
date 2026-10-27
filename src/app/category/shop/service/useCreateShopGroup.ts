import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { shopKeys } from '@/app/category/shop/constant/shopQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { ShopFormValues } from '@/app/category/shop/interface/ShopFormValues';
import type { ShopItem } from '@/app/category/shop/interface/ShopItem';
import { toShopRequest } from '@/app/category/shop/utils/ShopUtils';

/**
 * 판매처 상위 추가 훅 (POST /api/shop-group)
 * 이름이 중복이면 서버가 400을 준다. 상위를 추가하면 서버가 기본 하위 '기타'를 같이 만든다.
 * 성공하면 판매처 목록과 상품 폼 선택지를 낡았다고 알린다.
 */
const useCreateShopGroup = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreateShopGroup = async (values: ShopFormValues): Promise<ApiResponse<ShopItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<ShopItem | null>>('/api/shop-group', toShopRequest(values));

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: shopKeys.groupAll() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.formOptions() });
      }

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
