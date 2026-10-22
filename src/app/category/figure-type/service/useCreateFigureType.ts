import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { FigureTypeFormValues } from '@/app/category/figure-type/interface/FigureTypeFormValues';
import type { FigureTypeItem } from '@/app/category/figure-type/interface/FigureTypeItem';
import { toFigureTypeRequest } from '@/app/category/figure-type/utils/FigureTypeUtils';

/**
 * 형태 하위 추가 훅 (POST /api/figure-type)
 * 이름이 중복이면 서버가 400을 준다.
 */
const useCreateFigureType = () => {
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * @param groupId 하위가 속할 상위 id
   */
  const fetchCreateFigureType = async (groupId: number, values: FigureTypeFormValues): Promise<ApiResponse<FigureTypeItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<FigureTypeItem | null>>('/api/figure-type', toFigureTypeRequest(values, groupId));
      return res.data;
    } catch (err) {
      return toApiResponse<FigureTypeItem>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createFigureTypeLoading: loading, fetchCreateFigureType };
};

export default useCreateFigureType;
