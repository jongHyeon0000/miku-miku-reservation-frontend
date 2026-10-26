import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { shopKeys } from '@/app/category/shop/constant/shopQueryKeys';
import { CATEGORY_PAGE_SIZE } from '@/app/category/common/constant/categoryPage';
import type { ShopItem } from '@/app/category/shop/interface/ShopItem';
import type { PageData } from '@/app/common/interface/PageData';

/**
 * 판매처 하위 목록 조회 훅 (GET /api/shop)
 * 상위(groupId)와 페이지 번호마다 결과가 따로 보관된다.
 * enabled 가 false 면 읽지 않는다(상위가 하나도 없을 때).
 */
const useReadShopChildList = (groupId: number, page: number, enabled: boolean = true) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: shopKeys.page(groupId, page),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<PageData<ShopItem> | null>> => {
      try {
        const res = await api.get<ApiResponse<PageData<ShopItem> | null>>('/api/shop', {
          params: { groupId: groupId, page: page, size: CATEGORY_PAGE_SIZE },
        });
        return res.data;
      } catch (err) {
        return toApiResponse<PageData<ShopItem>>(err);
      }
    },
  });

  const fetchReadShopChildList = async (): Promise<void> => {
    await refetch();
  };

  return { shopChildPage: data, shopChildLoading: isLoading, fetchReadShopChildList };
};

export default useReadShopChildList;
