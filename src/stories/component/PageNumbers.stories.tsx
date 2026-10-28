import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import PageNumbers from '@/app/common/component/PageNumbers'

const handleNoop = () => {}

/** 번호를 누르면 실제로 바뀌어 보이도록 쪽 번호를 견본 안에서 들고 있는다 */
const PageNumbersDemo = ({ page, totalPages }: { page: number; totalPages: number }) => {
  const [currentPage, setCurrentPage] = useState<number>(page)

  return <PageNumbers page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 페이지 번호를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof PageNumbers> = {
  title: '공통 컴포넌트/페이지 번호 [PageNumbers.tsx]',
  component: PageNumbers,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    page: { name: '지금 쪽' },
    totalPages: { name: '전체 쪽 수' },
    /* 함수는 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    onChange: { name: '쪽이 바뀌었을 때', control: false },
  },
  args: {
    page: 1,
    totalPages: 5,
    onChange: handleNoop,
  },
  render: (args) => <PageNumbersDemo page={args.page} totalPages={args.totalPages} />,
}

export default meta

type Story = StoryObj<typeof PageNumbers>

/** 카테고리 화면 오른쪽 하위 목록 아래(src/app/category/{축}/component/{축}CategoryTree.tsx)와 커뮤니티 목록 표 아래(src/app/community/component/list/PostListTable.tsx). 서버가 쪽 단위로 나눠 준다 */
export const ListBottom: Story = {
  name: '카테고리, 커뮤니티 목록 > 하단 > 페이지 번호',
}

/** 상품 고르기 창(src/app/figure/component/form/FigurePickDialog.tsx). 항목이 한 쪽을 넘을 때만 보인다 */
export const PickDialogBottom: Story = {
  name: '상품 고르기 창 > 하단 > 페이지 번호',
  args: {
    totalPages: 2,
  },
}
