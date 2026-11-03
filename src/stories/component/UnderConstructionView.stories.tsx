import type { Meta, StoryObj } from '@storybook/react-vite'
import UnderConstructionView from '@/app/common/component/UnderConstructionView'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 개발중 화면을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof UnderConstructionView> = {
  title: '공통 컴포넌트/개발중 화면 [UnderConstructionView.tsx]',
  component: UnderConstructionView,
}

export default meta

type Story = StoryObj<typeof UnderConstructionView>

/** 통계 화면(src/app/stats/page/StatsPage.tsx) 본문 전체 */
export const StatsBody: Story = {
  name: '통계 > 본문 > 화면 전체',
}
