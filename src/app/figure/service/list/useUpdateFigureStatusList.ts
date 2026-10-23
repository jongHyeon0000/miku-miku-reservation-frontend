import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { FigureStatusRequestBody } from '@/app/figure/interface/status/FigureStatusRequestBody';

/**
 * 상품 상태 전이 훅(일괄). 하나라도 허용되지 않으면 서버가 전부 취소한다. 성공하면 바뀐 상품 id 목록이 data 로 온다. 상품 목록과 바뀐 상품들의 상세를 낡았다고 알린다.
 */
const useUpdateFigureStatusList = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateFigureStatusList = async (body: FigureStatusRequestBody): Promise<ApiResponse<number[] | null>> => {
    setLoading(true);
    try {
      const res = await api.patch<ApiResponse<number[] | null>>('/api/figure/status', body);
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: figureKeys.list() });
        await Promise.all(
          (res.data.data ?? []).map((figureId) => queryClient.invalidateQueries({ queryKey: figureKeys.detail(figureId) })),
        );
      }
      return res.data;
    } catch (err) {
      return toApiResponse<number[]>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateFigureStatusListLoading: loading, fetchUpdateFigureStatusList };
};

export default useUpdateFigureStatusList;
