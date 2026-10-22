import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { SeriesFormValues } from '@/app/category/series/interface/SeriesFormValues';
import { toSeriesRequest } from '@/app/category/series/utils/SeriesUtils';

/**
 * 시리즈 하위 수정 훅 (PUT /api/series/{id})
 * 성공해도 서버가 data 를 주지 않으므로, 화면 갱신은 호출한 쪽이 목록을 다시 불러와서 한다.
 */
const useUpdateSeries = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateSeries = async (id: number, values: SeriesFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/series/${id}`, toSeriesRequest(values));
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
