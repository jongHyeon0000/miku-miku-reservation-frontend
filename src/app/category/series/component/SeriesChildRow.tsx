import { Chip, IconButton, Tooltip } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CategoryRow from '@/app/category/common/component/CategoryRow';
import { PROTECTED_CATEGORY_NAME } from '@/app/category/common/constant/categoryAxes';
import { ButtonGroup } from '@/app/category/common/style/CategoryRow.style';
import type { SeriesItem } from '@/app/category/series/interface/SeriesItem';

interface SeriesChildRowProps {
  /** 보여 줄 분류 (하위, 또는 하위가 없는 축의 상위) */
  item: SeriesItem;

  /** 수정 버튼을 눌렀을 때 */
  onEdit: () => void;

  /** 삭제 버튼을 눌렀을 때 */
  onDelete: () => void;
}

/**
 * 분류 한 줄. 줄 모양은 CategoryRow 가 그리고, 이 컴포넌트는 오른쪽의 수정/삭제 버튼을 정한다. 서버가 막아 둔 '기타'는 버튼 대신 기본 항목 표시를 둔다.
 */
const SeriesChildRow = ({ item, onEdit, onDelete }: SeriesChildRowProps) => {
  const isProtected = item.name === PROTECTED_CATEGORY_NAME;

  return (
    <CategoryRow
      name={item.name}
      description={item.description}
      thumbnailUrl={item.thumbnailUrl}
      actions={
        isProtected ? (
          <Chip label="기본 항목" size="small" variant="outlined" />
        ) : (
          <ButtonGroup>
            <Tooltip title="수정">
              <IconButton size="small" aria-label="수정" onClick={onEdit}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="삭제">
              <IconButton size="small" color="error" aria-label="삭제" onClick={onDelete}>
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        )
      }
    />
  );
};

export default SeriesChildRow;
