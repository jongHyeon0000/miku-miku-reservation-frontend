import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { SeriesGroup } from '@/app/category/series/interface/SeriesGroup';

/**
 * 시리즈 목록 조회 훅 (GET /api/series-group)
 * 서버 응답을 그대로 담는다.
 */
const useReadSeriesList = () => {
  const [seriesList, setSeriesList] = useState<ApiResponse<SeriesGroup[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadSeriesList = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<SeriesGroup[] | null>>('/api/series-group');
      setSeriesList(res.data);
    } catch (err) {
      setSeriesList(toApiResponse<SeriesGroup[]>(err));
    } finally {
      setLoading(false);
    }
  };

  return { seriesList, seriesListLoading: loading, fetchReadSeriesList };
};

export default useReadSeriesList;
