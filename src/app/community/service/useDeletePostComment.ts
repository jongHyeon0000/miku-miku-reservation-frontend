import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 댓글, 답글 삭제 훅 (DELETE /api/post/comment/{postCommentId})
 * 지워도 그 자리가 '삭제된 댓글'로 남고 답글도 그대로라서, 그 글의 댓글 목록만 낡았다고 알린다
 * (삭제된 댓글도 댓글 수에 포함되므로 글 상세, 글 목록의 수는 그대로다).
 */
const useDeletePostComment = (postId: number) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeletePostComment = async (postCommentId: number): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>(`/api/post/comment/${postCommentId}`);

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: postKeys.commentList(postId) });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { deletePostCommentLoading: loading, fetchDeletePostComment };
};

export default useDeletePostComment;
