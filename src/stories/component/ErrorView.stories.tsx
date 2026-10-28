import type { Meta, StoryObj } from '@storybook/react-vite'
import ErrorView from '@/app/common/component/ErrorView'

const handleRetry = () => {}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 오류 화면을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof ErrorView> = {
  title: '공통 컴포넌트/오류 화면 [ErrorView]',
  component: ErrorView,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    message: { name: '메시지' },
    /* 함수는 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    onRetry: { name: '다시 시도 눌렀을 때', control: false },
  },
  args: {
    message: '서버에 연결할 수 없어요',
  },
}

export default meta

type Story = StoryObj<typeof ErrorView>

/** 조회에 실패한 모든 화면(카테고리 축별 본문, 상품 목록, 상품 상세, 상품 폼, 커뮤니티 목록, 글 상세, 글 폼, 댓글 영역, 템플릿 창). 서버 메시지와 다시 시도 버튼 */
export const ReadFailedWithRetry: Story = {
  name: '조회 실패 화면 > 본문 > 다시 시도',
  args: {
    onRetry: handleRetry,
  },
}

/** 다시 시도 버튼이 없는 모양. 앱에서는 모든 사용처가 다시 시도를 넘기지만 props 가 선택이라 모양을 남겨 둔다 */
export const ReadFailedMessageOnly: Story = {
  name: '조회 실패 화면 > 본문 > 메시지만',
}
