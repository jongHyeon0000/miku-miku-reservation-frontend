import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { SeriesFormValues } from '@/app/category/series/interface/SeriesFormValues';
import type { SeriesItem } from '@/app/category/series/interface/SeriesItem';
import { toSeriesRequest } from '@/app/category/series/utils/SeriesUtils';

/**
 * 시리즈 상위 추가 훅 (POST /api/series-group)
 * 이름이 중복이면 서버가 400을 준다. 상위를 추가하면 서버가 기본 하위 '기타'를 같이 만든다.
 */
const useCreateSeriesGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreateSeriesGroup = async (values: SeriesFormValues): Promise<ApiResponse<SeriesItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<SeriesItem | null>>('/api/series-group', toSeriesRequest(values));
      return res.data;
    } catch (err) {
      return toApiResponse<SeriesItem>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createSeriesGroupLoading: loading, fetchCreateSeriesGroup };
};

export default useCreateSeriesGroup;
