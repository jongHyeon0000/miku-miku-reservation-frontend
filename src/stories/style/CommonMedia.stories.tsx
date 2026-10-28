import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '@mui/material'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import { MediaCard } from '@/app/common/style/CommonCard.style'
import { Row } from '@/app/common/style/CommonLayout.style'
import { FillImage, StateIcon, ThumbAvatar, ThumbFrame } from '@/app/common/style/CommonMedia.style'
import { StateStack } from '@/app/common/style/CommonState.style'
import sampleImage from '@/assets/intro/figures/002.jpg'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 미디어 스타일을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/미디어 [CommonMedia.style.tsx]',
}

export default meta

type Story = StoryObj

/** 상품 상세 화면(figure/component/detail/FigureDetailThumbnail.tsx)의 썸네일 카드. 이미지가 있으면 칸을 채우고, 없으면 큰 이미지 아이콘 */
export const FigureDetailThumbnail: Story = {
  name: '상품 상세 > 좌측 > 썸네일 칸',
  render: () => (
    <>
      <MediaCard>
        <ThumbFrame>
          <FillImage src={sampleImage} alt="샘플 상품" />
        </ThumbFrame>
      </MediaCard>
      <MediaCard>
        <ThumbFrame>
          <StateIcon size="lg">
            <ImageOutlinedIcon fontSize="inherit" color="disabled" />
          </StateIcon>
        </ThumbFrame>
      </MediaCard>
    </>
  ),
}

/** 상품 목록(figure/component/list/FigureListComponent.tsx)과 소개 화면 롤링(intro/component/IntroHero.tsx)의 썸네일 칸. 이미지가 없으면 이미지 아이콘 */
export const FigureListThumbnail: Story = {
  name: '상품 목록 > 카드 > 썸네일 칸',
  render: () => (
    <MediaCard>
      <ThumbFrame>
        <ImageOutlinedIcon color="disabled" fontSize="large" />
      </ThumbFrame>
    </MediaCard>
  ),
}

/** 커뮤니티 댓글(community/component/comment/PostCommentItem.tsx, PostCommentFormImages.tsx)과 썸네일 올리기(common/component/ThumbnailUploader.tsx)의 이미지. 칸을 가득 채운다 */
export const FillImageOnly: Story = {
  name: '댓글, 썸네일 올리기 > 이미지 > 가득 채움',
  render: () => (
    <MediaCard>
      <FillImage src={sampleImage} alt="샘플 이미지" />
    </MediaCard>
  ),
}

/** 빈 목록 안내(common/component/EmptyView.tsx). 중간 크기 보조색 아이콘 */
export const EmptyState: Story = {
  name: '공통 안내 > 빈 화면 > 아이콘',
  render: () => (
    <StateStack>
      <StateIcon>
        <InboxOutlinedIcon fontSize="inherit" />
      </StateIcon>
      <Typography color="text.secondary">등록된 항목이 없어요</Typography>
    </StateStack>
  ),
}

/** 실패 안내(common/component/ErrorView.tsx). 중간 크기 아이콘을 오류 색으로 */
export const ErrorState: Story = {
  name: '공통 안내 > 실패 화면 > 아이콘',
  render: () => (
    <StateStack>
      <StateIcon>
        <ErrorOutlinedIcon fontSize="inherit" color="error" />
      </StateIcon>
      <Typography color="text.secondary">불러오지 못했어요</Typography>
    </StateStack>
  ),
}

/** 상단 메뉴 오른쪽 사진(common/component/GNB.tsx), 커뮤니티 글 상세 작성자(community/component/detail/PostDetailCard.tsx), 댓글(PostCommentItem.tsx, PostCommentForm.tsx). 작은 동그란 사진이고, 사진이 없으면 기본 사람 모양 */
export const SmallAvatar: Story = {
  name: '상단 메뉴, 커뮤니티 > 작성자 > 작은 사진',
  render: () => (
    <Row>
      <ThumbAvatar size="sm" src={sampleImage} />
      <ThumbAvatar size="sm" />
    </Row>
  ),
}

/** 상단 메뉴 판매처 패널(common/component/GnbShopPanel.tsx). 작은 둥근 모서리 사진, 없으면 이미지 아이콘 */
export const ShopPanelAvatar: Story = {
  name: '상단 메뉴 > 판매처 패널 > 작은 사진',
  render: () => (
    <Row>
      <ThumbAvatar size="sm" variant="rounded" src={sampleImage}>
        <ImageOutlinedIcon fontSize="small" />
      </ThumbAvatar>
      <ThumbAvatar size="sm" variant="rounded">
        <ImageOutlinedIcon fontSize="small" />
      </ThumbAvatar>
    </Row>
  ),
}

/** 분류 줄(category/common/component/CategoryRow.tsx)과 분류 칩(figure/component/common/FigureCategoryChip.tsx)의 중간 크기 둥근 모서리 사진 */
export const MediumAvatar: Story = {
  name: '카테고리 > 우측 > 중간 사진',
  render: () => (
    <Row>
      <ThumbAvatar size="md" variant="rounded" src={sampleImage}>
        <ImageOutlinedIcon />
      </ThumbAvatar>
      <ThumbAvatar size="md" variant="rounded">
        <ImageOutlinedIcon />
      </ThumbAvatar>
    </Row>
  ),
}

/** 상품 분류 선택 창(figure/component/form/FigurePickDialog.tsx)의 선택 카드 사진. 큰 크기 */
export const LargeAvatar: Story = {
  name: '상품 폼 > 분류 선택 창 > 큰 사진',
  render: () => (
    <Row>
      <ThumbAvatar size="lg" src={sampleImage}>
        <ImageOutlinedIcon />
      </ThumbAvatar>
      <ThumbAvatar size="lg">
        <ImageOutlinedIcon />
      </ThumbAvatar>
    </Row>
  ),
}
