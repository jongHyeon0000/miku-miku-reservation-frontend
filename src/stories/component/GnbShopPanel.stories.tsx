import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppBar, Toolbar, Typography } from '@mui/material'
import GnbShopPanel from '@/app/common/component/GnbShopPanel'
import type { ShopGroup } from '@/app/category/shop/interface/ShopGroup'

/** 견본에 쓰는 가짜 판매처 목록. 주소가 있는 곳, 주소가 없는 곳, http 가 아닌 주소인 곳을 섞었다 */
const SAMPLE_GROUPS: ShopGroup[] = [
  {
    id: 1,
    name: '국내 쇼핑몰',
    children: [
      { id: 11, name: '샘플몰 A', url: 'https://example.com/a', groupId: 1 },
      { id: 12, name: '샘플몰 B', url: 'https://example.com/b', groupId: 1 },
      { id: 13, name: '주소 없는 샘플몰', groupId: 1 },
    ],
  },
  {
    id: 2,
    name: '해외 쇼핑몰',
    children: [
      { id: 21, name: '해외몰 C', url: 'https://example.com/c', groupId: 2 },
      { id: 22, name: '잘못된 주소 샘플몰', url: 'ftp://example.com/d', groupId: 2 },
    ],
  },
]

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 판매처 패널을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof GnbShopPanel> = {
  title: '공통 컴포넌트/판매처 바로가기 패널 [GnbShopPanel]',
  component: GnbShopPanel,
  /* 패널은 상단 메뉴 바로 아래에 붙도록 위치가 정해져 있어서, 상단 메뉴 모양의 바를 기준으로 그린다 */
  decorators: [
    (Story) => (
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <Typography variant="h6">상단 메뉴</Typography>
        </Toolbar>
        <Story />
      </AppBar>
    ),
  ],
  argTypes: {
    groups: { name: '판매처 그룹 목록', control: false },
    open: { name: '열림' },
    onMouseEnter: { name: '마우스 들어옴', control: false },
    onMouseLeave: { name: '마우스 나감', control: false },
  },
  args: {
    groups: SAMPLE_GROUPS,
    open: true,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined,
  },
}

export default meta

type Story = StoryObj<typeof GnbShopPanel>

/** 상단 메뉴(src/app/common/component/GNB.tsx)의 '판매처' 탭에 마우스를 올리면 메뉴 아래로 펼쳐지는 패널. 주소가 있는 판매처는 새 탭으로 열리고 없는 곳은 흐리게 보인다 */
export const GnbShopPanelOpen: Story = {
  name: '상단 메뉴 > 판매처 탭 아래 > 바로가기 패널',
}
