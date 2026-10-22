import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { ShopFormValues } from '@/app/category/shop/interface/ShopFormValues';
import { toShopRequest } from '@/app/category/shop/utils/ShopUtils';

/**
 * 판매처 하위 수정 훅 (PUT /api/shop/{id})
 * 성공해도 서버가 data 를 주지 않으므로, 화면 갱신은 호출한 쪽이 목록을 다시 불러와서 한다.
 */
const useUpdateShop = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateShop = async (id: number, values: ShopFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/shop/${id}`, toShopRequest(values));
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
