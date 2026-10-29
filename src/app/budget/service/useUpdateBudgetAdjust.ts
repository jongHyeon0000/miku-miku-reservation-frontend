import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { budgetKeys } from '@/app/budget/constant/budgetQueryKeys';
import type { BudgetAdjustRequestBody } from '@/app/budget/interface/BudgetAdjustRequestBody';

/**
 * 예산 증감 수정 훅 (PATCH /api/budget/adjust/{budgetAdjustId})
 * 이번 기간의 한 줄을 통째로 덮어쓴다. 성공하면 예산 현황을 낡았다고 알린다.
 */
const useUpdateBudgetAdjust = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateBudgetAdjust = async (budgetAdjustId: number, body: BudgetAdjustRequestBody): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.patch<ApiResponse<null>>(`/api/budget/adjust/${budgetAdjustId}`, body);

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

  return { updateBudgetAdjustLoading: loading, fetchUpdateBudgetAdjust };
};

export default useUpdateBudgetAdjust;
