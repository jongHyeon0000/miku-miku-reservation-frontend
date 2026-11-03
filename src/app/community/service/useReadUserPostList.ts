import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import type { PostListItemNormal } from '@/app/community/interface/PostListItem';

/** 프로필에 보여 줄 최근 글 수 */
const USER_POST_SIZE = 5;

/**
 * 사용자의 최근 글 조회 훅 (GET /api/user/{userId}/post)
 * 페이지 없이 최근 글만 최신순 배열로 온다. enabled 가 false 면 읽지 않는다(탭을 열었을 때만 읽는다).
 */
const useReadUserPostList = (userId: number, enabled: boolean) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: postKeys.userPostList(userId),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<PostListItemNormal[] | null>> => {
      try {
        const res = await api.get<ApiResponse<PostListItemNormal[] | null>>(`/api/user/${userId}/post`, {
          params: { size: USER_POST_SIZE },
        });
        return res.data;
      } catch (err) {
        return toApiResponse<PostListItemNormal[]>(err);
      }
    },
  });

  const fetchReadUserPostList = async (): Promise<void> => {
    await refetch();
  };

  return { userPostList: data, userPostListLoading: isLoading, fetchReadUserPostList };
};

export default useReadUserPostList;
