import type { Meta, StoryObj } from '@storybook/react-vite'
import CommonSceneTextBlock from '@/app/common/component/CommonSceneTextBlock'
import { SceneDesc } from '@/app/common/style/CommonScene.style'
import { Highlight } from '@/app/common/style/CommonText.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 장면 설명 영역을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof CommonSceneTextBlock> = {
  title: '공통 컴포넌트/장면 설명 영역 [CommonSceneTextBlock.tsx]',
  component: CommonSceneTextBlock,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    active: { name: '장면이 보이는 중' },
    eyebrow: { name: '작은 제목' },
    /* 화면 조각(JSX)은 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    title: { name: '큰 제목', control: false },
    children: { name: '설명 글', control: false },
  },
  args: {
    active: true,
  },
}

export default meta

type Story = StoryObj<typeof CommonSceneTextBlock>

/** 소개 화면 분류 장면(src/app/welcome-intro/component/WelcomeIntroCategoryScene.tsx)의 왼쪽 글. 작은 제목, 큰 제목, 설명 글이 위에서부터 차례로 떠오른다 */
export const IntroCategoryText: Story = {
  name: '소개 화면 > 분류 장면 > 설명 영역',
  args: {
    eyebrow: '01 · 분류',
    title: (
      <>
        어떤 종류의 상품도 자유롭게,
        <br />
        <Highlight>카테고리는 직접</Highlight> 만들어요
      </>
    ),
    children: (
      <>
        <SceneDesc>판매처, 형태, 시리즈, 장르, 캐릭터, 제조사를 상위, 하위 분류로 내 맘대로 만들어요.</SceneDesc>
        <SceneDesc>피규어든 아크릴이든, 내 컬렉션에 맞는 분류 체계를 스스로 만들어 관리할 수 있어요.</SceneDesc>
      </>
    ),
  },
}
