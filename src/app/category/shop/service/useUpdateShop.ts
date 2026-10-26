import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { shopKeys } from '@/app/category/shop/constant/shopQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { ShopFormValues } from '@/app/category/shop/interface/ShopFormValues';
import { toShopRequest } from '@/app/category/shop/utils/ShopUtils';

/**
 * 판매처 하위 수정 훅 (PUT /api/shop/{id})
 * 성공하면 판매처 목록과 상품 쪽을 낡았다고 알려서, 목록을 쓰는 모든 화면이 새 값으로 다시 그려진다.
 */
const useUpdateShop = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateShop = async (id: number, values: ShopFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/shop/${id}`, toShopRequest(values));
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: shopKeys.groupAll() });
        await queryClient.invalidateQueries({ queryKey: shopKeys.pageAll() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.all });
      }
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateShopLoading: loading, fetchUpdateShop };
};

export default useUpdateShop;
