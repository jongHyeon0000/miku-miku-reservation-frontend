import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { FigureStatusRequestBody } from '@/app/figure/interface/status/FigureStatusRequestBody';
import type { FigureSummary } from '@/app/figure/interface/common/FigureSummary';

/**
 * 상품 상태 전이 훅(개별). 성공하면 바뀐 상품(설명 제외)이 data 로 온다. 그 상품의 상세와 상품 목록을 낡았다고 알린다.
 */
const useUpdateFigureStatus = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateFigureStatus = async (
    figureId: number,
    body: FigureStatusRequestBody,
  ): Promise<ApiResponse<FigureSummary | null>> => {
    setLoading(true);
    try {
      const res = await api.patch<ApiResponse<FigureSummary | null>>(`/api/figure/${figureId}/status`, body);
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: figureKeys.detail(figureId) });
        await queryClient.invalidateQueries({ queryKey: figureKeys.list() });
      }
      return res.data;
    } catch (err) {
      return toApiResponse<FigureSummary>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateFigureStatusLoading: loading, fetchUpdateFigureStatus };
};

export default useUpdateFigureStatus;
