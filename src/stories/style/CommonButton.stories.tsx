import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Typography } from '@mui/material'
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style'
import { Row } from '@/app/common/style/CommonLayout.style'
import { Highlight } from '@/app/common/style/CommonText.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 버튼을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/버튼 [CommonButton.style.tsx]',
}

export default meta

type Story = StoryObj

/** 상품 상세(figure/page/FigureDetailPage.tsx)와 글 상세(community/page/PostDetailPage.tsx)의 맨 위 버튼 줄. 목록은 윤곽 버튼, 나머지는 은은한 버튼 */
export const FigureDetailButtons: Story = {
  name: '상품 > 상세 > 상단 버튼 줄',
  render: () => (
    <Row>
      <Button variant="outlined" color="inherit">
        목록
      </Button>
      <TonalButton>상태 변경</TonalButton>
      <TonalButton>수정</TonalButton>
      <TonalDangerButton>삭제</TonalDangerButton>
    </Row>
  ),
}

/** 분류 화면 왼쪽 그룹 패널 머리글의 추가 버튼(category/{축}/component/{축}CategoryTree.tsx, 제조사 포함). 작고 꽉 찬 모양(contained) */
export const CategoryGroupAddButton: Story = {
  name: '카테고리 > 좌측 > 그룹 추가 버튼',
  render: () => (
    <TonalButton size="small" variant="contained" disableElevation>
      추가
    </TonalButton>
  ),
}

/** 분류 화면 오른쪽 패널 머리글의 그룹 수정, 삭제 버튼(category/{축}/component/{축}CategoryTree.tsx) */
export const CategoryGroupEditButtons: Story = {
  name: '카테고리 > 우측 > 그룹 수정, 삭제 버튼',
  render: () => (
    <Row>
      <TonalButton size="small">그룹 수정</TonalButton>
      <TonalDangerButton size="small">그룹 삭제</TonalDangerButton>
    </Row>
  ),
}

/** 모든 창(분류 폼 창, 템플릿 창, 상품 상태 창, 비밀번호 변경 창 등)의 아래쪽 닫기, 취소 버튼 */
export const DialogCloseButton: Story = {
  name: '창 > 하단 > 닫기 버튼',
  render: () => <TonalButton>닫기</TonalButton>,
}

/** 템플릿 가져오기 창 목록 줄의 작은 가져오기 버튼(category/template/component/TemplateImportDialog.tsx)과 회원가입의 인증 코드 받기, 확인 버튼(auth/component/SignupForm.tsx) */
export const SmallActionButton: Story = {
  name: '템플릿 창, 회원가입 > 줄 안 > 작은 버튼',
  render: () => <TonalButton size="small">코드 받기</TonalButton>,
}

/** 소개 마지막 장면의 시작 버튼 줄(welcome-intro/component/WelcomeIntroStartScene.tsx). 로그인은 꽉 찬 버튼, 회원가입은 은은한 큰 버튼 */
export const IntroStartButtons: Story = {
  name: '소개 > 시작 장면 > 로그인, 회원가입 버튼',
  render: () => (
    <Row>
      <Button variant="contained" size="large">
        로그인
      </Button>
      <TonalButton size="large">회원가입</TonalButton>
    </Row>
  ),
}

/** 마이페이지 탈퇴 탭의 탈퇴 버튼(my-page/component/WithdrawForm.tsx) */
export const WithdrawButton: Story = {
  name: '마이페이지 > 탈퇴 > 탈퇴 버튼',
  render: () => <TonalDangerButton type="button">탈퇴하기</TonalDangerButton>,
}

/** 선택 모드 도구줄(common/component/SelectBar.tsx). 동작 버튼이 삭제처럼 위험한 동작이면 붉은 버튼, 아니면 은은한 버튼 */
export const SelectBarButtons: Story = {
  name: '상품, 카테고리 > 선택 모드 > 도구줄 동작 버튼',
  render: () => (
    <Row>
      <Typography color="text.secondary" variant="body2">
        <Highlight>3개</Highlight> 선택
      </Typography>
      <Button>전체 선택</Button>
      <TonalDangerButton>삭제</TonalDangerButton>
      <TonalButton>상태 변경</TonalButton>
      <Button>취소</Button>
    </Row>
  ),
}
