import { Box, List, Tooltip, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PROTECTED_CATEGORY_NAME, type CategoryLevel } from '@/app/category/common/constant/categoryAxes';
import ShopChildRow from '@/app/category/shop/component/ShopChildRow';
import ShopGroupItem from '@/app/category/shop/component/ShopGroupItem';
import type { ShopGroup } from '@/app/category/shop/interface/ShopGroup';
import type { ShopItem } from '@/app/category/shop/interface/ShopItem';
import PageNumbers from '@/app/common/component/PageNumbers';
import { AddButton, AddRow, PagerRow, Panel, PanelHeader, PanelTop, TreeLayout } from '@/app/category/common/style/CategoryPanel.style';
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import { InfoIcon, TooltipText } from '@/app/common/style/CommonTooltip.style';

interface ShopCategoryTreeProps {
  /** 상위 목록 (하위 포함). 비어 있지 않을 때만 쓴다 */
  groups: ShopGroup[];

  /** 오른쪽에 하위를 펼칠 상위 id. 없으면 첫 번째 상위 */
  selectedGroupId: number | null;

  /** 고른 상위의 이번 페이지 하위 항목 */
  childItems: ShopItem[];

  /** 지금 보는 하위 목록 페이지 (1부터) */
  page: number;

  /** 하위 목록의 전체 페이지 수 */
  totalPages: number;

  /** 왼쪽 목록에서 상위를 골랐을 때 */
  onSelectGroup: (groupId: number) => void;

  /** 페이지 번호를 눌렀을 때 */
  onChangePage: (page: number) => void;

  /** 추가 버튼을 눌렀을 때. 하위를 추가할 때는 속할 상위 id 를 같이 넘긴다 */
  onInsert: (level: CategoryLevel, parentId?: number) => void;

  /** 수정 버튼을 눌렀을 때 */
  onEdit: (level: CategoryLevel, target: ShopItem) => void;

  /** 삭제 버튼을 눌렀을 때 */
  onDelete: (level: CategoryLevel, target: ShopItem) => void;
}

/**
 * 판매처 분류 목록. 왼쪽에 상위 목록, 오른쪽에 고른 상위의 하위 목록을 둔다.
 */
const ShopCategoryTree = ({ groups, selectedGroupId, childItems, page, totalPages, onSelectGroup, onChangePage, onInsert, onEdit, onDelete }: ShopCategoryTreeProps) => {
  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0];
  const isGroupProtected = selectedGroup.name === PROTECTED_CATEGORY_NAME;

  return (
    <TreeLayout>
      <Panel>
        <PanelTop>
          <PanelHeader>
            <Typography variant="h6">그룹</Typography>
            <TonalButton size="small" variant="contained" disableElevation onClick={() => onInsert('group')}>
              추가
            </TonalButton>
          </PanelHeader>
        </PanelTop>
        <List disablePadding>
          {groups.map((group) => (
            <ShopGroupItem
              key={group.id}
              group={group}
              selected={group.id === selectedGroup.id}
              onSelect={() => onSelectGroup(group.id)}
            />
          ))}
        </List>
      </Panel>

      <Panel>
        <PanelTop>
          <PanelHeader>
            <Typography variant="h6">
              {selectedGroup.name}
              {selectedGroup.description && (
                <Tooltip title={<TooltipText>{selectedGroup.description}</TooltipText>} placement="right-start">
                  <InfoIcon fontSize="inherit" />
                </Tooltip>
              )}
            </Typography>
            {!isGroupProtected && (
              <Row>
                <TonalButton size="small" onClick={() => onEdit('group', selectedGroup)}>
                  그룹 수정
                </TonalButton>
                <TonalDangerButton size="small" onClick={() => onDelete('group', selectedGroup)}>
                  그룹 삭제
                </TonalDangerButton>
              </Row>
            )}
          </PanelHeader>
        </PanelTop>
        <Box>
          {childItems.map((child) => (
            <ShopChildRow key={child.id} item={child} onEdit={() => onEdit('child', child)} onDelete={() => onDelete('child', child)} />
          ))}
        </Box>
        {totalPages > 1 && (
          <PagerRow>
            <PageNumbers page={page} totalPages={totalPages} onChange={onChangePage} />
          </PagerRow>
        )}
        {!isGroupProtected && (
          <AddRow>
            <AddButton variant="outlined" size="small" startIcon={<AddOutlinedIcon />} onClick={() => onInsert('child', selectedGroup.id)}>
              하위 추가
            </AddButton>
          </AddRow>
        )}
      </Panel>
    </TreeLayout>
  );
};

export default ShopCategoryTree;
