import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { FigureTypeFormValues } from '@/app/category/figure-type/interface/FigureTypeFormValues';
import type { FigureTypeItem } from '@/app/category/figure-type/interface/FigureTypeItem';
import { toFigureTypeRequest } from '@/app/category/figure-type/utils/FigureTypeUtils';

/**
 * 형태 상위 추가 훅 (POST /api/figure-type-group)
 * 이름이 중복이면 서버가 400을 준다. 상위를 추가하면 서버가 기본 하위 '기타'를 같이 만든다.
 */
const useCreateFigureTypeGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreateFigureTypeGroup = async (values: FigureTypeFormValues): Promise<ApiResponse<FigureTypeItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<FigureTypeItem | null>>('/api/figure-type-group', toFigureTypeRequest(values));
      return res.data;
    } catch (err) {
      return toApiResponse<FigureTypeItem>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createFigureTypeGroupLoading: loading, fetchCreateFigureTypeGroup };
};

export default useCreateFigureTypeGroup;
