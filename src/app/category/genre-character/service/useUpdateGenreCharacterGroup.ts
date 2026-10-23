import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { genreCharacterKeys } from '@/app/category/genre-character/constant/genreCharacterQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { GenreCharacterFormValues } from '@/app/category/genre-character/interface/GenreCharacterFormValues';
import { toGenreCharacterRequest } from '@/app/category/genre-character/utils/GenreCharacterUtils';

/**
 * 장르·캐릭터 상위 수정 훅 (PUT /api/genre-character-group/{id})
 * 성공하면 장르·캐릭터 목록과 상품 쪽을 낡았다고 알려서, 목록을 쓰는 모든 화면이 새 값으로 다시 그려진다.
 */
const useUpdateGenreCharacterGroup = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateGenreCharacterGroup = async (id: number, values: GenreCharacterFormValues): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<null>>(`/api/genre-character-group/${id}`, toGenreCharacterRequest(values));
      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: genreCharacterKeys.list() });
        await queryClient.invalidateQueries({ queryKey: figureKeys.all });
      }
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
