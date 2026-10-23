import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { templateKeys } from '@/app/category/template/constant/templateQueryKeys';
import type { Template } from '@/app/category/template/interface/Template';

/**
 * 템플릿 목록 조회 훅 (GET /api/template)
 * 종류 전체를 한 번에 읽고, 종류별로 나누는 것은 화면이 한다.
 */
const useReadTemplateList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: templateKeys.list(),
    queryFn: async (): Promise<ApiResponse<Template[] | null>> => {
      try {
        const res = await api.get<ApiResponse<Template[] | null>>('/api/template');
        return res.data;
      } catch (err) {
        return toApiResponse<Template[]>(err);
      }
    },
  });

  const fetchReadTemplateList = async (): Promise<void> => {
    await refetch();
  };

  return { templateList: data, templateListLoading: isLoading, fetchReadTemplateList };
};

export default useReadTemplateList;
