import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import type { PostComment } from '@/app/community/interface/PostComment';

/**
 * 게시글 댓글 목록 조회 훅 (GET /api/post/{postId}/comment)
 * 쪽 나눔 없이 그 글의 댓글 전체가 오고, 답글은 각 댓글의 replies 에 들어 있다. 삭제, 탈퇴한 댓글도 자리에 남아 내려온다.
 */
const useReadPostCommentList = (postId: number, enabled: boolean = true) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: postKeys.commentList(postId),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<PostComment[] | null>> => {
      try {
        const res = await api.get<ApiResponse<PostComment[] | null>>(`/api/post/${postId}/comment`);
        return res.data;
      } catch (err) {
        return toApiResponse<PostComment[]>(err);
      }
    },
  });

  const fetchReadPostCommentList = async (): Promise<void> => {
    await refetch();
  };

  return { postCommentList: data, postCommentListLoading: isLoading, fetchReadPostCommentList };
};

export default useReadPostCommentList;
