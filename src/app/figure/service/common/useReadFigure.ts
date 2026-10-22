import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { FigureDetail } from '@/app/figure/interface/common/FigureDetail';

/** 상품 상세 조회의 보관 키. 번호가 붙기 전의 앞부분만 쓰면 상품 상세 전부를 가리킨다 */
export const FIGURE_QUERY_KEY = ['figure'];

/** 상품 한 건(번호)의 보관 키. 번호마다 칸이 따로 보관된다 */
export const figureQueryKey = (figureId: number) => [...FIGURE_QUERY_KEY, figureId];

/**
 * 상품 상세 조회 훅 (GET /api/figure/{figureId})
 * 번호마다 결과가 따로 보관되고, 그 상품의 종이 울리면 새 값으로 다시 채워진다.
 * enabled 가 false 면 읽지 않는다(등록 화면처럼 번호가 없을 때).
 */
const useReadFigure = (figureId: number, enabled: boolean = true) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: figureQueryKey(figureId),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<FigureDetail | null>> => {
      try {
        const res = await api.get<ApiResponse<FigureDetail | null>>(`/api/figure/${figureId}`);
        return res.data;
      } catch (err) {
        return toApiResponse<FigureDetail>(err);
      }
    },
  });

  const fetchReadFigure = async (): Promise<void> => {
    await refetch();
  };

  return { figure: data, figureLoading: isLoading, figureFetching: isFetching, fetchReadFigure };
};

export default useReadFigure;
