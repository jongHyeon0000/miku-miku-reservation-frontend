import type { Preview } from '@storybook/react-vite'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MotionConfig } from 'motion/react'
import { MemoryRouter } from 'react-router-dom'
import 'dayjs/locale/ko'
import theme from '@/config/theme/theme'

/** 서버 호출 없이 모양만 보여 주므로 실패해도 다시 시도하지 않는다 */
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

/** 앱의 main.tsx 와 같은 틀(테마, 서버 데이터 보관, 날짜, 모션)과 화면 이동 틀을 모든 견본에 씌운다 */
const preview: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <MotionConfig reducedMotion="user">
              <MemoryRouter>
                <Story />
              </MemoryRouter>
            </MotionConfig>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
  },
}

export default preview
