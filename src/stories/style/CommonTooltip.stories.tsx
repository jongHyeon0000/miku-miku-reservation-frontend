import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, Typography } from '@mui/material'
import { InfoIcon, TooltipText } from '@/app/common/style/CommonTooltip.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. (i) 아이콘을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/툴팁 [CommonTooltip.style]',
}

export default meta

type Story = StoryObj

/** 분류 화면 오른쪽 패널 머리글의 그룹 이름 옆 (i) 아이콘(category/{축}/component/{축}CategoryTree.tsx). 올리면 그룹 설명이 오른쪽에 뜬다 */
export const CategoryGroupInfo: Story = {
  name: '카테고리 > 우측 > 그룹 이름 옆 설명 아이콘',
  render: () => (
    <Typography variant="h6">
      샘플 그룹
      <Tooltip title={<TooltipText>{'그룹 설명 첫째 줄입니다\n둘째 줄은 줄바꿈이 그대로 보입니다'}</TooltipText>} placement="right-start">
        <InfoIcon fontSize="inherit" />
      </Tooltip>
    </Typography>
  ),
}

/** 분류 하위 목록 줄의 이름 옆 (i) 아이콘(category/common/component/CategoryRow.tsx). 올리면 항목 설명이 오른쪽에 뜬다 */
export const CategoryRowInfo: Story = {
  name: '카테고리 > 우측 > 하위 줄 이름 옆 설명 아이콘',
  render: () => (
    <Typography>
      샘플 분류
      <Tooltip title={<TooltipText>{'분류 설명 한 줄입니다'}</TooltipText>} placement="right-start">
        <InfoIcon fontSize="inherit" />
      </Tooltip>
    </Typography>
  ),
}
