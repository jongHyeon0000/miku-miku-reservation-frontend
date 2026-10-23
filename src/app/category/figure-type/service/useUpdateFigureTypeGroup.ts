import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureTypeKeys } from '@/app/category/figure-type/constant/figureTypeQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { FigureTypeFormValues } from '@/app/category/figure-type/interface/FigureTypeFormValues';
import { toFigureTypeRequest } from '@/app/category/figure-type/utils/FigureTypeUtils';

/**
 * 형태 상위 수정 훅 (PUT /api/figure-type-group/{id})
 * 성공하면 형태 목록과 상품 쪽을 낡았다고 알려서, 목록을 쓰는 모든 화면이 새 값으로 다시 그려진다.
 */
const useUpdateFigureTypeGroup = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateFigureTypeGroup = async (id: number, values: FigureTypeFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/figure-type-group/${id}`, toFigureTypeRequest(values));
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: figureTypeKeys.list() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.all });
      }
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
