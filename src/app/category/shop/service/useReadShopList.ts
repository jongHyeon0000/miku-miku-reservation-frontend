import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { shopKeys } from '@/app/category/shop/constant/shopQueryKeys';
import type { ShopGroup } from '@/app/category/shop/interface/ShopGroup';

/**
 * 판매처 목록 조회 훅 (GET /api/shop-group)
 * 결과는 키 하나로 한 곳에 보관되어 이 훅을 쓰는 모든 화면이 같은 값을 본다.
 * 판매처가 바뀌면 값이 새로 채워지면서 쓰는 화면이 자동으로 다시 그려진다.
 * enabled 가 false 면 읽지 않는다(로그인 전의 상단 메뉴).
 */
const useReadShopList = (enabled: boolean = true) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: shopKeys.list(),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<ShopGroup[] | null>> => {
      try {
        const res = await api.get<ApiResponse<ShopGroup[] | null>>('/api/shop-group');
        return res.data;
      } catch (err) {
        return toApiResponse<ShopGroup[]>(err);
      }
    },
  });

  const fetchReadShopList = async (): Promise<void> => {
    await refetch();
  };

  return { shopList: data, shopListLoading: isLoading, shopListFetching: isFetching, fetchReadShopList };
};

export default useReadShopList;
