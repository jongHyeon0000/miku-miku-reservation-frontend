import type { Meta, StoryObj } from '@storybook/react-vite'
import SelectBar from '@/app/common/component/SelectBar'

const handleNoop = () => {}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 선택 도구줄을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof SelectBar> = {
  title: '공통 컴포넌트/선택 도구줄 [SelectBar.tsx]',
  component: SelectBar,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    danger: { name: '경고색 동작' },
    checkedCount: { name: '체크된 항목 수' },
    shownCount: { name: '보이는 항목 수' },
    actionLabel: { name: '동작 버튼 글자' },
    /* 함수는 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    onToggleAll: { name: '전체 선택을 눌렀을 때', control: false },
    onAction: { name: '동작 버튼을 눌렀을 때', control: false },
    onCancel: { name: '나가기를 눌렀을 때', control: false },
  },
  args: {
    danger: true,
    checkedCount: 2,
    shownCount: 10,
    actionLabel: '삭제',
    onToggleAll: handleNoop,
    onAction: handleNoop,
  },
}

export default meta

type Story = StoryObj<typeof SelectBar>

/** 카테고리 화면 오른쪽 하위 목록 맨 아래 칸의 일괄 삭제(src/app/category/{축}/component/{축}CategoryTree.tsx). 경고색 삭제 버튼과 나가기 */
export const CategorySelectBar: Story = {
  name: '카테고리 > 우측 하단 > 일괄 삭제',
  args: {
    onCancel: handleNoop,
  },
}

/** 상품 목록 헤더의 상품 관리 모드(src/app/figure/component/list/FigureListActions.tsx). 경고색 삭제 버튼, 나가는 버튼이 따로 있어 나가기 없음 */
export const FigureManageSelectBar: Story = {
  name: '상품 목록 > 헤더 > 상품 관리',
}

/** 상품 목록 헤더의 상태 변경 모드. 일반색 동작 버튼, 나가기 없음 */
export const FigureStatusSelectBar: Story = {
  name: '상품 목록 > 헤더 > 상태 변경',
  args: {
    danger: false,
    actionLabel: '구매완료로 변경',
  },
}

/** 선택 도구줄의 아무것도 안 고른 상태. 동작 버튼이 막히고 전체 선택 칸은 빈 칸 */
export const NoneCheckedSelectBar: Story = {
  name: '공통 > 선택 도구줄 > 선택 없음',
  args: {
    checkedCount: 0,
  },
}

/** 선택 도구줄의 전부 고른 상태. 전체 선택 칸이 체크된다 */
export const AllCheckedSelectBar: Story = {
  name: '공통 > 선택 도구줄 > 전부 선택',
  args: {
    checkedCount: 10,
  },
}
