import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { BudgetPaymentCheckRequestBody } from '@/app/budget/interface/BudgetPaymentCheckRequestBody';
import type { BudgetPaymentCheckResponseData } from '@/app/budget/interface/BudgetPaymentCheckResponseData';

/**
 * 결제 전 예산 확인 훅 (POST /api/budget/payment-check)
 * 읽기 전용이라 아무것도 바꾸지 않는다. 결과를 화면에 담아 두지 않고, 상태를 바꾸는 핸들러가 바로 쓰도록 반환한다.
 */
const useReadBudgetPaymentCheck = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadBudgetPaymentCheck = async (body: BudgetPaymentCheckRequestBody): Promise<ApiResponse<BudgetPaymentCheckResponseData | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<BudgetPaymentCheckResponseData | null>>('/api/budget/payment-check', body);
      return res.data;
    } catch (err) {
      return toApiResponse<BudgetPaymentCheckResponseData>(err);
    } finally {
      setLoading(false);
    }
  };

  return { budgetPaymentCheckLoading: loading, fetchReadBudgetPaymentCheck };
};

export default useReadBudgetPaymentCheck;
