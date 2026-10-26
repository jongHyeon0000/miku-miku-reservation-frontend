import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { shopKeys } from '@/app/category/shop/constant/shopQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 판매처 하위 삭제 훅 (DELETE /api/shop/{id})
 * 삭제하면 쓰던 상품은 서버가 '기타'로 옮긴다. 성공하면 판매처 목록과 상품 쪽을 낡았다고 알린다.
 */
const useDeleteShop = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeleteShop = async (id: number): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>(`/api/shop/${id}`);
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

  return { deleteShopLoading: loading, fetchDeleteShop };
};

export default useDeleteShop;
