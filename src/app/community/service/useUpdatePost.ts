import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import type { PostDetail } from '@/app/community/interface/PostDetail';
import type { PostSaveRequestBody } from '@/app/community/interface/PostSaveRequestBody';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 게시글 수정 훅 (PUT /api/post/{postId}). 성공하면 수정된 글(상세 모양)이 data 로 온다.
 * 상세를 다시 읽으면 조회수가 오르므로, 받은 글로 상세 보관함을 직접 바꾸고 목록만 낡았다고 알린다.
 */
const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdatePost = async (postId: number, body: PostSaveRequestBody): Promise<ApiResponse<PostDetail | null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<PostDetail | null>>(`/api/post/${postId}`, body);
      if (res.data.code === API_CODE.OK) {
        queryClient.setQueryData(postKeys.detail(postId), res.data);
        await queryClient.invalidateQueries({ queryKey: postKeys.pageAll() });
      }
      return res.data;
    } catch (err) {
      return toApiResponse<PostDetail>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updatePostLoading: loading, fetchUpdatePost };
};

export default useUpdatePost;
