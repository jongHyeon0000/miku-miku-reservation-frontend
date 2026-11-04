import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { PageData } from '@/app/common/interface/PageData';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import type { PostListItem } from '@/app/community/interface/PostListItem';
import type { PostListQuery } from '@/app/community/interface/PostListQuery';

/** 게시판 한 쪽에 보여 줄 글 수 */
const POST_PAGE_SIZE = 10;

/**
 * 게시글 목록 조회 훅 (GET /api/post)
 * 쪽 번호와 검색 조건마다 결과가 따로 보관된다. 검색이 아니면 삭제되거나 탈퇴한 글도 자리에 남아 내려오고,
 * 검색어가 있으면 정상 글만 내려온다.
 */
const useReadPostList = (query: PostListQuery) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: postKeys.page(query),
    queryFn: async (): Promise<ApiResponse<PageData<PostListItem> | null>> => {
      try {
        const res = await api.get<ApiResponse<PageData<PostListItem> | null>>('/api/post', {
          params: { searchType: query.searchType, keyword: query.keyword, page: query.page, size: POST_PAGE_SIZE },
        });
        return res.data;
      } catch (err) {
        return toApiResponse<PageData<PostListItem>>(err);
      }
    },
  });

  const fetchReadPostList = async (): Promise<void> => {
    await refetch();
  };

  return { postListPage: data, postListLoading: isLoading, fetchReadPostList };
};

export default useReadPostList;
