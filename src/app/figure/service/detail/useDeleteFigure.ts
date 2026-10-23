import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 상품 삭제 훅. 성공해도 data 가 없다. 상품 목록을 낡았다고 알린다.
 */
const useDeleteFigure = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeleteFigure = async (figureId: number): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>(`/api/figure/${figureId}`);
      if (res.data.code === API_CODE.OK) await queryClient.invalidateQueries({ queryKey: figureKeys.list() });
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFigureLoading: loading, fetchDeleteFigure };
};

export default useDeleteFigure;
