import { List, Typography } from '@mui/material';
import { PROTECTED_CATEGORY_NAME, type CategoryLevel } from '@/app/category/common/constant/categoryAxes';
import CategoryChildPanel from '@/app/category/common/component/CategoryChildPanel';
import FigureTypeChildRow from '@/app/category/figure-type/component/FigureTypeChildRow';
import FigureTypeGroupItem from '@/app/category/figure-type/component/FigureTypeGroupItem';
import type { FigureTypeGroup } from '@/app/category/figure-type/interface/FigureTypeGroup';
import type { FigureTypeItem } from '@/app/category/figure-type/interface/FigureTypeItem';
import useDeleteFigureTypeList from '@/app/category/figure-type/service/useDeleteFigureTypeList';
import { PanelHeader, PanelTop, TreeLayout } from '@/app/category/common/style/CategoryPanel.style';
import { Panel } from '@/app/common/style/CommonList.style';
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { Row } from '@/app/common/style/CommonLayout.style';

interface FigureTypeCategoryTreeProps {
  /** 상위 목록 (하위 포함). 비어 있지 않을 때만 쓴다 */
  groups: FigureTypeGroup[];

  /** 오른쪽에 하위를 펼칠 상위 id. 없으면 첫 번째 상위 */
  selectedGroupId: number | null;

  /** 고른 상위의 이번 페이지 하위 항목 */
  childItems: FigureTypeItem[];

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
  onEdit: (level: CategoryLevel, target: FigureTypeItem) => void;

  /** 삭제 버튼을 눌렀을 때 */
  onDelete: (level: CategoryLevel, target: FigureTypeItem) => void;
}

/**
 * 형태 분류 목록. 왼쪽에 상위 목록, 오른쪽에 고른 상위의 하위 목록(CategoryChildPanel)을 둔다.
 */
const FigureTypeCategoryTree = ({
  groups,
  selectedGroupId,
  childItems,
  page,
  totalPages,
  onSelectGroup,
  onChangePage,
  onInsert,
  onEdit,
  onDelete,
}: FigureTypeCategoryTreeProps) => {
  const { deleteFigureTypeListLoading, fetchDeleteFigureTypeList } = useDeleteFigureTypeList();

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
            <FigureTypeGroupItem
              key={group.id}
              group={group}
              selected={group.id === selectedGroup.id}
              onSelect={() => onSelectGroup(group.id)}
            />
          ))}
        </List>
      </Panel>

      {/* 상위나 쪽이 바뀌면 key 가 달라져 패널이 새로 그려지고 선택 모드가 끝난다 */}
      <CategoryChildPanel
        key={`${selectedGroup.id}-${page}`}
        title={selectedGroup.name}
        description={selectedGroup.description}
        renderHeaderActions={(selectMode) =>
          !isGroupProtected &&
          !selectMode && (
            <Row>
              <TonalButton size="small" onClick={() => onEdit('group', selectedGroup)}>
                그룹 수정
              </TonalButton>
              <TonalDangerButton size="small" onClick={() => onDelete('group', selectedGroup)}>
                그룹 삭제
              </TonalDangerButton>
            </Row>
          )
        }
        locked={isGroupProtected}
        childItems={childItems}
        page={page}
        totalPages={totalPages}
        renderRow={(child, select) => (
          <FigureTypeChildRow item={child} onEdit={() => onEdit('child', child)} onDelete={() => onDelete('child', child)} {...select} />
        )}
        addLabel="하위 추가"
        onAdd={() => onInsert('child', selectedGroup.id)}
        deleteListLoading={deleteFigureTypeListLoading}
        fetchDeleteList={fetchDeleteFigureTypeList}
        onChangePage={onChangePage}
      />
    </TreeLayout>
  );
};

export default FigureTypeCategoryTree;
