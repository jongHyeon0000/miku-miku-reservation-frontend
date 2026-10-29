import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { budgetKeys } from '@/app/budget/constant/budgetQueryKeys';
import type { BudgetSettingRequestBody } from '@/app/budget/interface/BudgetSettingRequestBody';

/**
 * 예산 설정 변경 훅 (PUT /api/budget/setting)
 * 이번 기간은 그대로이고 다음 기간부터 새 값이 적용된다. 성공하면 예산 현황을 낡았다고 알린다.
 */
const useUpdateBudgetSetting = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateBudgetSetting = async (body: BudgetSettingRequestBody): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>('/api/budget/setting', body);

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

  return { updateBudgetSettingLoading: loading, fetchUpdateBudgetSetting };
};

export default useUpdateBudgetSetting;
