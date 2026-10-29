import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import CategoryAxisTabs from '@/app/category/common/component/CategoryAxisTabs'
import type { CategoryAxisKey } from '@/app/category/common/constant/categoryAxes'

const handleNoop = () => {}

interface CategoryAxisTabsDemoProps {
  axis: CategoryAxisKey
  onTemplate?: () => void
}

/** 탭을 누르면 실제로 바뀌어 보이도록 선택된 축을 견본 안에서 들고 있는다 */
const CategoryAxisTabsDemo = ({ axis, onTemplate }: CategoryAxisTabsDemoProps) => {
  const [currentAxis, setCurrentAxis] = useState<CategoryAxisKey>(axis)

  return <CategoryAxisTabs axis={currentAxis} onChange={setCurrentAxis} onTemplate={onTemplate} />
}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 축 탭을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof CategoryAxisTabs> = {
  title: '분류/축 탭 [CategoryAxisTabs.tsx]',
  component: CategoryAxisTabs,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    axis: {
      name: '지금 축',
      control: 'select',
      options: ['shop', 'figure-type', 'series', 'genre-character', 'maker'],
    },
    /* 함수는 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    onChange: { name: '축을 바꿨을 때', control: false },
    onTemplate: { name: '템플릿 가져오기를 눌렀을 때', control: false },
  },
  args: {
    axis: 'shop',
    onChange: handleNoop,
  },
  render: (args) => <CategoryAxisTabsDemo axis={args.axis} onTemplate={args.onTemplate} />,
}

export default meta

type Story = StoryObj<typeof CategoryAxisTabs>

/** 카테고리 화면 맨 위(src/app/category/common/page/CategoryPage.tsx). 오른쪽 끝에 템플릿 가져오기 탭이 있다 */
export const CategoryPageTabs: Story = {
  name: '카테고리 > 상단 > 축 탭',
  args: {
    onTemplate: handleNoop,
  },
}

/** 소개 화면 분류 장면(src/app/welcome-intro/component/WelcomeIntroCategoryScene.tsx)의 데모. 템플릿 가져오기 탭 없음 */
export const IntroSceneTabs: Story = {
  name: '소개 > 분류 장면 > 축 탭',
}
