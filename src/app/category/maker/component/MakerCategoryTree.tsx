import { Box, Typography } from '@mui/material';
import MakerChildRow from '@/app/category/maker/component/MakerChildRow';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';
import { BulkDeleteButton, PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import { AddRow, PagerRow, Panel } from '@/app/common/style/CommonList.style';
import PageNumbers from '@/app/common/component/PageNumbers';
import SelectBar from '@/app/common/component/SelectBar';
import { TonalButton } from '@/app/common/style/CommonButton.style';

interface MakerCategoryTreeProps {
  /** 제조사 목록 (상위만 있는 축이라 목록 한 줄이 곧 분류다) */
  groups: MakerItem[];

  /** 지금 보는 페이지 (1부터) */
  page: number;

  /** 전체 페이지 수 */
  totalPages: number;

  /** 페이지 번호를 눌렀을 때 */
  onChangePage: (page: number) => void;

  /** 추가 버튼을 눌렀을 때 */
  onInsert: () => void;

  /** 수정 버튼을 눌렀을 때 */
  onEdit: (target: MakerItem) => void;

  /** 삭제 버튼을 눌렀을 때 */
  onDelete: (target: MakerItem) => void;

  /** 일괄 삭제 선택 모드 여부. 켜지면 줄에 체크칸이 생기고 아래 칸이 선택 도구줄이 된다 */
  selectMode: boolean;

  /** 선택 모드에서 체크된 제조사 id */
  checkedIds: number[];

  /** 선택할 수 있는 제조사 수 (이번 페이지에서 '기타'를 뺀 수) */
  selectableCount: number;

  /** 일괄 삭제 버튼을 눌러 선택 모드를 켤 때 */
  onEnterSelect: () => void;

  /** 선택 모드의 취소 버튼을 눌렀을 때 */
  onExitSelect: () => void;

  /** 한 줄의 체크칸을 눌렀을 때 */
  onToggleItem: (id: number) => void;

  /** 전체 선택 (이미 전부 체크돼 있으면 전체 해제) */
  onToggleAll: () => void;

  /** 선택 도구줄의 삭제 버튼을 눌렀을 때 */
  onBulkDelete: () => void;
}

/**
 * 제조사 목록. 하위가 없어서 한 줄씩 보여 준다.
 */
const MakerCategoryTree = ({
  groups,
  page,
  totalPages,
  onChangePage,
  onInsert,
  onEdit,
  onDelete,
  selectMode,
  checkedIds,
  selectableCount,
  onEnterSelect,
  onExitSelect,
  onToggleItem,
  onToggleAll,
  onBulkDelete,
}: MakerCategoryTreeProps) => {
  return (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <Typography variant="h6">제조사 목록</Typography>
          <TonalButton size="small" variant="contained" disableElevation onClick={onInsert}>
            제조사 추가
          </TonalButton>
        </PanelHeader>
      </PanelTop>
      <Box>
        {groups.map((group) => (
          <MakerChildRow
            key={group.id}
            item={group}
            selectMode={selectMode}
            checked={checkedIds.includes(group.id)}
            onToggle={() => onToggleItem(group.id)}
            onEdit={() => onEdit(group)}
            onDelete={() => onDelete(group)}
          />
        ))}
      </Box>
      {totalPages > 1 && (
          <PagerRow>
            <PageNumbers page={page} totalPages={totalPages} onChange={onChangePage} />
          </PagerRow>
        )}
      <AddRow>
        {selectMode ? (
          <SelectBar
            danger
            checkedCount={checkedIds.length}
            shownCount={selectableCount}
            actionLabel="삭제"
            onToggleAll={onToggleAll}
            onAction={onBulkDelete}
            onCancel={onExitSelect}
          />
        ) : (
          <BulkDeleteButton variant="outlined" size="small" color="error" disabled={selectableCount === 0} onClick={onEnterSelect}>
            일괄 삭제
          </BulkDeleteButton>
        )}
      </AddRow>
    </Panel>
  );
};

export default MakerCategoryTree;
