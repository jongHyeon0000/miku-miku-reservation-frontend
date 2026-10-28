import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import GlobalSnackbar from '@/app/common/component/GlobalSnackbar'
import { useUiStore } from '@/store/uiStore'

/** 알림 스낵바는 uiStore 를 구독하므로, 견본을 그리기 전에 store 에 알림을 띄워 둔 상태로 만든다 */
const withSnackbar = (message: string, severity: 'success' | 'warning' | 'error'): Decorator => {
  const decorator: Decorator = (Story) => {
    useUiStore.setState({ snackbarOpen: true, snackbarMessage: message, snackbarSeverity: severity })

    return <Story />
  }

  return decorator
}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 알림 스낵바를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof GlobalSnackbar> = {
  title: '공통 컴포넌트/알림 스낵바 [GlobalSnackbar.tsx]',
  component: GlobalSnackbar,
}

export default meta

type Story = StoryObj<typeof GlobalSnackbar>

/** 앱 전체(src/App.tsx 루트)의 화면 아래 가운데 알림. 저장, 삭제 같은 서버 요청이 성공했을 때. 3초 뒤 닫힌다 */
export const SnackbarSuccess: Story = {
  name: '앱 전체 > 화면 아래 > 성공 알림',
  decorators: [withSnackbar('저장이 완료되었습니다.', 'success')],
}

/** 앱 전체(src/App.tsx 루트)의 화면 아래 가운데 알림. 입력을 고치면 되는 문제(중복 이름, 잘못된 요청 등). 읽을 시간이 필요해 5초 뒤 닫힌다 */
export const SnackbarWarning: Story = {
  name: '앱 전체 > 화면 아래 > 경고 알림',
  decorators: [withSnackbar('이미 사용 중인 이름입니다.', 'warning')],
}

/** 앱 전체(src/App.tsx 루트)의 화면 아래 가운데 알림. 서버 오류 같은 나머지 실패. 5초 뒤 닫힌다 */
export const SnackbarError: Story = {
  name: '앱 전체 > 화면 아래 > 오류 알림',
  decorators: [withSnackbar('서버에 문제가 생겼습니다. 잠시 뒤 다시 시도해 주세요.', 'error')],
}
