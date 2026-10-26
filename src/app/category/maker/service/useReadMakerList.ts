import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { makerKeys } from '@/app/category/maker/constant/makerQueryKeys';
import { CATEGORY_PAGE_SIZE } from '@/app/category/common/constant/categoryPage';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';
import type { PageData } from '@/app/common/interface/PageData';

/**
 * 제조사 목록 조회 훅 (GET /api/maker)
 * 서버 응답을 그대로 담는다. 페이지 번호마다 결과가 따로 보관되어 다시 들어오면 보관된 값이 먼저 보인다.
 */
const useReadMakerList = (page: number) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: makerKeys.page(page),
    queryFn: async (): Promise<ApiResponse<PageData<MakerItem> | null>> => {
      try {
        const res = await api.get<ApiResponse<PageData<MakerItem> | null>>('/api/maker', {
          params: { page: page, size: CATEGORY_PAGE_SIZE },
        });
        return res.data;
      } catch (err) {
        return toApiResponse<PageData<MakerItem>>(err);
      }
    },
  });

  const fetchReadMakerList = async (): Promise<void> => {
    await refetch();
  };

  return { makerList: data, makerListLoading: isLoading, fetchReadMakerList };
};

export default useReadMakerList;
