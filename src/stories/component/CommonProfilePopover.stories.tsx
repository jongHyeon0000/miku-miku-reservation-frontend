import { useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@mui/material'
import type { UserProfile } from '@/app/auth/interface/UserProfile'
import CommonProfilePopover from '@/app/common/component/CommonProfilePopover'
import ErrorView from '@/app/common/component/ErrorView'
import { TonalButton } from '@/app/common/style/CommonButton.style'
import { EndRow, Row } from '@/app/common/style/CommonLayout.style'

const handleNoop = () => {}

/** 견본에 쓰는 가짜 프로필 (프로필 이미지 없음) */
const SAMPLE_PROFILE: UserProfile = {
  userId: 30,
  name: '샘플 사용자',
  biography: '피규어 예약 장부 쓰는 사람입니다. 미쿠 위주로 모아요. 넨도, 피그마, 스케일 가리지 않습니다.',
  postCount: 37,
  commentCount: 40,
  createdAt: '2026-10-12T10:00:00',
}

interface ProfilePopoverDemoProps {
  align: 'left' | 'right'
  profile: UserProfile | null
  fallback?: ReactNode
  actions?: ReactNode
}

/**
 * 누른 자리(anchorEl)는 부모가 들고 있으므로 견본 안에서 대신 들고 있는다. "프로필 열기"를 누르면 그 아래에 뜬다
 */
const ProfilePopoverDemo = ({ align, profile, fallback, actions }: ProfilePopoverDemoProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const opener = <TonalButton onClick={(e) => setAnchorEl(e.currentTarget)}>프로필 열기</TonalButton>

  return (
    <>
      {align === 'right' ? <EndRow>{opener}</EndRow> : opener}
      <CommonProfilePopover
        anchorEl={anchorEl}
        align={align}
        onClose={() => setAnchorEl(null)}
        profile={profile}
        fallback={fallback}
        actions={actions}
      />
    </>
  )
}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 프로필 팝오버를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof CommonProfilePopover> = {
  title: '공통 컴포넌트/프로필 팝오버 [CommonProfilePopover.tsx]',
  component: CommonProfilePopover,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    align: { name: '맞출 쪽', control: 'radio', options: ['left', 'right'] },
    profile: { name: '프로필' },
    /* 누른 자리, 함수, 화면 조각은 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    anchorEl: { name: '누른 자리', control: false },
    onClose: { name: '닫을 때', control: false },
    fallback: { name: '읽기 실패 화면', control: false },
    actions: { name: '버튼 줄', control: false },
  },
  args: {
    anchorEl: null,
    onClose: handleNoop,
  },
  render: (args) => <ProfilePopoverDemo align={args.align} profile={args.profile} fallback={args.fallback} actions={args.actions} />,
}

export default meta

type Story = StoryObj<typeof CommonProfilePopover>

/** 상단 메뉴 오른쪽 내 사진(common/component/GNB.tsx). 사진 오른쪽 끝에 맞춰 뜨고, 버튼은 내 프로필 보기와 로그아웃 */
export const GnbMyProfile: Story = {
  name: '상단 메뉴 > 내 사진 > 프로필 팝오버',
  args: {
    align: 'right',
    profile: SAMPLE_PROFILE,
    actions: (
      <Row>
        <TonalButton fullWidth>내 프로필 보기</TonalButton>
        <Button variant="outlined" color="inherit" fullWidth>
          로그아웃
        </Button>
      </Row>
    ),
  },
}

/** 커뮤니티 글 상세와 댓글의 작성자(community/component/common/PostAuthorPopover.tsx). 누른 자리 왼쪽 끝에 맞춰 뜨고, 버튼은 프로필 보기 */
export const PostAuthorProfile: Story = {
  name: '커뮤니티 글 상세 > 작성자 > 프로필 팝오버',
  args: {
    align: 'left',
    profile: SAMPLE_PROFILE,
    actions: <TonalButton fullWidth>프로필 보기</TonalButton>,
  },
}

/** 커뮤니티 작성자의 프로필을 읽지 못했을 때(탈퇴한 사용자 등). 카드 안에 실패 화면 */
export const PostAuthorProfileFailed: Story = {
  name: '커뮤니티 글 상세 > 작성자 > 읽기 실패',
  args: {
    align: 'left',
    profile: null,
    fallback: <ErrorView message="사용자를 찾을 수 없습니다." onRetry={handleNoop} />,
  },
}
