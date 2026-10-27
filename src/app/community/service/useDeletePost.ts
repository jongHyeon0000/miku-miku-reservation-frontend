import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 게시글 삭제 훅 (DELETE /api/post/{postId})
 * 삭제하면 목록에서 그 자리가 '삭제된 글'로 바뀌므로 목록 키만 울린다(삭제된 글의 상세 키는 울리지 않는다).
 */
const useDeletePost = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeletePost = async (postId: number): Promise<ApiResponse<null>> => {
    setLoading(true);
    try {
      const res = await api.delete<ApiResponse<null>>(`/api/post/${postId}`);

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: postKeys.pageAll() });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<null>(err);
    } finally {
      setLoading(false);
    }
  };

  return { deletePostLoading: loading, fetchDeletePost };
};

export default useDeletePost;
