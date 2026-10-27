import { Chip, IconButton, Tooltip } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CategoryRow from '@/app/category/common/component/CategoryRow';
import { PROTECTED_CATEGORY_NAME } from '@/app/category/common/constant/categoryAxes';
import { ButtonGroup } from '@/app/category/common/style/CategoryRow.style';
import type { GenreCharacterItem } from '@/app/category/genre-character/interface/GenreCharacterItem';
import { SelectCheck } from '@/app/common/style/CommonList.style';

interface GenreCharacterChildRowProps {
  /** 보여 줄 분류 (하위, 또는 하위가 없는 축의 상위) */
  item: GenreCharacterItem;

  /** 선택 모드 여부. 켜지면 줄 앞에 체크칸이 생기고 수정/삭제 버튼은 숨는다 */
  selectMode: boolean;

  /** 선택 모드에서 이 줄이 체크돼 있는지 */
  checked: boolean;

  /** 체크칸을 눌렀을 때 */
  onToggle: () => void;

  /** 수정 버튼을 눌렀을 때 */
  onEdit: () => void;

  /** 삭제 버튼을 눌렀을 때 */
  onDelete: () => void;
}

/**
 * 분류 한 줄. 줄 모양은 CategoryRow 가 그리고, 이 컴포넌트는 오른쪽의 수정/삭제 버튼과 선택 모드의 체크칸을 정한다.
 * 서버가 막아 둔 '기타'는 버튼 대신 기본 항목 표시를 두고, 선택 모드에서도 체크할 수 없다.
 */
const GenreCharacterChildRow = ({ item, selectMode, checked, onToggle, onEdit, onDelete }: GenreCharacterChildRowProps) => {
  const isProtected = item.name === PROTECTED_CATEGORY_NAME;

  /* 기본 항목은 늘 표시를 두고, 선택 모드에서는 수정/삭제 버튼을 숨긴다 */
  const renderActions = () => {
    if (isProtected) {
      return <Chip label="기본 항목" size="small" variant="outlined" />;
    }

    if (selectMode) {
      return undefined;
    }

    return (
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
    );
  };

  return (
    <CategoryRow
      name={item.name}
      description={item.description}
      thumbnailUrl={item.thumbnailUrl}
      leading={
        selectMode && (
          <SelectCheck
            checked={checked}
            disabled={isProtected}
            onChange={onToggle}
            slotProps={{ input: { 'aria-label': `${item.name} 선택` } }}
          />
        )
      }
      actions={renderActions()}
    />
  );
};

export default GenreCharacterChildRow;
