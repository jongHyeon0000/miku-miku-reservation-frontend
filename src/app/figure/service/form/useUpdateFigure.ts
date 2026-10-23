import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { FigureSaveRequestBody } from '@/app/figure/interface/form/FigureSaveRequestBody';
import type { FigureSummary } from '@/app/figure/interface/common/FigureSummary';

/**
 * 상품 수정 훅. 성공하면 수정된 상품(설명 제외)이 data 로 온다. 상품 목록과 그 상품의 상세를 낡았다고 알린다.
 */
const useUpdateFigure = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateFigure = async (
    figureId: number,
    body: FigureSaveRequestBody,
  ): Promise<ApiResponse<FigureSummary | null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<FigureSummary | null>>(`/api/figure/${figureId}`, body);
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: figureKeys.list() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.detail(figureId) });
      }
      return res.data;
    } catch (err) {
      return toApiResponse<FigureSummary>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateFigureLoading: loading, fetchUpdateFigure };
};

export default useUpdateFigure;
