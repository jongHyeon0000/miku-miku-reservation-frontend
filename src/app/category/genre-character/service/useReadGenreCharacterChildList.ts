import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { genreCharacterKeys } from '@/app/category/genre-character/constant/genreCharacterQueryKeys';
import { CATEGORY_PAGE_SIZE } from '@/app/category/common/constant/categoryPage';
import type { GenreCharacterItem } from '@/app/category/genre-character/interface/GenreCharacterItem';
import type { PageData } from '@/app/common/interface/PageData';

/**
 * 장르·캐릭터 하위 목록 조회 훅 (GET /api/genre-character)
 * 상위(groupId)와 페이지 번호마다 결과가 따로 보관된다.
 * enabled 가 false 면 읽지 않는다(상위가 하나도 없을 때).
 */
const useReadGenreCharacterChildList = (groupId: number, page: number, enabled: boolean = true) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: genreCharacterKeys.page(groupId, page),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<PageData<GenreCharacterItem> | null>> => {
      try {
        const res = await api.get<ApiResponse<PageData<GenreCharacterItem> | null>>('/api/genre-character', {
          params: { groupId: groupId, page: page, size: CATEGORY_PAGE_SIZE },
        });
        return res.data;
      } catch (err) {
        return toApiResponse<PageData<GenreCharacterItem>>(err);
      }
    },
  });

  const fetchReadGenreCharacterChildList = async (): Promise<void> => {
    await refetch();
  };

  return { genreCharacterChildPage: data, genreCharacterChildLoading: isLoading, fetchReadGenreCharacterChildList };
};

export default useReadGenreCharacterChildList;
