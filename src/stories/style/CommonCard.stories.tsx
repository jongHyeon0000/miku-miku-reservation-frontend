import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import {
  ColumnCard,
  DetailList,
  MediaCard,
  Pill,
  ReceiptBox,
  SectionTitle,
  SpreadCard,
  ToggleRow,
  TotalDivider,
  UsageBar,
} from '@/app/common/style/CommonCard.style'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style'
import { TonalButton } from '@/app/common/style/CommonButton.style'
import { Row, SpreadRow } from '@/app/common/style/CommonLayout.style'
import { Panel, PanelBody } from '@/app/common/style/CommonList.style'
import { StateIcon, ThumbFrame } from '@/app/common/style/CommonMedia.style'
import { BoldText, LabelText, PriceText, ValueText } from '@/app/common/style/CommonText.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 카드를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/카드 [CommonCard.style.tsx]',
}

export default meta

type Story = StoryObj

/** 상품 상세의 설명 구역(figure/component/detail/FigureDetailDescription.tsx)과 상품 폼의 설명 구역. 구역 제목, 내용, 아래 작은 글자를 세로로 쌓는다 */
export const FigureDescriptionCard: Story = {
  name: '상품 > 상세 > 설명 구역',
  render: () => (
    <ColumnCard>
      <SectionTitle variant="h6" component="h3">
        설명
      </SectionTitle>
      <Typography>샘플 상품 설명입니다.</Typography>
      <Typography variant="caption" color="text.secondary">
        등록 2026-10-01 · 수정 2026-10-02
      </Typography>
    </ColumnCard>
  ),
}

/** 글 상세, 댓글, 글 쓰기, 마이페이지 정보와 탈퇴 구역(community/component/*, my-page/component/ProfileView.tsx, WithdrawForm.tsx). 제목 없이 내용만 세로로 쌓는다 */
export const ContentCard: Story = {
  name: '커뮤니티, 마이페이지 > 본문 > 내용 카드',
  render: () => (
    <ColumnCard>
      <Typography variant="h6">샘플 글 제목</Typography>
      <Typography color="text.secondary">샘플 본문 내용입니다.</Typography>
    </ColumnCard>
  ),
}

/** 상품 상세의 일정과 금액 구역(figure/component/detail/FigureDetailSchedule.tsx). 위는 날짜, 아래는 금액을 양 끝에 둔다 */
export const FigureScheduleCard: Story = {
  name: '상품 > 상세 > 일정과 금액 구역',
  render: () => (
    <SpreadCard>
      <Typography variant="mono">예약마감 2026-12-31</Typography>
      <Typography variant="mono" color="text.secondary">
        12,000원 × 2개
      </Typography>
    </SpreadCard>
  ),
}

/** 상품 상세의 썸네일 구역(figure/component/detail/FigureDetailThumbnail.tsx). 정사각형 틀 안에 이미지 자리, 위에 알약 배지 */
export const FigureThumbnailCard: Story = {
  name: '상품 > 상세 > 썸네일 구역',
  render: () => (
    <MediaCard>
      <ThumbFrame>
        <StateIcon size="lg">
          <ImageOutlinedIcon fontSize="inherit" color="disabled" />
        </StateIcon>
      </ThumbFrame>
    </MediaCard>
  ),
}

/** 상품 상세 썸네일의 상태, 결제 방식 배지(figure/component/detail/FigureDetailThumbnail.tsx)와 상품 분류 칩(figure/component/common/FigureCategoryChip.tsx)의 바탕. 색과 안쪽 여백은 쓰는 쪽이 정하므로 여기서는 바탕 모양만 보인다 */
export const BadgePill: Story = {
  name: '상품 > 상세, 폼 > 알약 바탕',
  render: () => <Pill>샘플 배지</Pill>,
}

