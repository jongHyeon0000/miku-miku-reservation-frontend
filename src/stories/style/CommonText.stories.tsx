import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '@mui/material'
import { motion } from 'motion/react'
import { ColumnCard, SpreadCard } from '@/app/common/style/CommonCard.style'
import { blinkAnimate, blinkTransition } from '@/app/common/style/CommonMotion.style'
import {
  BoldText,
  Highlight,
  LabelText,
  LabelValueGrid,
  LabelValueRow,
  PriceColumn,
  PriceText,
  ValueText,
} from '@/app/common/style/CommonText.style'
import { TonalButton } from '@/app/common/style/CommonButton.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 글자 스타일을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/글자 [CommonText.style.tsx]',
}

export default meta

type Story = StoryObj

/** 상품 목록 위 결과 요약(figure/component/list/FigureResultSummary.tsx). 개수와 금액을 포인트 색으로 */
export const ResultSummary: Story = {
  name: '상품 목록 > 위 > 결과 요약',
  render: () => (
    <Typography color="text.secondary" variant="body2">
      총 <Highlight>12</Highlight>개 표시 중 · 합계 <Highlight>1,234,000원</Highlight> · 구매액 <Highlight>560,000원</Highlight>
    </Typography>
  ),
}

/** 일괄 선택 도구줄(common/component/SelectBar.tsx)의 선택 개수. 소개 화면 장면 글(intro/component/*Scene.tsx)과 같은 모양으로 강조 */
export const SelectedCount: Story = {
  name: '목록 > 선택 도구줄 > 선택 개수',
  render: () => (
    <Typography color="text.secondary" variant="body2">
      <Highlight>3개</Highlight> 선택
    </Typography>
  ),
}

/** 아이디 찾기 결과(auth/component/FindIdResult.tsx). 흐린 이름표 아래 값을 강조 */
export const FindIdResult: Story = {
  name: '아이디 찾기 > 결과 > 이름표와 강조',
  render: () => (
    <Typography align="center">
      <LabelText>가입된 아이디는</LabelText>
      <br />
      <Highlight>miku39</Highlight>
    </Typography>
  ),
}

/** 상품 목록 카드(figure/component/list/FigureListComponent.tsx)의 이름 아래 장르, 형태 줄. 이름표와 값이 같은 세로선에서 시작한다 */
export const FigureCardInfo: Story = {
  name: '상품 목록 > 카드 > 장르, 형태',
  render: () => (
    <LabelValueGrid>
      <LabelText>장르</LabelText>
      <ValueText>보컬로이드 › 하츠네 미쿠</ValueText>
      <LabelText>형태</LabelText>
      <ValueText>스케일 › 1/7</ValueText>
    </LabelValueGrid>
  ),
}

/** 상품 목록 카드 오른쪽 칸(FigureListComponent.tsx, 마감 날짜는 figure/component/common/FigureDeadlineText.tsx). 예약마감일, 배송예정월 줄과 아래 가격. 마감이 임박하면 날짜가 깜빡인다 */
export const FigureCardStub: Story = {
  name: '상품 목록 > 카드 > 일정과 가격',
  render: () => (
    <>
      <LabelValueGrid>
        <LabelValueRow>
          <LabelText>예약마감일</LabelText>
          <motion.span animate={blinkAnimate} transition={blinkTransition}>
            2026.12.15
          </motion.span>
        </LabelValueRow>
        <LabelValueRow>
          <LabelText>배송예정월</LabelText>
          <ValueText>2027.03</ValueText>
        </LabelValueRow>
      </LabelValueGrid>
      <PriceColumn>
        <PriceText>180,000원</PriceText>
        <Typography variant="mono" color="text.secondary" noWrap>
          90,000원 × 2
        </Typography>
      </PriceColumn>
    </>
  ),
}

/** 상품 상세 일정과 금액(figure/component/detail/FigureDetailSchedule.tsx). 왼쪽 날짜 줄, 오른쪽 큰 총액과 내역 */
export const FigureDetailSchedule: Story = {
  name: '상품 상세 > 일정과 금액 > 날짜와 총액',
  render: () => (
    <SpreadCard>
      <LabelValueGrid>
        <LabelValueRow>
          <LabelText>예약마감</LabelText>
          <span>2026.12.15</span>
        </LabelValueRow>
        <LabelValueRow>
          <LabelText>배송예정월</LabelText>
          <span>2027.03</span>
        </LabelValueRow>
      </LabelValueGrid>
      <PriceColumn>
        <PriceText size="lg">180,000원</PriceText>
        <Typography variant="mono" color="text.secondary">
          90,000원 × 2개 · 예약금 20,000원
        </Typography>
      </PriceColumn>
    </SpreadCard>
  ),
}

/** 상품 폼 맨 아래 총액(figure/component/form/FigureFormSchedule.tsx). 위 작은 안내 글자와 큰 총액 */
export const FigureFormTotal: Story = {
  name: '상품 폼 > 일정과 금액 > 총액',
  render: () => (
    <SpreadCard>
      <span />
      <PriceColumn>
        <Typography variant="caption" color="text.secondary">
          총액 (자동 계산)
        </Typography>
        <PriceText size="lg">180,000원</PriceText>
      </PriceColumn>
    </SpreadCard>
  ),
}

/** 마이페이지 내 정보(my-page/component/ProfileView.tsx). 이름표와 값 네 줄이 한 그리드를 같이 쓴다 */
export const ProfileInfo: Story = {
  name: '마이페이지 > 내 정보 > 이름표와 값',
  render: () => (
    <ColumnCard>
      <LabelValueGrid>
        <LabelValueRow>
          <LabelText>아이디</LabelText>
          <ValueText>miku39</ValueText>
        </LabelValueRow>
        <LabelValueRow>
          <LabelText>이메일</LabelText>
          <ValueText>miku@example.com</ValueText>
        </LabelValueRow>
        <LabelValueRow>
          <LabelText>닉네임</LabelText>
          <ValueText>미쿠팬</ValueText>
        </LabelValueRow>
        <LabelValueRow>
          <LabelText>가입일</LabelText>
          <ValueText>2026.10.15</ValueText>
        </LabelValueRow>
      </LabelValueGrid>
      <TonalButton>비밀번호 변경</TonalButton>
    </ColumnCard>
  ),
}

/** 분류 줄의 이름(category/common/component/CategoryRow.tsx)과 커뮤니티 작성자 이름(community/component/common/PostAuthorLine.tsx). 굵은 글자 */
export const BoldName: Story = {
  name: '카테고리, 커뮤니티 > 줄 > 굵은 이름',
  render: () => <BoldText>샘플 이름</BoldText>,
}

/** 임박 상품 알림 창의 부제목(figure/component/list/FigureUrgentModal.tsx). 굵은 글자를 흐린 색으로 */
export const UrgentSubtitle: Story = {
  name: '임박 알림 창 > 위 > 부제목',
  render: () => <BoldText color="text.secondary">예약마감이 한 달 안으로 남은 상품이에요</BoldText>,
}
