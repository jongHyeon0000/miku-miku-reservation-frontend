import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { FigureTypeGroup } from '@/app/category/figure-type/interface/FigureTypeGroup';

/**
 * 형태 목록 조회 훅 (GET /api/figure-type-group)
 * 서버 응답을 그대로 담는다.
 */
const useReadFigureTypeList = () => {
  const [figureTypeList, setFigureTypeList] = useState<ApiResponse<FigureTypeGroup[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadFigureTypeList = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<FigureTypeGroup[] | null>>('/api/figure-type-group');
      setFigureTypeList(res.data);
    } catch (err) {
      setFigureTypeList(toApiResponse<FigureTypeGroup[]>(err));
    } finally {
      setLoading(false);
    }
  };

  return { figureTypeList, figureTypeListLoading: loading, fetchReadFigureTypeList };
};

export default useReadFigureTypeList;
