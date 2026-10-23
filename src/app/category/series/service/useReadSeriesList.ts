import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { seriesKeys } from '@/app/category/series/constant/seriesQueryKeys';
import type { SeriesGroup } from '@/app/category/series/interface/SeriesGroup';

/**
 * 시리즈 목록 조회 훅 (GET /api/series-group)
 * 서버 응답을 그대로 담는다. 결과는 키 하나로 보관되어 다시 들어오면 보관된 값이 먼저 보인다.
 */
const useReadSeriesList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: seriesKeys.list(),
    queryFn: async (): Promise<ApiResponse<SeriesGroup[] | null>> => {
      try {
        const res = await api.get<ApiResponse<SeriesGroup[] | null>>('/api/series-group');
        return res.data;
      } catch (err) {
        return toApiResponse<SeriesGroup[]>(err);
      }
    },
  });

  const fetchReadSeriesList = async (): Promise<void> => {
    await refetch();
  };

  return { seriesList: data, seriesListLoading: isLoading, fetchReadSeriesList };
};

export default useReadSeriesList;
