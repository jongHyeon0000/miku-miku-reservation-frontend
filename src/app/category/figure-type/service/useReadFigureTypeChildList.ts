import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureTypeKeys } from '@/app/category/figure-type/constant/figureTypeQueryKeys';
import { CATEGORY_PAGE_SIZE } from '@/app/category/common/constant/categoryPage';
import type { FigureTypeItem } from '@/app/category/figure-type/interface/FigureTypeItem';
import type { PageData } from '@/app/common/interface/PageData';

/**
 * 형태 하위 목록 조회 훅 (GET /api/figure-type)
 * 상위(groupId)와 페이지 번호마다 결과가 따로 보관된다.
 * enabled 가 false 면 읽지 않는다(상위가 하나도 없을 때).
 */
const useReadFigureTypeChildList = (groupId: number, page: number, enabled: boolean = true) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: figureTypeKeys.page(groupId, page),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<PageData<FigureTypeItem> | null>> => {
      try {
        const res = await api.get<ApiResponse<PageData<FigureTypeItem> | null>>('/api/figure-type', {
          params: { groupId: groupId, page: page, size: CATEGORY_PAGE_SIZE },
        });
        return res.data;
      } catch (err) {
        return toApiResponse<PageData<FigureTypeItem>>(err);
      }
    },
  });

  const fetchReadFigureTypeChildList = async (): Promise<void> => {
    await refetch();
  };

  return { figureTypeChildPage: data, figureTypeChildLoading: isLoading, fetchReadFigureTypeChildList };
};

export default useReadFigureTypeChildList;
