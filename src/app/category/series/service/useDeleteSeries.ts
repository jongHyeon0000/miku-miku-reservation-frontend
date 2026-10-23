import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { seriesKeys } from '@/app/category/series/constant/seriesQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 시리즈 하위 삭제 훅 (DELETE /api/series/{id})
 * 삭제하면 쓰던 상품은 서버가 '기타'로 옮긴다. 성공하면 시리즈 목록과 상품 쪽을 낡았다고 알린다.
 */
const useDeleteSeries = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeleteSeries = async (id: number): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>(`/api/series/${id}`);
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: seriesKeys.list() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.all });
      }
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteSeriesLoading: loading, fetchDeleteSeries };
};

export default useDeleteSeries;
