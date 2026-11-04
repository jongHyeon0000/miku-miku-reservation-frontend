import type { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListItemText } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SearchIcon from '@mui/icons-material/Search'
import { FilterButton, FilterColumn, FilterDot, FilterItem, FilterSearchInput, FilterSubColumn } from '@/app/common/style/CommonFilter.style'
import { Row } from '@/app/common/style/CommonLayout.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 필터 모양을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/필터 [CommonFilter.style.tsx]',
}

export default meta

type Story = StoryObj

/** 상품 목록 필터 줄의 분류 버튼(figure/component/filter/FigureCategoryFilter.tsx). 고른 값이 있으면 금색 테두리, 글자, 점 */
export const FigureFilterButtons: Story = {
  name: '상품 목록 > 필터 줄 > 분류 버튼',
  render: () => (
    <Row>
      <FilterButton variant="outlined" color="inherit" endIcon={<ArrowDropDownIcon />}>
        형태 전체
      </FilterButton>
      <FilterButton variant="outlined" color="inherit" filled endIcon={<ArrowDropDownIcon />}>
        판매처
        <FilterDot />
      </FilterButton>
    </Row>
  ),
}

/** 분류 버튼을 눌렀을 때 뜨는 상위 목록과, 상위에 마우스를 올리면 옆에 뜨는 하위 목록. 실제로는 팝오버(FilterPopover) 안에 뜬다 */
export const FigureFilterColumns: Story = {
  name: '상품 목록 > 필터 줄 > 펼친 분류 목록',
  render: () => (
    <Row>
      <FilterColumn>
        <List disablePadding>
          <FilterItem>
            <ListItemText primary="판매처 전체" />
          </FilterItem>
          <FilterItem open>
            <ListItemText primary="국내 쇼핑몰" />
            <ChevronRightIcon fontSize="small" color="primary" />
          </FilterItem>
          <FilterItem>
            <ListItemText primary="해외 쇼핑몰" />
            <ChevronRightIcon fontSize="small" color="disabled" />
          </FilterItem>
        </List>
      </FilterColumn>
      <FilterSubColumn>
        <List disablePadding>
          <FilterItem selected>
            <ListItemText primary="애니메이트" />
          </FilterItem>
          <FilterItem>
            <ListItemText primary="게이머즈" />
          </FilterItem>
        </List>
      </FilterSubColumn>
    </Row>
  ),
}

/** 커뮤니티 목록 제목 줄 오른쪽 검색 줄의 검색어 칸(community/component/list/PostSearchBar.tsx). 누르고 있으면 금색 테두리 */
export const CommunitySearchInput: Story = {
  name: '커뮤니티 목록 > 검색 줄 > 검색어 칸',
  render: () => <FilterSearchInput placeholder="검색어를 입력하세요" endAdornment={<SearchIcon />} />,
}
