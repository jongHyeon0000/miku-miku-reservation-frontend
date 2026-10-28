import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, DialogContent, DialogTitle, Paper, TextField, ToggleButton } from '@mui/material'
import { TonalButton } from '@/app/common/style/CommonButton.style'
import { DialogFieldStack, DialogFormBody, EqualToggleGroup, FieldStack, FormActions, FormBody } from '@/app/common/style/CommonForm.style'
import { EndRow } from '@/app/common/style/CommonLayout.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 폼 스타일을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/폼 [CommonForm.style.tsx]',
}

export default meta

type Story = StoryObj

/** 로그인(auth/component/LoginForm.tsx) 등 인증 폼, 상품 폼, 글 쓰기, 탈퇴 폼의 본체. 입력칸을 세로로 쌓는다 */
export const AuthForm: Story = {
  name: '로그인 > 폼 > 입력칸 쌓기',
  render: () => (
    <FormBody noValidate>
      <TextField label="아이디" />
      <TextField label="비밀번호" type="password" />
      <Button type="submit" variant="contained" size="large">
        로그인
      </Button>
    </FormBody>
  ),
}

/** 분류 폼 창(category/shop/component/ShopFormDialog.tsx 등 5개 축), 마이페이지 비밀번호 변경 창, 상품 상태 전이 창(figure/component/common/FigureStatusModal.tsx). 제목, 내용, 버튼 줄이 MUI 기본 간격으로 붙는다 */
export const FormDialog: Story = {
  name: '모달 > 폼 > 제목, 내용, 버튼 줄',
  render: () => (
    <Paper>
      <DialogFormBody noValidate>
        <DialogTitle>비밀번호 변경</DialogTitle>
        <DialogContent>
          <DialogFieldStack>
            <TextField label="현재 비밀번호" type="password" />
            <TextField label="새 비밀번호" type="password" />
          </DialogFieldStack>
        </DialogContent>
        <FormActions>
          <TonalButton>닫기</TonalButton>
          <Button type="submit" variant="contained">
            변경
          </Button>
        </FormActions>
      </DialogFormBody>
    </Paper>
  ),
}

/** 템플릿 가져오기 창(category/template/component/TemplateImportDialog.tsx)과 확인 창(TemplateImportConfirmDialog.tsx), 상품 분류 선택 창(figure/component/form/FigurePickDialog.tsx)의 버튼 줄 */
export const DialogActionsOnly: Story = {
  name: '템플릿 창 > 아래 > 버튼 줄',
  render: () => (
    <Paper>
      <DialogContent>
        <DialogFieldStack>
          <TextField label="검색어" />
        </DialogFieldStack>
      </DialogContent>
      <FormActions>
        <TonalButton>닫기</TonalButton>
      </FormActions>
    </Paper>
  ),
}

/** 로그인 아래 보조 영역(auth/page/LoginPage.tsx), 아이디 찾기 결과(auth/component/FindIdResult.tsx), 마이페이지 프로필 이미지 카드(my-page/component/ProfileView.tsx)처럼 폼 밖에서 칸을 세로로 쌓는 곳 */
export const FieldStackBasic: Story = {
  name: '마이페이지 > 프로필 > 칸 쌓기',
  render: () => (
    <FieldStack>
      <TextField label="닉네임" />
      <EndRow>
        <Button variant="contained">저장</Button>
      </EndRow>
    </FieldStack>
  ),
}

/** 상품 폼의 상태 고르기(figure/component/form/FigureFormInfo.tsx)와 상태 전이 창(figure/component/common/FigureStatusModal.tsx). 글자가 달라도 버튼이 같은 폭이다 */
export const StatusToggle: Story = {
  name: '상품 폼 > 이름 줄 > 상태 토글',
  render: () => (
    <EqualToggleGroup exclusive color="primary" value="UNPURCHASED">
      <ToggleButton value="CART">장바구니</ToggleButton>
      <ToggleButton value="UNPURCHASED">미구매</ToggleButton>
    </EqualToggleGroup>
  ),
}

/** 상품 상태 전이 창의 전체 폭 토글(figure/component/common/FigureStatusModal.tsx). 다음 상태가 둘 이상일 때 고른다 */
export const StatusModalToggle: Story = {
  name: '상태 전이 창 > 내용 > 다음 상태 토글',
  render: () => (
    <EqualToggleGroup exclusive fullWidth value="RESERVED">
      <ToggleButton value="RESERVED">예약완료</ToggleButton>
      <ToggleButton value="PURCHASED">구매완료</ToggleButton>
    </EqualToggleGroup>
  ),
}
