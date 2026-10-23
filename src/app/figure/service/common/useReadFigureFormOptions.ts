import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import type { FigureFormOptions } from '@/app/figure/interface/form/FigureFormOptions';

/**
 * 분류 선택지 조회 훅 (GET /api/figure/form-options). 5개 축의 상위/하위 트리를 한 번에 받는다.
 * 결과는 키 하나로 보관되어 상세와 폼이 같은 값을 나눠 쓴다.
 */
const useReadFigureFormOptions = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: figureKeys.formOptions(),
    queryFn: async (): Promise<ApiResponse<FigureFormOptions | null>> => {
      try {
        const res = await api.get<ApiResponse<FigureFormOptions | null>>('/api/figure/form-options');
        return res.data;
      } catch (err) {
        return toApiResponse<FigureFormOptions>(err);
      }
    },
  });

  const fetchReadFigureFormOptions = async (): Promise<void> => {
    await refetch();
  };

  return { formOptions: data, formOptionsLoading: isLoading, formOptionsFetching: isFetching, fetchReadFigureFormOptions };
};

export default useReadFigureFormOptions;
