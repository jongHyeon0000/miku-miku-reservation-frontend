import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { GenreCharacterFormValues } from '@/app/category/genre-character/interface/GenreCharacterFormValues';
import { toGenreCharacterRequest } from '@/app/category/genre-character/utils/GenreCharacterUtils';

/**
 * 장르·캐릭터 상위 수정 훅 (PUT /api/genre-character-group/{id})
 * 성공해도 서버가 data 를 주지 않으므로, 화면 갱신은 호출한 쪽이 목록을 다시 불러와서 한다.
 */
const useUpdateGenreCharacterGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateGenreCharacterGroup = async (id: number, values: GenreCharacterFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/genre-character-group/${id}`, toGenreCharacterRequest(values));
      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateGenreCharacterGroupLoading: loading, fetchUpdateGenreCharacterGroup };
};

export default useUpdateGenreCharacterGroup;
