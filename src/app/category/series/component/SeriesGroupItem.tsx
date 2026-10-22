import { ListItemText, Typography } from '@mui/material';
import type { SeriesGroup } from '@/app/category/series/interface/SeriesGroup';
import { GroupButton } from '@/app/category/common/style/CategoryRow.style';

interface SeriesGroupItemProps {
  /** 상위 분류 (하위 포함) */
  group: SeriesGroup;

  /** 지금 오른쪽에 하위가 펼쳐진 상위인지 */
  selected: boolean;

  /** 눌러서 선택했을 때 */
  onSelect: () => void;
}

/**
 * 왼쪽 상위 목록의 한 줄. 이름과 하위 개수를 보여 주고, 누르면 오른쪽에 그 상위의 하위가 나온다.
 */
const SeriesGroupItem = ({ group, selected, onSelect }: SeriesGroupItemProps) => {
  return (
    <GroupButton selected={selected} onClick={onSelect}>
      <ListItemText primary={group.name} />
      <Typography variant="caption" color="text.secondary">
        {group.children.length}
      </Typography>
    </GroupButton>
  );
};

export default SeriesGroupItem;
