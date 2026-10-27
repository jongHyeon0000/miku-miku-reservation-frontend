import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import type { PostComment } from '@/app/community/interface/PostComment';
import type { PostCommentSaveRequestBody } from '@/app/community/interface/PostCommentSaveRequestBody';
import type { PostDetail } from '@/app/community/interface/PostDetail';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 댓글, 답글 등록 훅 (POST /api/post/{postId}/comment)
 * 성공하면 그 글의 댓글 목록과 글 목록(댓글 수)을 낡았다고 알린다.
 * 글 상세는 다시 읽으면 조회수가 오르므로 알리지 않고, 보관된 댓글 수만 1 올려 둔다.
 */
const useCreatePostComment = (postId: number) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreatePostComment = async (body: PostCommentSaveRequestBody): Promise<ApiResponse<PostComment | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<PostComment | null>>(`/api/post/${postId}/comment`, body);

      if (res.data.code === API_CODE.OK) {
        queryClient.setQueryData<ApiResponse<PostDetail | null>>(postKeys.detail(postId), (cached) => {
          if (cached === undefined || cached.data === null) {
            return cached;
          }

          return { ...cached, data: { ...cached.data, commentCount: cached.data.commentCount + 1 } };
        });

        await Promise.all([
          queryClient.invalidateQueries({ queryKey: postKeys.commentList(postId) }),
          queryClient.invalidateQueries({ queryKey: postKeys.pageAll() }),
        ]);
      }

      return res.data;
    } catch (err) {
      return toApiResponse<PostComment>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createPostCommentLoading: loading, fetchCreatePostComment };
};

export default useCreatePostComment;
