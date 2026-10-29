import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { budgetKeys } from '@/app/budget/constant/budgetQueryKeys';
import type { BudgetSettingRequestBody } from '@/app/budget/interface/BudgetSettingRequestBody';

/**
 * 예산 시작 훅 (POST /api/budget/start)
 * 설정을 저장하고 예산을 켜고 오늘이 속한 기간을 만든다. 성공하면 예산 현황을 낡았다고 알린다.
 */
const useStartBudget = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStartBudget = async (body: BudgetSettingRequestBody): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<null>>('/api/budget/start', body);

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: budgetKeys.all });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { startBudgetLoading: loading, fetchStartBudget };
};

export default useStartBudget;
