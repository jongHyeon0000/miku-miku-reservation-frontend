import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { THUMBNAIL_QUERY_KEYS } from '@/app/common/constant/thumbnailTargetKeys';
import type { ThumbnailTarget } from '@/app/common/constant/thumbnailTarget';

/** 썸네일 업로드 결과 (PUT /api/upload/thumbnail-image/{targetType}/{targetId}) */
interface ThumbnailUrlResponse {
  /**
   * 이미지를 내려주는 주소 ('/uploads/...' 상대 경로)
   * @example "/uploads/1/thumbnail-image/shop-group/2026/10/uuid.png"
   */
  thumbnailUrl: string;
}

/**
 * 썸네일 올리기 훅 (상품, 분류 공용)
 * 대상(상품, 분류)을 먼저 저장해 id 를 받은 뒤에 올린다. 이미 썸네일이 있으면 새 파일로 바뀐다.
 * 성공하면 대상 종류에 맞는 키를 낡았다고 알린다.
 */
const useUploadThumbnail = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUploadThumbnail = async (
    targetType: ThumbnailTarget,
    targetId: number,
    file: File,
  ): Promise<ApiResponse<ThumbnailUrlResponse | null>> => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await api.put<ApiResponse<ThumbnailUrlResponse>>(
        `/api/upload/thumbnail-image/${targetType}/${targetId}`,
        formData,
      );

      if (res.data.code === API_CODE.OK) {
        await Promise.all(
          THUMBNAIL_QUERY_KEYS[targetType](targetId).map((queryKey) => queryClient.invalidateQueries({ queryKey })),
        );
      }

      return res.data;
    } catch (err) {
      return toApiResponse<ThumbnailUrlResponse>(err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadThumbnailLoading: loading, fetchUploadThumbnail };
};

export default useUploadThumbnail;
