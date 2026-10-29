import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { budgetKeys } from '@/app/budget/constant/budgetQueryKeys';
import type { BudgetStatus } from '@/app/budget/interface/BudgetStatus';

/**
 * 예산 현황 조회 훅 (GET /api/budget)
 * 응답의 enabled, resumable 로 보여 줄 화면(현황, 다시 켜기, 소개)을 고른다.
 * 예산 변경 훅이 성공하면 이 키가 울려서 새 값으로 다시 채워진다.
 */
const useReadBudget = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: budgetKeys.current(),
    queryFn: async (): Promise<ApiResponse<BudgetStatus | null>> => {
      try {
        const res = await api.get<ApiResponse<BudgetStatus | null>>('/api/budget');
        return res.data;
      } catch (err) {
        return toApiResponse<BudgetStatus>(err);
      }
    },
  });

  const fetchReadBudget = async (): Promise<void> => {
    await refetch();
  };

  return { budget: data, budgetLoading: isLoading, fetchReadBudget };
};

export default useReadBudget;
