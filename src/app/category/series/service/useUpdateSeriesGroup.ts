import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { SeriesFormValues } from '@/app/category/series/interface/SeriesFormValues';
import { toSeriesRequest } from '@/app/category/series/utils/SeriesUtils';

/**
 * 시리즈 상위 수정 훅 (PUT /api/series-group/{id})
 * 성공해도 서버가 data 를 주지 않으므로, 화면 갱신은 호출한 쪽이 목록을 다시 불러와서 한다.
 */
const useUpdateSeriesGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateSeriesGroup = async (id: number, values: SeriesFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/series-group/${id}`, toSeriesRequest(values));
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateSeriesGroupLoading: loading, fetchUpdateSeriesGroup };
};

export default useUpdateSeriesGroup;
