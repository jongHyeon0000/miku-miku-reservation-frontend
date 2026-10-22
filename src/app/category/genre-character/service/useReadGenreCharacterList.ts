import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { GenreCharacterGroup } from '@/app/category/genre-character/interface/GenreCharacterGroup';

/**
 * 장르·캐릭터 목록 조회 훅 (GET /api/genre-character-group)
 * 서버 응답을 그대로 담는다.
 */
const useReadGenreCharacterList = () => {
  const [genreCharacterList, setGenreCharacterList] = useState<ApiResponse<GenreCharacterGroup[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadGenreCharacterList = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<GenreCharacterGroup[] | null>>('/api/genre-character-group');
      setGenreCharacterList(res.data);
    } catch (err) {
      setGenreCharacterList(toApiResponse<GenreCharacterGroup[]>(err));
    } finally {
      setLoading(false);
    }
  };

  return { genreCharacterList, genreCharacterListLoading: loading, fetchReadGenreCharacterList };
};

export default useReadGenreCharacterList;
