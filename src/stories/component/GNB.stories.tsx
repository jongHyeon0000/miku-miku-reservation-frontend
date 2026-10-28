import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GNB from '@/app/common/component/GNB'
import type { ShopGroup } from '@/app/category/shop/interface/ShopGroup'
import { shopKeys } from '@/app/category/shop/constant/shopQueryKeys'
import type { UserInfo } from '@/app/auth/interface/UserInfo'
import { API_CODE } from '@/config/axios/constant/apiCode'
import type { ApiResponse } from '@/config/axios/interface/ApiResponse'
import { useAuthStore } from '@/store/authStore'
import { removeAccessToken, setAccessToken } from '@/utils/cookieUtils'

/** 견본에 쓰는 가짜 사용자 (프로필 이미지 없음) */
const SAMPLE_USER: UserInfo = {
  userId: 1,
  loginId: 'sample',
  email: 'sample@example.com',
  name: '샘플 사용자',
  createdAt: '2026-01-01T00:00:00',
  updatedAt: '2026-01-01T00:00:00',
}

/** 견본에 쓰는 가짜 판매처 목록 (GET /api/shop-group 응답과 같은 모양). 기본 분류 '기타'는 상단 메뉴가 걸러 낸다 */
const SAMPLE_SHOP_RESPONSE: ApiResponse<ShopGroup[]> = {
  code: API_CODE.OK,
  message: '',
  data: [
    {
      id: 1,
      name: '국내 쇼핑몰',
      children: [
        { id: 11, name: '샘플몰 A', url: 'https://example.com/a', groupId: 1 },
        { id: 12, name: '샘플몰 B', groupId: 1 },
        { id: 13, name: '기타', groupId: 1 },
      ],
    },
    {
      id: 2,
      name: '해외 쇼핑몰',
      children: [{ id: 21, name: '해외몰 C', url: 'https://example.com/c', groupId: 2 }],
    },
  ],
}

/**
 * 로그인 상태(쿠키 토큰 + user)와 판매처 목록 보관값을 미리 채워 둔 틀을 씌운다.
 * 서버가 없어서 목록을 다시 읽으면 값이 덮어써지므로, 보관값이 항상 새것으로 보이게 staleTime 을 끝없이 둔다.
 */
const withAuth = (loggedIn: boolean, user: UserInfo | null): Decorator => {
  const decorator: Decorator = (Story) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } })

    if (loggedIn) {
      setAccessToken('storybook-token')
      queryClient.setQueryData(shopKeys.groupAll(), SAMPLE_SHOP_RESPONSE)
    } else {
      removeAccessToken()
    }

    useAuthStore.setState({ user: user })

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  }

  return decorator
}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 상단 메뉴를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof GNB> = {
  title: '공통 컴포넌트/상단 메뉴 [GNB.tsx]',
  component: GNB,
}

export default meta

type Story = StoryObj<typeof GNB>

/** 앱 전체(src/App.tsx)의 맨 위 고정 메뉴. 로그인한 상태. 메뉴 탭, 판매처 탭(마우스를 올리면 패널이 열린다), 프로필 버튼(누르면 마이페이지, 로그아웃) */
export const GnbLoggedIn: Story = {
  name: '앱 전체 > 맨 위 > 로그인 상태 메뉴',
  decorators: [withAuth(true, SAMPLE_USER)],
}

/** 앱 전체(src/App.tsx)의 맨 위 고정 메뉴. 로그인하지 않은 상태. 로고와 로그인 버튼만 보인다 */
export const GnbLoggedOut: Story = {
  name: '앱 전체 > 맨 위 > 비로그인 상태 메뉴',
  decorators: [withAuth(false, null)],
}
