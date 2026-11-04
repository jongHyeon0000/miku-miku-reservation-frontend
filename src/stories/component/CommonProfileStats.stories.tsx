import type { Meta, StoryObj } from '@storybook/react-vite'
import type { UserProfile } from '@/app/auth/interface/UserProfile'
import CommonProfileStats from '@/app/common/component/CommonProfileStats'

/** 견본에 쓰는 가짜 프로필 */
const SAMPLE_PROFILE: UserProfile = {
  userId: 30,
  name: '샘플 사용자',
  postCount: 37,
  commentCount: 40,
  createdAt: '2026-10-12T10:00:00',
}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 프로필 세 칸을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof CommonProfileStats> = {
  title: '공통 컴포넌트/프로필 세 칸 [CommonProfileStats.tsx]',
  component: CommonProfileStats,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    profile: { name: '프로필' },
    size: { name: '크기', control: 'radio', options: ['md', 'lg'] },
  },
  args: {
    profile: SAMPLE_PROFILE,
  },
}

export default meta

type Story = StoryObj<typeof CommonProfileStats>

/** 마이페이지와 타인 프로필의 프로필 머리(my-page/component/ProfileHeader.tsx). 글, 댓글, 가입 세 칸. 큰 크기 */
export const ProfileHeaderStats: Story = {
  name: '마이페이지, 타인 프로필 > 프로필 머리 > 세 칸',
  args: {
    size: 'lg',
  },
}

/** 프로필 팝오버(common/component/CommonProfilePopover.tsx)의 세 칸. 상단 메뉴 내 사진과 커뮤니티 작성자가 같이 쓴다. 작은 크기 */
export const ProfilePopoverStats: Story = {
  name: '상단 메뉴, 커뮤니티 > 프로필 팝오버 > 세 칸',
  args: {
    size: 'md',
  },
}
