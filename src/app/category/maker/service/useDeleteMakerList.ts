import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { makerKeys } from '@/app/category/maker/constant/makerQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 제조사 하위 여러 개 삭제 훅 (DELETE /api/maker, 본문 { makerIds })
 * 하나라도 지울 수 없으면 서버가 전부 취소한다. 지운 항목을 쓰던 상품은 서버가 '기타'로 옮긴다. 성공하면 제조사 목록과 상품 쪽을 낡았다고 알린다.
 */
const useDeleteMakerList = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeleteMakerList = async (makerIds: number[]): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>('/api/maker', { data: { makerIds: makerIds } });

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: makerKeys.pageAll() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.all });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMakerListLoading: loading, fetchDeleteMakerList };
};

export default useDeleteMakerList;
