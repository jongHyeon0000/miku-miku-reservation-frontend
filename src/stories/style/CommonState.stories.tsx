import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Typography } from '@mui/material'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import { TonalButton } from '@/app/common/style/CommonButton.style'
import { Row } from '@/app/common/style/CommonLayout.style'
import { StateIcon } from '@/app/common/style/CommonMedia.style'
import { StateStack } from '@/app/common/style/CommonState.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 표시 틀을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/상태 표시 틀 [CommonState.style.tsx]',
}

export default meta

type Story = StoryObj

/** 목록이 비었을 때(common/component/EmptyView.tsx). 아이콘, 문구, 선택적으로 동작 버튼 */
export const EmptyState: Story = {
  name: '공통 > 목록 > 비었음 표시',
  render: () => (
    <StateStack>
      <StateIcon>
        <InboxOutlinedIcon fontSize="inherit" />
      </StateIcon>
      <Typography color="text.secondary">등록된 상품이 없어요</Typography>
    </StateStack>
  ),
}

/** 조회에 실패했을 때(common/component/ErrorView.tsx). 붉은 아이콘, 메시지, 다시 시도 버튼 */
export const ErrorState: Story = {
  name: '공통 > 화면 > 읽기 실패 표시',
  render: () => (
    <StateStack>
      <StateIcon>
        <ErrorOutlinedIcon fontSize="inherit" color="error" />
      </StateIcon>
      <Typography color="text.secondary">샘플 오류 메시지입니다</Typography>
      <Button variant="outlined">다시 시도</Button>
    </StateStack>
  ),
}

/** 없는 주소로 들어왔을 때(common/page/NotFoundPage.tsx). 큰 404 글자, 문구, 처음으로 버튼 */
export const NotFoundState: Story = {
  name: '공통 > 없는 주소 > 404 화면',
  render: () => (
    <StateStack>
      <Typography variant="h2" color="primary">
        404
      </Typography>
      <Typography color="text.secondary">찾을 수 없는 페이지예요.</Typography>
      <Button variant="contained">처음으로</Button>
    </StateStack>
  ),
}

/** 소개 마지막 장면(welcome-intro/component/WelcomeIntroStartScene.tsx). 제목, 설명, 버튼 줄, 링크 글자를 가운데로 쌓는다 */
export const IntroStartState: Story = {
  name: '소개 > 시작 장면 > 가운데 쌓기',
  render: () => (
    <StateStack>
      <Typography variant="h3" component="h2" align="center">
        지금 시작해 볼까요?
      </Typography>
      <Typography color="text.secondary" align="center">
        계정이 있으시면 로그인하고,
        <br />
        처음이시라면 이메일 인증으로 가입해 주세요.
      </Typography>
      <Row>
        <Button variant="contained" size="large">
          로그인
        </Button>
        <TonalButton size="large">회원가입</TonalButton>
      </Row>
    </StateStack>
  ),
}
