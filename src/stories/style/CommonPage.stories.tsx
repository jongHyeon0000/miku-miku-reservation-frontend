import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Typography } from '@mui/material'
import { ColumnCard } from '@/app/common/style/CommonCard.style'
import { Row } from '@/app/common/style/CommonLayout.style'
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style'
import { StateStack } from '@/app/common/style/CommonState.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 페이지 틀을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/페이지 틀 [CommonPage.style]',
}

export default meta

type Story = StoryObj

/** 커뮤니티 목록(community/page/PostListPage.tsx), 마이페이지, 카테고리 화면의 제목 줄. 왼쪽 제목, 오른쪽 동작 버튼 */
export const ListPageHeader: Story = {
  name: '커뮤니티 목록 > 위 > 제목 줄',
  render: () => (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          커뮤니티
        </PageTitle>
        <Button variant="contained">글 쓰기</Button>
      </PageHeader>
    </PageContainer>
  ),
}

/** 상품 상세(figure/page/FigureDetailPage.tsx)의 제목 줄. 오른쪽에 버튼 여러 개를 한 줄로 */
export const DetailPageHeader: Story = {
  name: '상품 상세 > 위 > 제목 줄',
  render: () => (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          상품 상세
        </PageTitle>
        <Row>
          <Button variant="outlined" color="inherit">
            목록
          </Button>
          <Button variant="contained">수정</Button>
        </Row>
      </PageHeader>
    </PageContainer>
  ),
}

/** 찾을 수 없는 페이지(common/page/NotFoundPage.tsx). 바깥 틀 안에 안내 묶음 */
export const NotFound: Story = {
  name: '404 > 전체 > 바깥 틀',
  render: () => (
    <PageContainer>
      <StateStack>
        <Typography variant="h2" color="primary">
          404
        </Typography>
        <Typography color="text.secondary">찾을 수 없는 페이지예요.</Typography>
        <Button variant="contained">처음으로</Button>
      </StateStack>
    </PageContainer>
  ),
}

/** 커뮤니티 글 상세 카드(community/component/detail/PostDetailCard.tsx)의 글 제목. 카드 안에서 한 단계 작은 제목 */
export const PostDetailTitle: Story = {
  name: '커뮤니티 글 상세 > 카드 > 글 제목',
  render: () => (
    <ColumnCard>
      <PageTitle variant="h5" component="h1">
        샘플 글 제목
      </PageTitle>
    </ColumnCard>
  ),
}
