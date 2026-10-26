import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { genreCharacterKeys } from '@/app/category/genre-character/constant/genreCharacterQueryKeys';
import type { GenreCharacterGroup } from '@/app/category/genre-character/interface/GenreCharacterGroup';

/**
 * 장르·캐릭터 목록 조회 훅 (GET /api/genre-character-group)
 * 서버 응답을 그대로 담는다. 결과는 키 하나로 보관되어 다시 들어오면 보관된 값이 먼저 보인다.
 */
const useReadGenreCharacterList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: genreCharacterKeys.groupAll(),
    queryFn: async (): Promise<ApiResponse<GenreCharacterGroup[] | null>> => {
      try {
        const res = await api.get<ApiResponse<GenreCharacterGroup[] | null>>('/api/genre-character-group');
        return res.data;
      } catch (err) {
        return toApiResponse<GenreCharacterGroup[]>(err);
      }
    },
  });

  const fetchReadGenreCharacterList = async (): Promise<void> => {
    await refetch();
  };

  return { genreCharacterList: data, genreCharacterListLoading: isLoading, fetchReadGenreCharacterList };
};

export default useReadGenreCharacterList;
