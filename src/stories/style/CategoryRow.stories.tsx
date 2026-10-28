import type { Meta, StoryObj } from '@storybook/react-vite'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { IconButton, List, ListItemText, Typography } from '@mui/material'
import { ButtonGroup, Description, GroupButton, TextBox } from '@/app/category/common/style/CategoryRow.style'
import { RowBox } from '@/app/common/style/CommonList.style'
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style'
import { BoldText } from '@/app/common/style/CommonText.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 분류 줄 스타일을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '분류/줄 스타일 [CategoryRow.style]',
}

export default meta

type Story = StoryObj

/**
 * 분류 한 줄의 글 칸(src/app/category/common/component/CategoryRow.tsx).
 * 이름 아래에 설명을 한 줄로 보여 주고, 길면 …로 줄인다. 5개 축의 목록과 템플릿 목록이 같이 쓴다
 */
export const CategoryRowText: Story = {
  name: '카테고리 > 목록 > 이름과 설명 글 칸',
  render: () => (
    <RowBox>
      <ThumbAvatar size="md" variant="rounded">
        <ImageOutlinedIcon />
      </ThumbAvatar>
      <TextBox>
        <BoldText>샘플 분류</BoldText>
        <Description variant="caption" color="text.secondary">
          설명이 아주 길어지면 한 줄까지만 보이고 나머지는 말줄임표로 줄어들어요. 설명이 아주 길어지면 한 줄까지만 보이고 나머지는 말줄임표로 줄어들어요.
        </Description>
      </TextBox>
    </RowBox>
  ),
}

/**
 * 분류 줄 오른쪽의 수정, 삭제 버튼 묶음(src/app/category/shop/component/ShopChildRow.tsx 등 5개 축의 하위 줄).
 * 줄어들지 않고 버튼 사이 간격을 맡는다
 */
export const CategoryRowButtons: Story = {
  name: '카테고리 > 우측 > 수정 삭제 버튼 묶음',
  render: () => (
    <RowBox>
      <TextBox>
        <BoldText>샘플 분류</BoldText>
      </TextBox>
      <ButtonGroup>
        <IconButton size="small" aria-label="수정">
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" aria-label="삭제">
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </ButtonGroup>
    </RowBox>
  ),
}

/**
 * 카테고리 화면 왼쪽 상위 목록의 한 줄(src/app/category/shop/component/ShopGroupItem.tsx 등 4개 축).
 * 고른 상위는 포인트 색 글자와 한 단계 밝은 면으로 보인다
 */
export const CategoryGroupButton: Story = {
  name: '카테고리 > 좌측 > 상위 목록 줄',
  render: () => (
    <List disablePadding>
      <GroupButton selected>
        <ListItemText primary="고른 상위" />
        <Typography variant="caption" color="text.secondary">
          3
        </Typography>
      </GroupButton>
      <GroupButton>
        <ListItemText primary="고르지 않은 상위" />
        <Typography variant="caption" color="text.secondary">
          1
        </Typography>
      </GroupButton>
    </List>
  ),
}
