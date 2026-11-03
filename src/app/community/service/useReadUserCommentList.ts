import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import type { UserCommentItem } from '@/app/community/interface/UserCommentItem';

/** 프로필에 보여 줄 최근 답변 수 */
const USER_COMMENT_SIZE = 5;

/**
 * 사용자의 최근 답변 조회 훅 (GET /api/user/{userId}/comment)
 * 페이지 없이 최근 답변만 최신순 배열로 온다. enabled 가 false 면 읽지 않는다(탭을 열었을 때만 읽는다).
 */
const useReadUserCommentList = (userId: number, enabled: boolean) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: postKeys.userCommentList(userId),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<UserCommentItem[] | null>> => {
      try {
        const res = await api.get<ApiResponse<UserCommentItem[] | null>>(`/api/user/${userId}/comment`, {
          params: { size: USER_COMMENT_SIZE },
        });
        return res.data;
      } catch (err) {
        return toApiResponse<UserCommentItem[]>(err);
      }
    },
  });

  const fetchReadUserCommentList = async (): Promise<void> => {
    await refetch();
  };

  return { userCommentList: data, userCommentListLoading: isLoading, fetchReadUserCommentList };
};

export default useReadUserCommentList;
