import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { CategoryAxisKey, CategoryLevel } from '@/app/category/constant/categoryAxes';
import { getLevelConfig } from '@/app/category/utils/CategoryUtils';

interface CategoryUsage {
  /** 이 분류를 쓰고 있는 상품 수 */
  count: number;
}

/**
 * 분류 삭제 전 영향 상품 수 조회 훅 (5개 축, 상위/하위 공용)
 * 결과를 화면에 담아 두지 않고, 삭제 확인창을 띄우는 핸들러가 바로 쓰도록 반환한다.
 */
const useReadCategoryUsage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadCategoryUsage = async (
    axis: CategoryAxisKey,
    level: CategoryLevel,
    id: number,
  ): Promise<ApiResponse<CategoryUsage | null>> => {
    const levelConfig = getLevelConfig(axis, level);

    setLoading(true);
    try {
      const res = await api.get<ApiResponse<CategoryUsage | null>>(`${levelConfig.path}/${id}/usage`);
      return res.data;
    } catch (err) {
      return toApiResponse<CategoryUsage>(err);
    } finally {
      setLoading(false);
    }
  };

  return { categoryUsageLoading: loading, fetchReadCategoryUsage };
};

export default useReadCategoryUsage;
