import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { makerKeys } from '@/app/category/maker/constant/makerQueryKeys';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';

/**
 * 제조사 목록 조회 훅 (GET /api/maker)
 * 서버 응답을 그대로 담는다. 결과는 키 하나로 보관되어 다시 들어오면 보관된 값이 먼저 보인다.
 */
const useReadMakerList = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: makerKeys.list(),
    queryFn: async (): Promise<ApiResponse<MakerItem[] | null>> => {
      try {
        const res = await api.get<ApiResponse<MakerItem[] | null>>('/api/maker');
        return res.data;
      } catch (err) {
        return toApiResponse<MakerItem[]>(err);
      }
    },
  });

  const fetchReadMakerList = async (): Promise<void> => {
    await refetch();
  };

  return { makerList: data, makerListLoading: isLoading, makerListFetching: isFetching, fetchReadMakerList };
};

export default useReadMakerList;
