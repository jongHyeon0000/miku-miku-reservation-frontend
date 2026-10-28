import type { Meta, StoryObj } from '@storybook/react-vite'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Box, List, ListItemText, Typography } from '@mui/material'
import CategoryRow from '@/app/category/common/component/CategoryRow'
import { AddButton, BulkDeleteButton, PanelHeader, PanelTop, TreeLayout } from '@/app/category/common/style/CategoryPanel.style'
import { GroupButton } from '@/app/category/common/style/CategoryRow.style'
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style'
import { Row } from '@/app/common/style/CommonLayout.style'
import { AddRow, Panel } from '@/app/common/style/CommonList.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 분류 패널을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '분류/패널 스타일 [CategoryPanel.style.tsx]',
}

export default meta

type Story = StoryObj

/**
 * 카테고리 화면의 상위, 하위 두 칸 목록(판매처, 형태, 시리즈, 장르·캐릭터 공통.
 * 예: src/app/category/shop/component/ShopCategoryTree.tsx). 왼쪽은 상위 목록, 오른쪽은 고른 상위의 하위 목록과 맨 아래 점선 칸(하위 추가, 일괄 삭제)
 */
export const CategoryTwoPanelTree: Story = {
  name: '카테고리 > 목록 > 상위와 하위 두 칸',
  render: () => (
    <TreeLayout>
      <Panel>
        <PanelTop>
          <PanelHeader>
            <Typography variant="h6">그룹</Typography>
            <TonalButton size="small" variant="contained" disableElevation>
              추가
            </TonalButton>
          </PanelHeader>
        </PanelTop>
        <List disablePadding>
          <GroupButton selected>
            <ListItemText primary="샘플 그룹 하나" />
            <Typography variant="caption" color="text.secondary">
              2
            </Typography>
          </GroupButton>
          <GroupButton>
            <ListItemText primary="샘플 그룹 둘" />
            <Typography variant="caption" color="text.secondary">
              1
            </Typography>
          </GroupButton>
        </List>
      </Panel>

      <Panel>
        <PanelTop>
          <PanelHeader>
            <Typography variant="h6">샘플 그룹 하나</Typography>
            <Row>
              <TonalButton size="small">그룹 수정</TonalButton>
              <TonalDangerButton size="small">그룹 삭제</TonalDangerButton>
            </Row>
          </PanelHeader>
        </PanelTop>
        <Box>
          <CategoryRow name="샘플 하위 하나" description="분류 설명 한 줄입니다" />
          <CategoryRow name="샘플 하위 둘" />
        </Box>
        <AddRow>
          <Row>
            <AddButton variant="outlined" size="small" startIcon={<AddOutlinedIcon />}>
              하위 추가
            </AddButton>
            <BulkDeleteButton variant="outlined" size="small" color="error">
              일괄 삭제
            </BulkDeleteButton>
          </Row>
        </AddRow>
      </Panel>
    </TreeLayout>
  ),
}

/**
 * 카테고리 화면의 제조사 목록(src/app/category/maker/component/MakerCategoryTree.tsx).
 * 상위가 없는 축이라 패널 한 칸이고, 맨 아래 점선 칸에는 일괄 삭제만 있다
 */
export const CategorySinglePanel: Story = {
  name: '카테고리 > 제조사 > 목록 한 칸',
  render: () => (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <Typography variant="h6">제조사 목록</Typography>
          <TonalButton size="small" variant="contained" disableElevation>
            제조사 추가
          </TonalButton>
        </PanelHeader>
      </PanelTop>
      <Box>
        <CategoryRow name="샘플 제조사 하나" description="분류 설명 한 줄입니다" />
        <CategoryRow name="샘플 제조사 둘" />
      </Box>
      <AddRow>
        <BulkDeleteButton variant="outlined" size="small" color="error">
          일괄 삭제
        </BulkDeleteButton>
      </AddRow>
    </Panel>
  ),
}

/**
 * 템플릿 가져오기 확인 창(src/app/category/template/component/TemplateImportConfirmDialog.tsx)의 제외 항목 묶음.
 * 상위 그룹 이름이 패널 맨 위 칸에 오고 그 아래에 줄이 이어진다
 */
export const TemplateExcludedPanel: Story = {
  name: '템플릿 확인 창 > 제외 항목 > 그룹 머리말',
  render: () => (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <Typography variant="h6">샘플 그룹</Typography>
        </PanelHeader>
      </PanelTop>
      <CategoryRow name="샘플 제외 항목 하나" />
      <CategoryRow name="샘플 제외 항목 둘" description="분류 설명 한 줄입니다" />
    </Panel>
  ),
}
