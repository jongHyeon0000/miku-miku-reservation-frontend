import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { TemplateImportPreview } from '@/app/category/template/interface/TemplateImportPreview';

/**
 * 템플릿 가져오기 미리보기 조회 훅 (GET /api/template/{id}/import-preview)
 * 새로 추가될 수와 이미 있어서 제외될 항목을 알려 준다. 결과를 화면에 담아 두지 않고, 확인 창을 띄우는 핸들러가 바로 쓰도록 반환한다.
 */
const useReadTemplateImportPreview = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadTemplateImportPreview = async (templateId: number): Promise<ApiResponse<TemplateImportPreview | null>> => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<TemplateImportPreview | null>>(`/api/template/${templateId}/import-preview`);
      return res.data;
    } catch (err) {
      return toApiResponse<TemplateImportPreview>(err);
    } finally {
      setLoading(false);
    }
  };

  return { templateImportPreviewLoading: loading, fetchReadTemplateImportPreview };
};

export default useReadTemplateImportPreview;
