import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { FigureTypeFormValues } from '@/app/category/figure-type/interface/FigureTypeFormValues';
import { toFigureTypeRequest } from '@/app/category/figure-type/utils/FigureTypeUtils';

/**
 * 형태 상위 수정 훅 (PUT /api/figure-type-group/{id})
 * 성공해도 서버가 data 를 주지 않으므로, 화면 갱신은 호출한 쪽이 목록을 다시 불러와서 한다.
 */
const useUpdateFigureTypeGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateFigureTypeGroup = async (id: number, values: FigureTypeFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/figure-type-group/${id}`, toFigureTypeRequest(values));
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateFigureTypeGroupLoading: loading, fetchUpdateFigureTypeGroup };
};

export default useUpdateFigureTypeGroup;
