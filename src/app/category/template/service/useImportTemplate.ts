import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { TEMPLATE_IMPORT_QUERY_KEYS } from '@/app/category/template/constant/templateQueryKeys';
import type { TemplateType } from '@/app/category/template/constant/templateType';
import type { TemplateImportResult } from '@/app/category/template/interface/TemplateImportResult';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 템플릿 가져오기 훅 (POST /api/template/{id}/import)
 * 성공하면 그 종류가 채우는 분류 목록과 상품 폼의 선택지를 낡았다고 알린다.
 */
const useImportTemplate = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchImportTemplate = async (
    templateId: number,
    templateType: TemplateType,
  ): Promise<ApiResponse<TemplateImportResult | null>> => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<TemplateImportResult | null>>(`/api/template/${templateId}/import`);
      if (res.data.code === API_CODE.OK) {
        const keys = TEMPLATE_IMPORT_QUERY_KEYS[templateType];
        await Promise.all(keys.map((queryKey) => queryClient.invalidateQueries({ queryKey: queryKey })));
      }
      return res.data;
    } catch (err) {
      return toApiResponse<TemplateImportResult>(err);
    } finally {
      setLoading(false);
    }
  };

  return { importTemplateLoading: loading, fetchImportTemplate };
};

export default useImportTemplate;
