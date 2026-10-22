import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';

/**
 * 장르·캐릭터 하위 삭제 훅 (DELETE /api/genre-character/{id})
 * 삭제하면 쓰던 상품은 서버가 '기타'로 옮긴다. 성공해도 data 가 없으므로 호출한 쪽이 목록을 다시 불러온다.
 */
const useDeleteGenreCharacter = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeleteGenreCharacter = async (id: number): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>(`/api/genre-character/${id}`);
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteGenreCharacterLoading: loading, fetchDeleteGenreCharacter };
};

export default useDeleteGenreCharacter;
