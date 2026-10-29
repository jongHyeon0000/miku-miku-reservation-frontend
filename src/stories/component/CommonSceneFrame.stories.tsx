import type { Meta, StoryObj } from '@storybook/react-vite'
import CommonSceneFrame from '@/app/common/component/CommonSceneFrame'
import { Scene, SceneDesc, SceneEyebrow, SceneInner, SceneTitle } from '@/app/common/style/CommonScene.style'
import { Highlight } from '@/app/common/style/CommonText.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 장면 틀을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof CommonSceneFrame> = {
  title: '공통 컴포넌트/장면 틀 [CommonSceneFrame.tsx]',
  component: CommonSceneFrame,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    /* 화면 조각(JSX)이 들어 있는 목록은 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    scenes: { name: '장면 목록', control: false },
  },
}

export default meta

type Story = StoryObj<typeof CommonSceneFrame>

/**
 * 소개 화면(src/app/welcome-intro/page/WelcomeIntroPage.tsx)의 장면 틀. 장면 7개를 휠, 키보드, 오른쪽 점으로 한 화면씩 넘긴다.
 * 여기서는 장면 3개만 가짜 글로 보여 준다
 */
export const WelcomeIntroPageFrame: Story = {
  name: '소개 화면 > 전체 > 장면 틀',
  args: {
    scenes: [
      {
        name: '첫 화면',
        scene: (
          <Scene>
            <SceneInner wide>
              <SceneEyebrow variant="mono">00 · 시작</SceneEyebrow>
              <SceneTitle variant="h3" component="h2">
                내 피규어를 <Highlight>한 곳에서</Highlight> 관리해요
              </SceneTitle>
              <SceneDesc>휠이나 방향키, 오른쪽 점으로 다음 장면을 볼 수 있어요.</SceneDesc>
            </SceneInner>
          </Scene>
        ),
      },
      {
        name: '분류',
        scene: (
          <Scene>
            <SceneInner wide>
              <SceneEyebrow variant="mono">01 · 분류</SceneEyebrow>
              <SceneTitle variant="h3" component="h2">
                <Highlight>카테고리는 직접</Highlight> 만들어요
              </SceneTitle>
            </SceneInner>
          </Scene>
        ),
      },
      {
        name: '시작하기',
        scene: (
          <Scene>
            <SceneTitle variant="h3" component="h2" align="center">
              지금 <Highlight>시작해 볼까요?</Highlight>
            </SceneTitle>
          </Scene>
        ),
      },
    ],
  },
}

/**
 * 예산관리 소개 화면(src/app/budget/page/)의 장면 틀. 소개 화면과 같은 틀에 예산 장면만 바뀐다.
 * 여기서는 장면 3개만 가짜 글로 보여 준다
 */
export const BudgetIntroFrame: Story = {
  name: '예산관리 > 소개 > 장면 틀',
  args: {
    scenes: [
      {
        name: '소개',
        scene: (
          <Scene>
            <SceneInner wide>
              <SceneEyebrow variant="mono">00 · 예산관리</SceneEyebrow>
              <SceneTitle variant="h3" component="h2">
                예산관리 기능을 <Highlight>사용해 보세요!</Highlight>
              </SceneTitle>
            </SceneInner>
          </Scene>
        ),
      },
      {
        name: '지출',
        scene: (
          <Scene>
            <SceneInner wide>
              <SceneEyebrow variant="mono">01 · 지출</SceneEyebrow>
              <SceneTitle variant="h3" component="h2">
                결제한 상품이 <Highlight>자동으로</Highlight> 쌓여요
              </SceneTitle>
            </SceneInner>
          </Scene>
        ),
      },
      {
        name: '시작하기',
        scene: (
          <Scene>
            <SceneTitle variant="h3" component="h2" align="center">
              지금 <Highlight>시작해 볼까요?</Highlight>
            </SceneTitle>
          </Scene>
        ),
      },
    ],
  },
}
