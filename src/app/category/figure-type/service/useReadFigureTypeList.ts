import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureTypeKeys } from '@/app/category/figure-type/constant/figureTypeQueryKeys';
import type { FigureTypeGroup } from '@/app/category/figure-type/interface/FigureTypeGroup';

/**
 * 형태 목록 조회 훅 (GET /api/figure-type-group)
 * 서버 응답을 그대로 담는다. 결과는 키 하나로 보관되어 다시 들어오면 보관된 값이 먼저 보인다.
 */
const useReadFigureTypeList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: figureTypeKeys.groupAll(),
    queryFn: async (): Promise<ApiResponse<FigureTypeGroup[] | null>> => {
      try {
        const res = await api.get<ApiResponse<FigureTypeGroup[] | null>>('/api/figure-type-group');
        return res.data;
      } catch (err) {
        return toApiResponse<FigureTypeGroup[]>(err);
      }
    },
  });

  const fetchReadFigureTypeList = async (): Promise<void> => {
    await refetch();
  };

  return { figureTypeList: data, figureTypeListLoading: isLoading, fetchReadFigureTypeList };
};

export default useReadFigureTypeList;
