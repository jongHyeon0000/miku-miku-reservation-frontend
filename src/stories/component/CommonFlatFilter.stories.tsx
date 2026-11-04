import type { Meta, StoryObj } from '@storybook/react-vite'
import CommonFlatFilter from '@/app/common/component/CommonFlatFilter'

const handleNoop = () => {}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 한 줄 목록 필터를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof CommonFlatFilter> = {
  title: '공통 컴포넌트/한 줄 목록 필터 [CommonFlatFilter.tsx]',
  component: CommonFlatFilter,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    allLabel: { name: '전체 항목 이름' },
    options: { name: '고를 수 있는 값' },
    value: { name: '고른 값' },
    onChange: { name: '골랐을 때' },
  },
  args: {
    onChange: handleNoop,
  },
}

export default meta

type Story = StoryObj<typeof CommonFlatFilter>

/** 상품 목록 필터 줄의 배송월(figure/component/filter/FigureFilterBar.tsx). 맨 위에 "배송월 전체"가 있고, 고르면 금색 */
export const FigureMonthFilter: Story = {
  name: '상품 목록 > 필터 줄 > 배송월',
  args: {
    allLabel: '배송월 전체',
    options: [
      { value: '2026-11', label: '2026.11' },
      { value: '2026-12', label: '2026.12' },
    ],
    value: null,
  },
}

/** 상품 목록 필터 줄의 정렬. 전체 항목 없이 항상 하나가 골라져 있다 */
export const FigureSortFilter: Story = {
  name: '상품 목록 > 필터 줄 > 정렬',
  args: {
    options: [
      { value: 'DEADLINE_ASC', label: '예약 빠른순' },
      { value: 'PRICE_ASC', label: '가격 낮은순' },
      { value: 'PRICE_DESC', label: '가격 높은순' },
      { value: 'MONTH_ASC', label: '배송 빠른순' },
    ],
    value: 'DEADLINE_ASC',
  },
}

/** 커뮤니티 목록 위 검색 줄의 검색 대상(community/component/list/PostSearchBar.tsx). 전체 항목 없이 항상 하나가 골라져 있다 */
export const CommunitySearchType: Story = {
  name: '커뮤니티 목록 > 검색 줄 > 검색 대상',
  args: {
    options: [
      { value: 'TITLE_CONTENT', label: '제목+내용' },
      { value: 'TITLE', label: '제목' },
      { value: 'CONTENT', label: '내용' },
      { value: 'AUTHOR', label: '작성자' },
    ],
    value: 'TITLE_CONTENT',
  },
}
