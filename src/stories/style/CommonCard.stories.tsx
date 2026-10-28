import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { ColumnCard, MediaCard, Pill, SectionTitle, SpreadCard } from '@/app/common/style/CommonCard.style'
import { StateIcon, ThumbFrame } from '@/app/common/style/CommonMedia.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 카드를 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/카드 [CommonCard.style]',
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
