import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { postKeys } from '@/app/community/constant/postQueryKeys';
import type { PostComment } from '@/app/community/interface/PostComment';
import type { PostCommentSaveRequestBody } from '@/app/community/interface/PostCommentSaveRequestBody';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 댓글, 답글 수정 훅 (PUT /api/post/comment/{postCommentId})
 * postCommentImageIds 는 수정 후 최종 이미지 목록이다(비우면 이미지를 모두 지운다). 부모와 멘션은 보내도 서버가 무시한다.
 * 성공하면 그 글의 댓글 목록을 낡았다고 알린다(글 상세, 글 목록은 바뀌는 것이 없다).
 */
const useUpdatePostComment = (postId: number) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdatePostComment = async (
    postCommentId: number,
    body: PostCommentSaveRequestBody,
  ): Promise<ApiResponse<PostComment | null>> => {
    setLoading(true);
    try {
      const res = await api.put<ApiResponse<PostComment | null>>(`/api/post/comment/${postCommentId}`, body);

      if (res.data.code === API_CODE.OK) {
        await queryClient.invalidateQueries({ queryKey: postKeys.commentList(postId) });
      }

      return res.data;
    } catch (err) {
      return toApiResponse<PostComment>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updatePostCommentLoading: loading, fetchUpdatePostComment };
};

export default useUpdatePostComment;
