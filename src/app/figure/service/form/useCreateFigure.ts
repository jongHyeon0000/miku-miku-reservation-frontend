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
 * 상품 등록 훅. 성공하면 만들어진 상품(설명 제외)이 data 로 온다. 상품 목록을 낡았다고 알린다.
 */
const useCreateFigure = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreateFigure = async (body: FigureSaveRequestBody): Promise<ApiResponse<FigureSummary | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<FigureSummary | null>>('/api/figure', body);
      if (res.data.code === API_CODE.OK) await queryClient.invalidateQueries({ queryKey: figureKeys.list() });
      return res.data;
    } catch (err) {
      return toApiResponse<FigureSummary>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createFigureLoading: loading, fetchCreateFigure };
};

export default useCreateFigure;
