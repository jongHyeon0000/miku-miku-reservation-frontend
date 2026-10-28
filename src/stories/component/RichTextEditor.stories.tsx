import type { Meta, StoryObj } from '@storybook/react-vite'
import RichTextEditor from '@/app/common/component/RichTextEditor'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 글 편집기를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof RichTextEditor> = {
  title: '공통 컴포넌트/글 편집기 [RichTextEditor.tsx]',
  component: RichTextEditor,
  argTypes: {
    value: { name: '처음 내용(HTML)' },
    onChange: { name: '내용 바뀜', control: false },
    placeholder: { name: '안내 글' },
    disabled: { name: '고칠 수 없음' },
  },
  args: {
    value: '',
    onChange: () => undefined,
    placeholder: '내용을 입력해 주세요',
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof RichTextEditor>

/**
 * 상품 등록, 수정 화면의 설명 구역 (src/app/figure/component/form/FigureFormDescription.tsx). 비어 있는 상태.
 * 이미지 넣기(버튼, 끌어다 놓기, 붙여넣기)는 서버에 올리는 기능이라 견본에서는 동작하지 않는다.
 */
export const FigureFormEditorEmpty: Story = {
  name: '상품 폼 > 설명 구역 > 빈 편집기',
  args: {
    placeholder: '상품 설명을 입력해 주세요',
  },
}

/** 상품 수정 화면의 설명 구역. 저장된 설명이 채워진 상태. 이미지 올리기는 서버가 없어 동작하지 않는다 */
export const FigureFormEditorFilled: Story = {
  name: '상품 폼 > 설명 구역 > 내용 있는 편집기',
  args: {
    placeholder: '상품 설명을 입력해 주세요',
    value: '<h2>상품 설명</h2><p>예약 구매한 <strong>샘플 상품</strong>입니다.</p><ul><li>첫째 항목</li><li>둘째 항목</li></ul>',
  },
}

/** 상품 폼의 설명 구역에서 저장 요청 중인 상태. 도구줄은 보이지만 글을 고칠 수 없다 */
export const FigureFormEditorDisabled: Story = {
  name: '상품 폼 > 설명 구역 > 저장 중 편집기',
  args: {
    placeholder: '상품 설명을 입력해 주세요',
    value: '<p>저장 중에는 고칠 수 없는 내용입니다.</p>',
    disabled: true,
  },
}

/**
 * 커뮤니티 글 쓰기, 수정 화면의 내용 칸 (src/app/community/component/form/PostFormFields.tsx). 비어 있는 상태.
 * 이미지 올리기는 서버가 없어 동작하지 않는다.
 */
export const PostFormEditorEmpty: Story = {
  name: '커뮤니티 글 폼 > 내용 칸 > 빈 편집기',
  args: {
    placeholder: '내용을 입력해 주세요',
  },
}
