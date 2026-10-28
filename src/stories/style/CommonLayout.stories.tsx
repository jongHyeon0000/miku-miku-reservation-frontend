import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Link, Typography } from '@mui/material'
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style'
import { ColumnCard, MediaCard, SpreadCard } from '@/app/common/style/CommonCard.style'
import { EndRow, Row, SideColumn, SpreadRow, SplitLayout } from '@/app/common/style/CommonLayout.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 배치 틀을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/배치 [CommonLayout.style.tsx]',
}

export default meta

type Story = StoryObj

/** 상품 상세 맨 위 버튼 줄(figure/page/FigureDetailPage.tsx). 같은 가로 줄 안에 버튼을 같은 간격으로 놓는다 */
export const RowButtons: Story = {
  name: '상품 > 상세 > 상단 버튼 줄',
  render: () => (
    <Row>
      <Button variant="outlined" color="inherit">
        목록
      </Button>
      <TonalButton>수정</TonalButton>
      <TonalDangerButton>삭제</TonalDangerButton>
    </Row>
  ),
}

/** 상품 등록, 수정 폼의 취소, 등록 버튼 묶음(figure/component/form/FigureFormActions.tsx) */
export const RowFormActions: Story = {
  name: '상품 > 폼 > 취소, 등록 버튼 묶음',
  render: () => (
    <Row>
      <Button variant="outlined" color="inherit">
        취소
      </Button>
      <Button variant="contained">등록</Button>
    </Row>
  ),
}

/** 이메일 인증 단계 맨 아래(auth/component/EmailCodeStep.tsx). 왼쪽은 처음으로 링크, 오른쪽은 코드 다시 받기 링크 */
export const SpreadLinks: Story = {
  name: '인증 > 이메일 코드 > 아래 링크 줄',
  render: () => (
    <SpreadRow>
      <Link component="button" type="button">
        이메일 다시 입력
      </Link>
      <Link component="button" type="button">
        코드 다시 받기
      </Link>
    </SpreadRow>
  ),
}

/** 상품 목록의 필터 줄(figure/component/filter/FigureFilterBar.tsx). 왼쪽에 분류 필터 묶음, 오른쪽에 배송월과 초기화 */
export const SpreadFilterBar: Story = {
  name: '상품 > 목록 > 필터 줄',
  render: () => (
    <SpreadRow>
      <Row>
        <Button variant="outlined" color="inherit">
          형태
        </Button>
        <Button variant="outlined" color="inherit">
          판매처
        </Button>
      </Row>
      <Row>
        <Button variant="outlined" color="inherit">
          배송월
        </Button>
        <Button>초기화</Button>
      </Row>
    </SpreadRow>
  ),
}

/** 상품 등록 폼(figure/page/FigureFormPage.tsx)과 글 쓰기 폼(community/page/PostFormPage.tsx)의 맨 아래 버튼 줄 */
export const EndFormActions: Story = {
  name: '상품, 커뮤니티 > 폼 > 맨 아래 버튼 줄',
  render: () => (
    <EndRow>
      <Row>
        <Button variant="outlined" color="inherit">
          취소
        </Button>
        <Button variant="contained">등록</Button>
      </Row>
    </EndRow>
  ),
}

/** 마이페이지 프로필 카드 맨 아래 저장 버튼(my-page/component/ProfileView.tsx) */
export const EndSaveButton: Story = {
  name: '마이페이지 > 내 정보 > 저장 버튼 줄',
  render: () => (
    <EndRow>
      <Button variant="contained">저장</Button>
    </EndRow>
  ),
}

/** 상품 상세(figure/page/FigureDetailPage.tsx)와 상품 폼(figure/page/FigureFormPage.tsx). 왼쪽 정보 카드, 오른쪽에 썸네일 카드와 일정 카드가 세로로 쌓인다 */
export const SplitWithSideColumn: Story = {
  name: '상품 > 상세, 폼 > 2열 배치와 오른쪽 열',
  render: () => (
    <SplitLayout>
      <ColumnCard>
        <Typography>상품 정보 구역</Typography>
      </ColumnCard>
      <SideColumn>
        <MediaCard>
          <Typography>썸네일 구역</Typography>
        </MediaCard>
        <SpreadCard>
          <Typography>일정 구역</Typography>
        </SpreadCard>
      </SideColumn>
    </SplitLayout>
  ),
}

/** 마이페이지 내 정보 탭(my-page/component/ProfileView.tsx). 왼쪽 정보 카드, 오른쪽 프로필 이미지 카드(오른쪽 열 틀은 쓰지 않는다) */
export const SplitProfile: Story = {
  name: '마이페이지 > 내 정보 > 2열 배치',
  render: () => (
    <SplitLayout>
      <ColumnCard>
        <Typography>내 정보 구역</Typography>
      </ColumnCard>
      <MediaCard>
        <Typography>프로필 이미지 구역</Typography>
      </MediaCard>
    </SplitLayout>
  ),
}
