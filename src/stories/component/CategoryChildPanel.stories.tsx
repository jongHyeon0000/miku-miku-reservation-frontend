import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip, IconButton } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CategoryChildPanel from '@/app/category/common/component/CategoryChildPanel'
import CategoryRow from '@/app/category/common/component/CategoryRow'
import { ButtonGroup } from '@/app/category/common/style/CategoryRow.style'
import { SelectCheck } from '@/app/common/style/CommonList.style'
import { API_CODE } from '@/config/axios/constant/apiCode'

const SAMPLE_CHILDREN = [
  { id: 11, name: '샘플 하위 1', description: '하위 설명 한 줄입니다' },
  { id: 12, name: '샘플 하위 2', description: '하위 설명 한 줄입니다' },
  { id: 13, name: '기타', description: undefined },
]

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 오른쪽 단을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta<typeof CategoryChildPanel> = {
  title: '분류/분류 오른쪽 단 [CategoryChildPanel.tsx]',
  component: CategoryChildPanel,
  /* 조작 패널(Controls)에 보이는 칸 이름 */
  argTypes: {
    title: { name: '제목' },
    description: { name: '제목 옆 설명' },
    renderHeaderActions: { name: '머리 오른쪽 칸', control: false },
    locked: { name: '아래 칸 숨김' },
    childItems: { name: '하위 항목' },
    page: { name: '현재 쪽' },
    totalPages: { name: '전체 쪽 수' },
    /* 함수와 화면 조각은 입력칸으로 바꿀 수 없어서 조작 칸을 끈다 */
    renderRow: { name: '하위 줄 그리기', control: false },
    addLabel: { name: '추가 버튼 이름' },
    onAdd: { name: '추가 누름', control: false },
    deleteListLoading: { name: '일괄 삭제 요청 중' },
    fetchDeleteList: { name: '일괄 삭제 요청', control: false },
    onChangePage: { name: '쪽 바꾸기', control: false },
  },
  args: {
    title: '샘플 그룹',
    description: '그룹 설명 한 줄입니다',
    addLabel: '하위 추가',
    childItems: SAMPLE_CHILDREN,
    page: 1,
    totalPages: 1,
    renderRow: (item, select) => (
      <CategoryRow
        name={item.name}
        description={SAMPLE_CHILDREN.find((child) => child.id === item.id)?.description}
        leading={select.selectMode && <SelectCheck checked={select.checked} disabled={item.name === '기타'} onChange={select.onToggle} />}
        actions={
          item.name === '기타' ? (
            <Chip label="기본 항목" size="small" variant="outlined" />
          ) : (
            select.selectMode || (
              <ButtonGroup>
                <IconButton size="small" aria-label="수정">
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" aria-label="삭제">
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </ButtonGroup>
            )
          )
        }
      />
    ),
    deleteListLoading: false,
    fetchDeleteList: async () => ({ code: API_CODE.OK, message: '', data: null }),
    onChangePage: () => undefined,
    onAdd: () => undefined,
  },
}

export default meta

type Story = StoryObj<typeof CategoryChildPanel>

/** 카테고리 화면(판매처, 형태, 시리즈, 장르·캐릭터) 오른쪽 단. 맨 아래 점선 칸에 하위 추가, 일괄 삭제 버튼 (일괄 삭제를 누르면 선택 모드가 된다) */
export const CategoryRightPanel: Story = {
  name: '카테고리 > 우측 > 하위 목록 단',
}

/** 하위가 여러 쪽일 때. 목록 아래에 쪽 번호 줄이 붙는다 */
export const CategoryRightPanelPaged: Story = {
  name: '카테고리 > 우측 > 쪽 번호',
  args: {
    page: 2,
    totalPages: 5,
  },
}

/** 제조사 화면. 상위 그룹이 없어서 단이 하나이고, 머리에는 제목만 있다. 아래 점선 칸은 다른 축과 같다 */
export const CategoryMakerPanel: Story = {
  name: '카테고리 > 제조사 > 목록 한 단',
  args: {
    title: '제조사 목록',
    description: undefined,
    addLabel: '제조사 추가',
  },
}

/** 서버가 막아 둔 '기타' 상위. 아래 점선 칸(하위 추가, 일괄 삭제)이 없고, 머리 오른쪽 칸도 비어 있다 */
export const CategoryProtectedGroupPanel: Story = {
  name: '카테고리 > 우측 > 기본 항목 상위',
  args: {
    title: '기타',
    description: undefined,
    locked: true,
  },
}
