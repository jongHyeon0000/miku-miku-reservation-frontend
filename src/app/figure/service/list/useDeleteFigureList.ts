import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 상품 여러 개 삭제 훅. 하나라도 없는 상품이면 서버가 전부 취소한다. 성공해도 data 가 없다. 상품 목록을 낡았다고 알린다.
 */
const useDeleteFigureList = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeleteFigureList = async (figureIds: number[]): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      /* 선택한 상품이 많으면 쿼리가 너무 길어지므로 id 목록은 본문으로 보낸다 */
      const res = await api.delete<ApiResponse<null>>('/api/figure', { data: { figureIds: figureIds } });

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: figureKeys.list() });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFigureListLoading: loading, fetchDeleteFigureList };
};

export default useDeleteFigureList;
