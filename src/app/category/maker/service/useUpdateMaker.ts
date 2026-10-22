import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { MakerFormValues } from '@/app/category/maker/interface/MakerFormValues';
import { toMakerRequest } from '@/app/category/maker/utils/MakerUtils';

/**
 * 제조사 상위 수정 훅 (PUT /api/maker/{id})
 * 성공해도 서버가 data 를 주지 않으므로, 화면 갱신은 호출한 쪽이 목록을 다시 불러와서 한다.
 */
const useUpdateMaker = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateMaker = async (id: number, values: MakerFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/maker/${id}`, toMakerRequest(values));
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateMakerLoading: loading, fetchUpdateMaker };
};

export default useUpdateMaker;
