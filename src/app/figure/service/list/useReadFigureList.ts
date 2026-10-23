import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import type { FigureSummary } from '@/app/figure/interface/common/FigureSummary';

/**
 * 상품 목록 조회 훅 (GET /api/figure)
 * 서버는 설명(HTML)을 뺀 전체 목록을 한 번에 준다. 탭, 필터, 정렬은 화면에서 한다.
 * 결과는 키 하나로 보관되어 다시 들어오면 보관된 값이 먼저 보인다.
 */
const useReadFigureList = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: figureKeys.list(),
    queryFn: async (): Promise<ApiResponse<FigureSummary[] | null>> => {
      try {
        const res = await api.get<ApiResponse<FigureSummary[] | null>>('/api/figure');
        return res.data;
      } catch (err) {
        return toApiResponse<FigureSummary[]>(err);
      }
    },
  });

  const fetchReadFigureList = async (): Promise<void> => {
    await refetch();
  };

  return { figureList: data, figureListLoading: isLoading, figureListFetching: isFetching, fetchReadFigureList };
};

export default useReadFigureList;
