import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { budgetKeys } from '@/app/budget/constant/budgetQueryKeys';

/**
 * 예산 증감 삭제 훅 (DELETE /api/budget/adjust/{budgetAdjustId})
 * 이번 기간의 한 줄만 지울 수 있다. 성공하면 예산 현황을 낡았다고 알린다.
 */
const useDeleteBudgetAdjust = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeleteBudgetAdjust = async (budgetAdjustId: number): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>(`/api/budget/adjust/${budgetAdjustId}`);

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

  return { deleteBudgetAdjustLoading: loading, fetchDeleteBudgetAdjust };
};

export default useDeleteBudgetAdjust;
