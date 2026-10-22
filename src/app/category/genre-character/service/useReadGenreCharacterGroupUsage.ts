import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';

interface GenreCharacterGroupUsage {
  /** 이 분류를 쓰고 있는 상품 수 */
  count: number;
}

/**
 * 장르·캐릭터 상위 삭제 전 영향 상품 수 조회 훅 (GET /api/genre-character-group/{id}/usage)
 * 결과를 화면에 담아 두지 않고, 삭제 확인창을 띄우는 핸들러가 바로 쓰도록 반환한다.
 */
const useReadGenreCharacterGroupUsage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadGenreCharacterGroupUsage = async (id: number): Promise<ApiResponse<GenreCharacterGroupUsage | null>> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<GenreCharacterGroupUsage | null>>(`/api/genre-character-group/${id}/usage`);
      return res.data;
    } catch (err) {
      return toApiResponse<GenreCharacterGroupUsage>(err);
    } finally {
      setLoading(false);
    }
  };

  return { genreCharacterGroupUsageLoading: loading, fetchReadGenreCharacterGroupUsage };
};

export default useReadGenreCharacterGroupUsage;
