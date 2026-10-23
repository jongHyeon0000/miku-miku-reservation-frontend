import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { genreCharacterKeys } from '@/app/category/genre-character/constant/genreCharacterQueryKeys';
import { figureKeys } from '@/app/figure/constant/figureQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 장르·캐릭터 상위 삭제 훅 (DELETE /api/genre-character-group/{id})
 * 삭제하면 쓰던 상품은 서버가 '기타'로 옮긴다. 성공하면 장르·캐릭터 목록과 상품 쪽을 낡았다고 알린다.
 */
const useDeleteGenreCharacterGroup = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeleteGenreCharacterGroup = async (id: number): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>(`/api/genre-character-group/${id}`);
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

  return { deleteGenreCharacterGroupLoading: loading, fetchDeleteGenreCharacterGroup };
};

export default useDeleteGenreCharacterGroup;
