import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { makerKeys } from '@/app/category/maker/constant/makerQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { MakerFormValues } from '@/app/category/maker/interface/MakerFormValues';
import { toMakerRequest } from '@/app/category/maker/utils/MakerUtils';

/**
 * 제조사 상위 수정 훅 (PUT /api/maker/{id})
 * 성공하면 제조사 목록과 상품 쪽을 낡았다고 알려서, 목록을 쓰는 모든 화면이 새 값으로 다시 그려진다.
 */
const useUpdateMaker = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateMaker = async (id: number, values: MakerFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/maker/${id}`, toMakerRequest(values));
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: makerKeys.pageAll() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.all });
      }
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateMakerLoading: loading, fetchUpdateMaker };
};

export default useUpdateMaker;
