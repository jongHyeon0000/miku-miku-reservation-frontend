import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { budgetKeys } from '@/app/budget/constant/budgetQueryKeys';

/**
 * 예산 켜기, 끄기 훅 (PATCH /api/budget/enabled)
 * 끄면 기록은 남기고 기능만 꺼진다. 다시 켜기는 이번 기간 기록이 남아 있을 때만 된다. 성공하면 예산 현황을 낡았다고 알린다.
 */
const useUpdateBudgetEnabled = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateBudgetEnabled = async (enabled: boolean): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.patch<ApiResponse<null>>('/api/budget/enabled', { enabled: enabled });

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

  return { updateBudgetEnabledLoading: loading, fetchUpdateBudgetEnabled };
};

export default useUpdateBudgetEnabled;