/** 이번 기간 카드 견본의 공통 틀. open 이면 증감 합계와 지출을 펼친 모양, over 이면 예산을 넘긴 모양이다 */
const renderPeriodCard = (open: boolean, over: boolean) => (
  <Panel>
    <PanelTop>
      <PanelHeader>
        <SectionTitle variant="h6" component="h2">
          이번 기간
        </SectionTitle>
        <LabelText>2026.10.25 ~ 2026.11.24</LabelText>
      </PanelHeader>
    </PanelTop>
    <PanelBody>
    <SpreadRow>
      <BoldText>남은 돈</BoldText>
      {over && <BoldText color="error">예산 초과</BoldText>}
    </SpreadRow>
    <PriceText size="lg" negative={over}>
      {over ? '-19,000원' : '220,000원'}
    </PriceText>
    <SpreadRow>
      <LabelText>사용</LabelText>
      <LabelText>{over ? '111%' : '65%'}</LabelText>
    </SpreadRow>
    <UsageBar variant="determinate" value={over ? 100 : 65} color={over ? 'error' : 'primary'} />
    <ReceiptBox>
      <SpreadRow>
        <LabelText>기본 예산</LabelText>
        <ValueText>550,000원</ValueText>
      </SpreadRow>
      <ToggleRow aria-expanded={open}>
        <Row>
          <LabelText>증감 합계</LabelText>
          {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </Row>
        <ValueText>+70,000원</ValueText>
      </ToggleRow>
      {open && (
        <DetailList>
          <div>
            <Typography variant="caption" color="text.secondary">
              10/18
            </Typography>
            <SpreadRow>
              <ValueText>보너스</ValueText>
              <Typography variant="mono">+100,000원</Typography>
            </SpreadRow>
          </div>
          <div>
            <Typography variant="caption" color="text.secondary">
              10/20
            </Typography>
            <SpreadRow>
              <ValueText>경조사</ValueText>
              <Typography variant="mono">-30,000원</Typography>
            </SpreadRow>
          </div>
        </DetailList>
      )}
      <TotalDivider />
      <SpreadRow>
        <BoldText>총 예산</BoldText>
        <BoldText>620,000원</BoldText>
      </SpreadRow>
      <ToggleRow aria-expanded={open}>
        <Row>
          <LabelText>지출</LabelText>
          {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </Row>
        <ValueText>400,000원</ValueText>
      </ToggleRow>
      {open && (
        <DetailList>
          <div>
            <Row>
              <Typography variant="caption" color="text.secondary">
                11/02
              </Typography>
              <Typography variant="caption" color="text.secondary">
                전액
              </Typography>
            </Row>
            <SpreadRow>
              <ValueText>하츠네 미쿠 1/7 스케일</ValueText>
              <Typography variant="mono">220,000원</Typography>
            </SpreadRow>
          </div>
        </DetailList>
      )}
      <TotalDivider />
      <SpreadRow>
        <BoldText>남은 돈</BoldText>
        <BoldText color={over ? 'error' : 'primary'}>{over ? '-19,000원' : '220,000원'}</BoldText>
      </SpreadRow>
    </ReceiptBox>
    </PanelBody>
  </Panel>
)

/** 예산 관리 화면의 이번 기간 카드(budget/component/BudgetPeriodCard.tsx). 위에 남은 돈과 사용 막대, 아래 어두운 상자에 계산 내역을 영수증처럼 쌓는다(줄 끝의 화살표를 누르면 열림) */
export const BudgetPeriodCard: Story = {
  name: '예산 관리 > 오른쪽 > 이번 기간 카드',
  render: () => renderPeriodCard(false, false),
}

/** 증감 합계와 지출 줄을 눌러 내역을 펼친 이번 기간 카드. 펼친 줄은 왼쪽 세로선 아래로 들여써서 쌓고, 같은 줄을 다시 누르면 접힌다 */
export const BudgetPeriodCardOpen: Story = {
  name: '예산 관리 > 오른쪽 > 이번 기간 카드(내역 펼침)',
  render: () => renderPeriodCard(true, false),
}

/** 예산을 넘겨 쓴 이번 기간 카드. 남은 돈과 막대가 빨갛게 되고 "예산 초과"가 붙는다 */
export const BudgetPeriodCardOver: Story = {
  name: '예산 관리 > 오른쪽 > 이번 기간 카드(예산 초과)',
  render: () => renderPeriodCard(false, true),
}

/** 예산 관리 화면의 예산 설정 카드(budget/component/BudgetSettingCard.tsx). 제목, 이름표와 값 줄, 아래 안내 글자 */
export const BudgetSettingCard: Story = {
  name: '예산 관리 > 오른쪽 > 설정 카드',
  render: () => (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <SectionTitle variant="h6" component="h2">
            예산 설정
          </SectionTitle>
          <TonalButton size="small">수정</TonalButton>
        </PanelHeader>
      </PanelTop>
      <PanelBody>
      <SpreadRow>
        <LabelText>기간 시작일</LabelText>
        <ValueText>매월 25일</ValueText>
      </SpreadRow>
      <SpreadRow>
        <LabelText>기본 예산</LabelText>
        <ValueText>550,000원</ValueText>
      </SpreadRow>
      <Typography variant="caption" color="text.secondary">
        바꾼 값은 다음 기간부터 적용돼요. 이번 기간은 그대로예요.
      </Typography>
      </PanelBody>
    </Panel>
  ),
}
