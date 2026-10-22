import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';

/**
 * 제조사 목록 조회 훅 (GET /api/maker)
 * 서버 응답을 그대로 담는다.
 */
const useReadMakerList = () => {
  const [makerList, setMakerList] = useState<ApiResponse<MakerItem[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadMakerList = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<MakerItem[] | null>>('/api/maker');
      setMakerList(res.data);
    } catch (err) {
      setMakerList(toApiResponse<MakerItem[]>(err));
    } finally {
      setLoading(false);
    }
  };

  return { makerList, makerListLoading: loading, fetchReadMakerList };
};

export default useReadMakerList;
