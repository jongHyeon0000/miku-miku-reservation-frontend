import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ThumbnailUploader from '@/app/common/component/ThumbnailUploader'
import type { ThumbnailChange } from '@/app/common/interface/ThumbnailChange'

const handleNoop = () => {}

interface ThumbnailUploaderDemoProps {
  currentUrl?: string | null
  disabled?: boolean
}

/**
 * 고른 변경 사항(value)은 부모(폼)가 들고 있으므로 견본 안에서 대신 들고 있는다.
 * 파일 선택, 끌어 놓기, 위치 조정은 직접 해 볼 수 있다. 서버에는 아무것도 보내지 않는다(올리기는 부모의 저장 버튼이 한다)
 */
const ThumbnailUploaderDemo = ({ currentUrl, disabled }: ThumbnailUploaderDemoProps) => {
  const [thumbnail, setThumbnail] = useState<ThumbnailChange>({ type: 'none' })

  return (
    <div>
      <ThumbnailUploader currentUrl={currentUrl} value={thumbnail} onChange={setThumbnail} disabled={disabled} />
    </div>
  )
}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 썸네일 올리기를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof ThumbnailUploader> = {
  title: '공통 컴포넌트/썸네일 올리기 [ThumbnailUploader.tsx]',
  component: ThumbnailUploader,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    currentUrl: { name: '서버의 썸네일 주소' },
    disabled: { name: '저장 중(막기)' },
    /* 변경 사항과 함수는 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    value: { name: '고른 변경 사항', control: false },
    onChange: { name: '변경 사항이 바뀌었을 때', control: false },
  },
  args: {
    currentUrl: null,
    disabled: false,
    value: { type: 'none' },
    onChange: handleNoop,
  },
  render: (args) => <ThumbnailUploaderDemo currentUrl={args.currentUrl} disabled={args.disabled} />,
}

export default meta

type Story = StoryObj<typeof ThumbnailUploader>

/** 카테고리 추가, 수정 창(src/app/category/{축}/component/{축}FormDialog.tsx)과 상품 폼(src/app/figure/page/FigureFormPage.tsx). 새로 등록할 때의 빈 틀. 눌러서 파일을 고르거나 끌어다 놓는다 */
export const FormEmpty: Story = {
  name: '카테고리, 상품 폼 > 썸네일 칸 > 빈 틀',
}

/** 마이페이지 내 정보(src/app/my-page/component/ProfileView.tsx)의 프로필 이미지. 저장 요청 중에는 막힌다 */
export const ProfileSaving: Story = {
  name: '마이페이지 > 내 정보 > 저장 중',
  args: {
    disabled: true,
  },
}
