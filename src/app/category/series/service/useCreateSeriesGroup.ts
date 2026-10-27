import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { seriesKeys } from '@/app/category/series/constant/seriesQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { SeriesFormValues } from '@/app/category/series/interface/SeriesFormValues';
import type { SeriesItem } from '@/app/category/series/interface/SeriesItem';
import { toSeriesRequest } from '@/app/category/series/utils/SeriesUtils';

/**
 * 시리즈 상위 추가 훅 (POST /api/series-group)
 * 이름이 중복이면 서버가 400을 준다. 상위를 추가하면 서버가 기본 하위 '기타'를 같이 만든다.
 * 성공하면 시리즈 목록과 상품 폼 선택지를 낡았다고 알린다.
 */
const useCreateSeriesGroup = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreateSeriesGroup = async (values: SeriesFormValues): Promise<ApiResponse<SeriesItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<SeriesItem | null>>('/api/series-group', toSeriesRequest(values));

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: seriesKeys.groupAll() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.formOptions() });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<SeriesItem>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createSeriesGroupLoading: loading, fetchCreateSeriesGroup };
};

export default useCreateSeriesGroup;
