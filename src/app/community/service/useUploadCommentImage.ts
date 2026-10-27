import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { PostCommentImageUploadResponseData } from '@/app/community/interface/PostCommentImageUploadResponseData';

/**
 * 댓글 이미지 올리기 훅 (POST /api/upload/comment-image)
 * 댓글을 쓰기 전에 이미지를 먼저 올려 id 를 받는다(한 장에 한 번). 올리고 댓글에 쓰지 않은 이미지는 서버가 1일 뒤 지운다.
 */
const useUploadCommentImage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUploadCommentImage = async (file: File): Promise<ApiResponse<PostCommentImageUploadResponseData | null>> => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await api.post<ApiResponse<PostCommentImageUploadResponseData>>('/api/upload/comment-image', formData);
      return res.data;
    } catch (err) {
      return toApiResponse<PostCommentImageUploadResponseData>(err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadCommentImageLoading: loading, fetchUploadCommentImage };
};

export default useUploadCommentImage;
