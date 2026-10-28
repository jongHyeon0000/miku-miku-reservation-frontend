import type { Meta, StoryObj } from '@storybook/react-vite'
import HtmlView from '@/app/common/component/HtmlView'

/** 에디터(Tiptap)가 저장하는 모양의 샘플 HTML. 정화(DOMPurify) 대상인 script 도 하나 넣어 두었고 화면에는 나오지 않는다 */
const SAMPLE_HTML =
  '<h2>상품 소개</h2><p>1/7 스케일 <strong>피규어</strong>입니다. <em>한정판</em> 특전이 포함돼요.</p><ul><li>높이 약 25cm</li><li>PVC, ABS 재질</li></ul><script>alert(1)</script>'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. HTML 보기를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof HtmlView> = {
  title: '공통 컴포넌트/HTML 보기 [HtmlView]',
  component: HtmlView,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    html: { name: 'HTML' },
  },
  args: {
    html: SAMPLE_HTML,
  },
}

export default meta

type Story = StoryObj<typeof HtmlView>

/** 상품 상세의 설명(src/app/figure/component/detail/FigureDetailDescription.tsx)과 커뮤니티 글 상세의 본문(src/app/community/component/detail/PostDetailCard.tsx). 같은 모양으로 쓰인다 */
export const DetailContent: Story = {
  name: '상품, 글 상세 > 본문 > 설명 HTML',
}
