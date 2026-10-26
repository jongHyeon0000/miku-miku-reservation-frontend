import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { seriesKeys } from '@/app/category/series/constant/seriesQueryKeys';
import { CATEGORY_PAGE_SIZE } from '@/app/category/common/constant/categoryPage';
import type { SeriesItem } from '@/app/category/series/interface/SeriesItem';
import type { PageData } from '@/app/common/interface/PageData';

/**
 * 시리즈 하위 목록 조회 훅 (GET /api/series)
 * 상위(groupId)와 페이지 번호마다 결과가 따로 보관된다.
 * enabled 가 false 면 읽지 않는다(상위가 하나도 없을 때).
 */
const useReadSeriesChildList = (groupId: number, page: number, enabled: boolean = true) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: seriesKeys.page(groupId, page),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<PageData<SeriesItem> | null>> => {
      try {
        const res = await api.get<ApiResponse<PageData<SeriesItem> | null>>('/api/series', {
          params: { groupId: groupId, page: page, size: CATEGORY_PAGE_SIZE },
        });
        return res.data;
      } catch (err) {
        return toApiResponse<PageData<SeriesItem>>(err);
      }
    },
  });

  const fetchReadSeriesChildList = async (): Promise<void> => {
    await refetch();
  };

  return { seriesChildPage: data, seriesChildLoading: isLoading, fetchReadSeriesChildList };
};

export default useReadSeriesChildList;
