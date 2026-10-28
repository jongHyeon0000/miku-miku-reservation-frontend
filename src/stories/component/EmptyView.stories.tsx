import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@mui/material'
import EmptyView from '@/app/common/component/EmptyView'

const handleNoop = () => {}

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 빈 화면을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof EmptyView> = {
  title: '공통 컴포넌트/빈 화면 [EmptyView]',
  component: EmptyView,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    message: { name: '문구' },
    /* 화면 조각(JSX)은 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    action: { name: '동작 칸', control: false },
  },
  args: {
    message: '등록된 항목이 없어요',
  },
}

export default meta

type Story = StoryObj<typeof EmptyView>

/** 카테고리 화면(축별 Content, src/app/category/{축}/page/)의 그룹이 하나도 없을 때. 아래에 그룹 추가 버튼 */
export const CategoryEmptyGroup: Story = {
  name: '카테고리 > 본문 > 그룹 없음',
  args: {
    message: '등록된 그룹이 없어요',
    action: (
      <Button variant="contained" onClick={handleNoop}>
        그룹 추가
      </Button>
    ),
  },
}

/** 상품 목록 화면(src/app/figure/page/FigureListPage.tsx)에 등록한 상품이 하나도 없을 때 */
export const FigureListEmpty: Story = {
  name: '상품 목록 > 본문 > 등록한 상품 없음',
  args: {
    message: '등록한 상품이 없어요',
    action: (
      <Button variant="contained" onClick={handleNoop}>
        상품 등록
      </Button>
    ),
  },
}

/** 상품 목록 화면에서 필터에 맞는 상품이 없을 때. 필터 초기화 버튼 */
export const FigureListNoMatch: Story = {
  name: '상품 목록 > 본문 > 조건에 맞는 상품 없음',
  args: {
    message: '조건에 맞는 상품이 없어요',
    action: <Button onClick={handleNoop}>필터 초기화</Button>,
  },
}

/** 커뮤니티 목록 화면(src/app/community/page/PostListPage.tsx)에 글이 하나도 없을 때 */
export const CommunityListEmpty: Story = {
  name: '커뮤니티 목록 > 본문 > 글 없음',
  args: {
    message: '아직 글이 없어요',
    action: (
      <Button variant="contained" onClick={handleNoop}>
        글 쓰기
      </Button>
    ),
  },
}

/** 글 상세의 댓글 영역(src/app/community/component/comment/PostCommentSection.tsx)과 템플릿 가져오기 창(src/app/category/template/component/TemplateImportDialog.tsx). 동작 칸 없음 */
export const MessageOnly: Story = {
  name: '글 상세 > 댓글 > 댓글 없음',
  args: {
    message: '아직 댓글이 없어요',
  },
}
