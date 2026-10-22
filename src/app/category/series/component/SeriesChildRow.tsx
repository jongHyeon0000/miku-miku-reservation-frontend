import { Chip, IconButton, Tooltip } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { PROTECTED_CATEGORY_NAME } from '@/app/category/common/constant/categoryAxes';
import type { SeriesItem } from '@/app/category/series/interface/SeriesItem';
import { ButtonGroup, Description, RowBox, TextBox } from '@/app/category/common/style/CategoryRow.style';
import { BoldText } from '@/app/common/style/CommonText.style';
import { InfoIcon, TooltipText } from '@/app/common/style/CommonTooltip.style';

interface SeriesChildRowProps {
  /** 보여 줄 분류 (하위, 또는 하위가 없는 축의 상위) */
  item: SeriesItem;

  /** 수정 버튼을 눌렀을 때 */
  onEdit: () => void;

  /** 삭제 버튼을 눌렀을 때 */
  onDelete: () => void;
}

/**
 * 분류 한 줄. 이름, 설명, 수정/삭제 버튼을 보여 준다. 서버가 막아 둔 '기타'는 버튼 대신 기본 항목 표시를 둔다.
 */
const SeriesChildRow = ({ item, onEdit, onDelete }: SeriesChildRowProps) => {
  const isProtected = item.name === PROTECTED_CATEGORY_NAME;

  return (
    <RowBox>
      <TextBox>
        <BoldText>
          {item.name}
          {item.description && (
            <Tooltip title={<TooltipText>{item.description}</TooltipText>} placement="right-start">
              <InfoIcon fontSize="inherit" />
            </Tooltip>
          )}
        </BoldText>
        {item.description && (
          <Description variant="caption" color="text.secondary">
            {item.description}
          </Description>
        )}
      </TextBox>
      {isProtected ? (
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
      )}
    </RowBox>
  );
};

export default SeriesChildRow;
