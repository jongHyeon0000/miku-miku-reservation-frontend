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
 * 게시글 등록 훅 (POST /api/post). 성공하면 만들어진 글(상세 모양)이 data 로 온다.
 * 목록을 낡았다고 알리고, 받은 글은 상세 보관함에 바로 넣는다(글쓴이가 등록 직후 자기 글을 열 때 조회수가 오르지 않게).
 */
const useCreatePost = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCreatePost = async (body: PostSaveRequestBody): Promise<ApiResponse<PostDetail | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<PostDetail | null>>('/api/post', body);

      if (res.data.code === API_CODE.OK) {
        const created = res.data.data;

        if (created !== null) {
          queryClient.setQueryData(postKeys.detail(created.postId), res.data);
        }

        await queryClient.invalidateQueries({ queryKey: postKeys.pageAll() });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<PostDetail>(err);
    } finally {
      setLoading(false);
    }
  };

  return { createPostLoading: loading, fetchCreatePost };
};

export default useCreatePost;
