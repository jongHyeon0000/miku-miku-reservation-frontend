import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { makerKeys } from '@/app/category/maker/constant/makerQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { MakerFormValues } from '@/app/category/maker/interface/MakerFormValues';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';
import { toMakerRequest } from '@/app/category/maker/utils/MakerUtils';

/**
 * 제조사 상위 추가 훅 (POST /api/maker)
 * 이름이 중복이면 서버가 400을 준다.
 * 성공하면 제조사 목록과 상품 폼 선택지를 낡았다고 알린다.
 */
const useCreateMaker = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreateMaker = async (values: MakerFormValues): Promise<ApiResponse<MakerItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<MakerItem | null>>('/api/maker', toMakerRequest(values));

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: makerKeys.pageAll() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.formOptions() });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<MakerItem>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createMakerLoading: loading, fetchCreateMaker };
};

export default useCreateMaker;
