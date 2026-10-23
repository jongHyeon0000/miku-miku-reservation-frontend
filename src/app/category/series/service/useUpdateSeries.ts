import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { seriesKeys } from '@/app/category/series/constant/seriesQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { SeriesFormValues } from '@/app/category/series/interface/SeriesFormValues';
import { toSeriesRequest } from '@/app/category/series/utils/SeriesUtils';

/**
 * 시리즈 하위 수정 훅 (PUT /api/series/{id})
 * 성공하면 시리즈 목록과 상품 쪽을 낡았다고 알려서, 목록을 쓰는 모든 화면이 새 값으로 다시 그려진다.
 */
const useUpdateSeries = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateSeries = async (id: number, values: SeriesFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/series/${id}`, toSeriesRequest(values));
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

  return { updateSeriesLoading: loading, fetchUpdateSeries };
};

export default useUpdateSeries;
