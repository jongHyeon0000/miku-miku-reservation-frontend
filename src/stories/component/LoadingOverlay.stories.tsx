import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '@mui/material'
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 로딩 화면을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof LoadingOverlay> = {
  title: '공통 컴포넌트/로딩 화면 [LoadingOverlay]',
  component: LoadingOverlay,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    open: { name: '표시 여부' },
  },
  /* 화면 전체를 덮어서 다른 견본을 가리므로 처음에는 닫아 두고, 조작 패널에서 켜서 확인한다 */
  args: {
    open: false,
  },
  render: (args) => (
    <>
      <Typography color="text.secondary">조작 패널에서 표시 여부를 켜면 화면 전체를 덮는 로딩 표시가 나타나요</Typography>
      <LoadingOverlay open={args.open} />
    </>
  ),
}

export default meta

type Story = StoryObj<typeof LoadingOverlay>

/** 저장, 삭제, 로그인처럼 끝날 때까지 다른 조작을 막는 모든 화면(로그인, 회원가입, 상품 목록, 카테고리 본문, 글 상세, 마이페이지 등). 훅의 loading 값을 그대로 넘긴다 */
export const SavingOverlay: Story = {
  name: '저장, 삭제 중 > 화면 전체 > 로딩 표시',
}
