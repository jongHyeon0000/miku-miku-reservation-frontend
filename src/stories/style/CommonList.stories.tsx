import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Button, Typography } from '@mui/material'
import PageNumbers from '@/app/common/component/PageNumbers'
import { TonalButton } from '@/app/common/style/CommonButton.style'
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style'
import { Row } from '@/app/common/style/CommonLayout.style'
import { AddRow, PagerRow, Panel, RowBox, SelectCheck } from '@/app/common/style/CommonList.style'
import { BoldText, LabelText } from '@/app/common/style/CommonText.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 목록 틀을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/목록 [CommonList.style.tsx]',
}

export default meta

type Story = StoryObj

/** 분류 화면 오른쪽 하위 목록(category/{축}/component/{축}CategoryTree.tsx). 패널 안에 줄들(줄무늬), 쪽 번호 칸, 아래 추가 칸이 차례로 붙는다. 줄들은 줄만 담는 상자 안에 둔다 */
export const CategoryChildPanel: Story = {
  name: '카테고리 > 우측 > 하위 목록 패널',
  render: () => (
    <Panel>
      <Box>
        <RowBox>
          <Typography>샘플 분류 하나</Typography>
        </RowBox>
        <RowBox>
          <Typography>샘플 분류 둘</Typography>
        </RowBox>
        <RowBox>
          <Typography>샘플 분류 셋</Typography>
        </RowBox>
      </Box>
      <PagerRow>
        <PageNumbers page={1} totalPages={3} onChange={() => undefined} />
      </PagerRow>
      <AddRow>
        <Row>
          <Button variant="outlined" size="small">
            하위 추가
          </Button>
          <Button variant="outlined" size="small" color="error">
            일괄 삭제
          </Button>
        </Row>
      </AddRow>
    </Panel>
  ),
}

/** 분류 화면 하위 목록의 일괄 삭제 선택 모드(category/{축}/component/{축}ChildRow.tsx). 줄 왼쪽에 체크칸이 생기고, 아래 칸이 선택 도구줄로 바뀐다 */
export const CategorySelectPanel: Story = {
  name: '카테고리 > 우측 > 선택 모드',
  render: () => (
    <Panel>
      <Box>
        <RowBox>
          <Row>
            <SelectCheck checked />
            <Typography>샘플 분류 하나</Typography>
          </Row>
        </RowBox>
        <RowBox>
          <Row>
            <SelectCheck />
            <Typography>샘플 분류 둘</Typography>
          </Row>
        </RowBox>
      </Box>
      <AddRow>
        <Row>
          <Typography color="text.secondary" variant="body2">
            1개 선택
          </Typography>
          <Button>전체 선택</Button>
          <TonalButton>삭제</TonalButton>
          <Button>취소</Button>
        </Row>
      </AddRow>
    </Panel>
  ),
}

/** 상품 목록의 선택 모드 체크칸(figure/component/list/FigureListComponent.tsx). 카드 옆에 체크칸이 세로 가운데로 붙는다 */
export const FigureSelectCheck: Story = {
  name: '상품 > 목록 > 선택 체크칸',
  render: () => (
    <Row>
      <SelectCheck />
      <Typography>샘플 상품 카드</Typography>
    </Row>
  ),
}

/** 템플릿 가져오기 창의 템플릿 목록(category/template/component/TemplateImportDialog.tsx). 패널 안에 줄들, 오른쪽에 개수와 가져오기 버튼 */
export const TemplatePanel: Story = {
  name: '템플릿 창 > 목록 > 템플릿 패널',
  render: () => (
    <Panel>
      <Box>
        <RowBox>
          <Typography>샘플 템플릿 하나</Typography>
          <Row>
            <Typography variant="mono" color="text.secondary" noWrap>
              12개
            </Typography>
            <TonalButton size="small">가져오기</TonalButton>
          </Row>
        </RowBox>
        <RowBox>
          <Typography>샘플 템플릿 둘</Typography>
          <Row>
            <Typography variant="mono" color="text.secondary" noWrap>
              8개
            </Typography>
            <TonalButton size="small">가져오기</TonalButton>
          </Row>
        </RowBox>
      </Box>
    </Panel>
  ),
}

/** 커뮤니티 글 목록(community/component/list/PostListTable.tsx). 패널 안에 글 줄들, 아래에 쪽 번호 칸 */
export const PostListPanel: Story = {
  name: '커뮤니티 > 목록 > 글 목록 패널',
  render: () => (
    <Panel>
      <Box>
        <RowBox>
          <Typography>샘플 글 제목 하나</Typography>
          <Typography variant="body2" color="text.secondary">
            샘플 작성자
          </Typography>
        </RowBox>
        <RowBox>
          <Typography>샘플 글 제목 둘</Typography>
          <Typography variant="body2" color="text.secondary">
            샘플 작성자
          </Typography>
        </RowBox>
      </Box>
      <PagerRow>
        <PageNumbers page={1} totalPages={3} onChange={() => undefined} />
      </PagerRow>
    </Panel>
  ),
}

/** 예산 관리 화면의 증감 내역 패널(budget/component/BudgetAdjustPanel.tsx). 금색 밑줄 제목 아래에 날짜, 메모, 금액 줄. 빼는 금액은 빨간 글자 */
export const BudgetAdjustPanel: Story = {
  name: '예산 관리 > 왼쪽 > 증감 내역 패널',
  render: () => (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <Typography variant="h6">증감 내역</Typography>
          <LabelText>2건</LabelText>
        </PanelHeader>
      </PanelTop>
      <Box>
        <RowBox>
          <Row>
            <LabelText>10/20</LabelText>
            <BoldText>경조사</BoldText>
          </Row>
          <Typography variant="mono" color="error">
            -30,000원
          </Typography>
        </RowBox>
        <RowBox>
          <Row>
            <LabelText>10/18</LabelText>
            <BoldText>보너스</BoldText>
          </Row>
          <Typography variant="mono">+100,000원</Typography>
        </RowBox>
      </Box>
    </Panel>
  ),
}

/** 예산 관리 화면의 지출 내역 패널(budget/component/BudgetSpendingPanel.tsx). 제목 옆에 건수와 합계, 줄마다 날짜, 지출 종류, 상품명, 금액 */
export const BudgetSpendingPanel: Story = {
  name: '예산 관리 > 왼쪽 > 지출 내역 패널',
  render: () => (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <Typography variant="h6">지출 내역</Typography>
          <LabelText>2건 · 300,000원</LabelText>
        </PanelHeader>
      </PanelTop>
      <Box>
        <RowBox>
          <Row>
            <LabelText>11/02</LabelText>
            <LabelText>전액</LabelText>
            <Typography>하츠네 미쿠 1/7 스케일</Typography>
          </Row>
          <Typography variant="mono">220,000원</Typography>
        </RowBox>
        <RowBox>
          <Row>
            <LabelText>10/30</LabelText>
            <LabelText>예약금</LabelText>
            <Typography>카가미네 린 넨도로이드</Typography>
          </Row>
          <Typography variant="mono">80,000원</Typography>
        </RowBox>
      </Box>
    </Panel>
  ),
}
