import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureTypeKeys } from '@/app/category/figure-type/constant/figureTypeQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { FigureTypeFormValues } from '@/app/category/figure-type/interface/FigureTypeFormValues';
import type { FigureTypeItem } from '@/app/category/figure-type/interface/FigureTypeItem';
import { toFigureTypeRequest } from '@/app/category/figure-type/utils/FigureTypeUtils';

/**
 * 형태 상위 추가 훅 (POST /api/figure-type-group)
 * 이름이 중복이면 서버가 400을 준다. 상위를 추가하면 서버가 기본 하위 '기타'를 같이 만든다.
 * 성공하면 형태 목록과 상품 폼 선택지를 낡았다고 알린다.
 */
const useCreateFigureTypeGroup = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreateFigureTypeGroup = async (values: FigureTypeFormValues): Promise<ApiResponse<FigureTypeItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<FigureTypeItem | null>>('/api/figure-type-group', toFigureTypeRequest(values));

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: figureTypeKeys.groupAll() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.formOptions() });
      }

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
