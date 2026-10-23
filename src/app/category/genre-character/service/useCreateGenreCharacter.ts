import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { genreCharacterKeys } from '@/app/category/genre-character/constant/genreCharacterQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { GenreCharacterFormValues } from '@/app/category/genre-character/interface/GenreCharacterFormValues';
import type { GenreCharacterItem } from '@/app/category/genre-character/interface/GenreCharacterItem';
import { toGenreCharacterRequest } from '@/app/category/genre-character/utils/GenreCharacterUtils';

/**
 * 장르·캐릭터 하위 추가 훅 (POST /api/genre-character)
 * 이름이 중복이면 서버가 400을 준다.
 * 성공하면 장르·캐릭터 목록과 상품 폼 선택지를 낡았다고 알린다.
 */
const useCreateGenreCharacter = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * @param groupId 하위가 속할 상위 id
   */
  const fetchCreateGenreCharacter = async (groupId: number, values: GenreCharacterFormValues): Promise<ApiResponse<GenreCharacterItem | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<GenreCharacterItem | null>>('/api/genre-character', toGenreCharacterRequest(values, groupId));
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: genreCharacterKeys.list() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.formOptions() });
      }
      return res.data;
    } catch (err) {
      return toApiResponse<GenreCharacterItem>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createGenreCharacterLoading: loading, fetchCreateGenreCharacter };
};

export default useCreateGenreCharacter;
