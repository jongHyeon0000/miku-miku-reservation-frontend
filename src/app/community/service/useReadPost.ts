import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import type { PostDetail } from '@/app/community/interface/PostDetail';

/**
 * 게시글 상세 조회 훅 (GET /api/post/{postId})
 * 상세를 읽을 때마다 서버가 조회수를 올리므로, 화면에 들어올 때 한 번만 읽는다.
 * (기본 설정이면 창으로 돌아오거나 화면이 다시 뜰 때마다 다시 읽어 조회수가 마음대로 오른다)
 * 글을 수정하면 수정 훅이 응답으로 이 값을 직접 바꾼다.
 */
const useReadPost = (postId: number, enabled: boolean = true) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: postKeys.detail(postId),
    enabled: enabled,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<ApiResponse<PostDetail | null>> => {
      try {
        const res = await api.get<ApiResponse<PostDetail | null>>(`/api/post/${postId}`);
        return res.data;
      } catch (err) {
        return toApiResponse<PostDetail>(err);
      }
    },
  });

  const fetchReadPost = async (): Promise<void> => {
    await refetch();
  };

  return { post: data, postLoading: isLoading, fetchReadPost };
};

export default useReadPost;
