import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip, IconButton, Typography } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CategoryRow from '@/app/category/common/component/CategoryRow'
import { ButtonGroup } from '@/app/category/common/style/CategoryRow.style'
import { TonalButton } from '@/app/common/style/CommonButton.style'
import { SelectCheck } from '@/app/common/style/CommonList.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 분류 줄을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof CategoryRow> = {
  title: '분류/분류 줄 [CategoryRow.tsx]',
  component: CategoryRow,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    name: { name: '이름' },
    description: { name: '설명' },
    thumbnailUrl: { name: '썸네일 주소' },
    /* 화면 조각(JSX)은 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    leading: { name: '왼쪽 칸', control: false },
    actions: { name: '오른쪽 칸', control: false },
  },
  args: {
    name: '샘플 분류',
    description: '분류 설명 한 줄입니다',
  },
}

export default meta

type Story = StoryObj<typeof CategoryRow>

/** 카테고리 화면 오른쪽 하위 목록의 기본 줄 (판매처, 형태, 시리즈, 장르·캐릭터, 제조사 공통). 오른쪽에 수정, 삭제 버튼 */
export const CategoryChildRow: Story = {
  name: '카테고리 > 우측 > 기본 줄',
  args: {
    actions: (
      <ButtonGroup>
        <IconButton size="small" aria-label="수정">
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" aria-label="삭제">
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </ButtonGroup>
    ),
  },
}

/** 카테고리 화면의 일괄 삭제 선택 모드. 왼쪽에 체크칸이 생기고 수정, 삭제 버튼은 숨는다 */
export const CategorySelectMode: Story = {
  name: '카테고리 > 우측 > 선택 모드',
  args: {
    leading: <SelectCheck />,
  },
}

/** 카테고리 화면의 '기타'. 서버가 막아 둔 기본 항목이라 버튼 대신 표시만 둔다 */
export const CategoryProtectedRow: Story = {
  name: '카테고리 > 우측 > 기본 항목',
  args: {
    name: '기타',
    description: undefined,
    actions: <Chip label="기본 항목" size="small" variant="outlined" />,
  },
}

/** 템플릿 가져오기 창의 템플릿 목록. 오른쪽에 항목 개수와 가져오기 버튼 */
export const TemplateListRow: Story = {
  name: '템플릿 창 > 목록 > 가져오기',
  args: {
    name: '샘플 템플릿',
    actions: (
      <>
        <Typography variant="mono" color="text.secondary" noWrap>
          12개
        </Typography>
        <TonalButton size="small">가져오기</TonalButton>
      </>
    ),
  },
}

/** 템플릿 가져오기 확인 창에서 이미 있어서 제외되는 항목 목록. 오른쪽 칸 없음 */
export const TemplateExcludedRow: Story = {
  name: '템플릿 확인 창 > 제외 항목',
}
