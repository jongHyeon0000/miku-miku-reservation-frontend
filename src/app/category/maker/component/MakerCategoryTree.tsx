import { Box, Typography } from '@mui/material';
import MakerChildRow from '@/app/category/maker/component/MakerChildRow';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';
import { Panel, PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import { TonalButton } from '@/app/common/style/CommonButton.style';

interface MakerCategoryTreeProps {
  /** 제조사 목록 (상위만 있는 축이라 목록 한 줄이 곧 분류다) */
  groups: MakerItem[];

  /** 추가 버튼을 눌렀을 때 */
  onInsert: () => void;

  /** 수정 버튼을 눌렀을 때 */
  onEdit: (target: MakerItem) => void;

  /** 삭제 버튼을 눌렀을 때 */
  onDelete: (target: MakerItem) => void;
}

/**
 * 제조사 목록. 하위가 없어서 한 줄씩 보여 준다.
 */
const MakerCategoryTree = ({ groups, onInsert, onEdit, onDelete }: MakerCategoryTreeProps) => {
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
          <MakerChildRow key={group.id} item={group} onEdit={() => onEdit(group)} onDelete={() => onDelete(group)} />
        ))}
      </Box>
    </Panel>
  );
};

export default MakerCategoryTree;
