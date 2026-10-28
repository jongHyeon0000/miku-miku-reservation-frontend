import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tab } from '@mui/material'
import { EndTab, HoverTabs, UnderlineTabs } from '@/app/common/style/CommonTabs.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 탭 스타일을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/탭 [CommonTabs.style.tsx]',
}

export default meta

type Story = StoryObj

/** 상단 메뉴 탭(common/component/GNB.tsx). 판매처 패널이 열려 있는 동안은 해당 탭이 마우스를 올린 모양(shop-open) */
export const GnbTabs: Story = {
  name: '상단 메뉴 > 탭 줄 > 메뉴 탭',
  render: () => (
    <HoverTabs value="/figures">
      <Tab value="/figures" label="상품" />
      <Tab value="/category" label="카테고리" />
      <Tab value="/community" label="커뮤니티" />
      <Tab value="shop" label="판매처" className="shop-open" />
    </HoverTabs>
  ),
}

/** 상품 목록의 상태 탭(figure/component/list/FigureStatusTabs.tsx). 밑줄 없이 호버 효과만 있는 탭 줄 */
export const FigureStatusTabs: Story = {
  name: '상품 목록 > 위 > 상태 탭',
  render: () => (
    <HoverTabs value="ALL">
      <Tab value="ALL" label="전체 12" />
      <Tab value="CART" label="장바구니 3" />
      <Tab value="UNPURCHASED" label="미구매 4" />
      <Tab value="RESERVED" label="예약완료 2" />
      <Tab value="PURCHASED" label="구매완료 2" />
      <Tab value="DELIVERED" label="배송완료 1" />
    </HoverTabs>
  ),
}

/** 카테고리 화면의 분류 축 탭(category/common/component/CategoryAxisTabs.tsx). 오른쪽 끝에 템플릿 가져오기 탭 */
export const CategoryAxisTabs: Story = {
  name: '카테고리 > 위 > 분류 축 탭',
  render: () => (
    <UnderlineTabs value="shop">
      <Tab value="shop" label="판매처" />
      <Tab value="figureType" label="형태" />
      <Tab value="series" label="시리즈" />
      <Tab value="genreCharacter" label="장르·캐릭터" />
      <Tab value="maker" label="제조사" />
      <EndTab value="template" label="템플릿 가져오기" />
    </UnderlineTabs>
  ),
}

/** 마이페이지(my-page/page/MyPagePage.tsx)의 탭과 템플릿 가져오기 창(category/template/component/TemplateImportDialog.tsx)의 분류 탭. 아래에 선이 있는 탭 줄 */
export const MyPageTabs: Story = {
  name: '마이페이지 > 위 > 탭',
  render: () => (
    <UnderlineTabs value="PROFILE">
      <Tab value="PROFILE" label="내 정보" />
      <Tab value="WITHDRAW" label="탈퇴" />
    </UnderlineTabs>
  ),
}
