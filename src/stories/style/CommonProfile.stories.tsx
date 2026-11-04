import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '@mui/material'
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style'
import { ProfilePopoverCard, ProfilePopoverHead } from '@/app/common/style/CommonProfile.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 프로필 모양을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/프로필 [CommonProfile.style.tsx]',
}

export default meta

type Story = StoryObj

/**
 * 프로필 팝오버(common/component/CommonProfilePopover.tsx)의 카드 면과 사진, 닉네임 줄. 상단 메뉴 내 사진과 커뮤니티 작성자가 같이 쓴다.
 * 세 칸(ProfileStat*)은 공통 컴포넌트 CommonProfileStats 가 쓰고, 견본은 그 컴포넌트 쪽에 있다
 */
export const ProfilePopoverCardHead: Story = {
  name: '상단 메뉴, 커뮤니티 > 프로필 팝오버 > 카드와 사진, 닉네임 줄',
  render: () => (
    <ProfilePopoverCard>
      <ProfilePopoverHead>
        <ThumbAvatar size="lg" />
        <Typography variant="h6" component="p">
          샘플 사용자
        </Typography>
      </ProfilePopoverHead>
    </ProfilePopoverCard>
  ),
}
