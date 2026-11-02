import { Button, Checkbox } from '@mui/material';
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { SelectAllLabel } from '@/app/common/style/CommonList.style';
import { styled } from '@mui/material/styles';
import { Row, SpreadRow } from '@/app/common/style/CommonLayout.style';

interface SelectBarProps {
  /** 동작 버튼을 경고색으로 그릴지 (삭제처럼 되돌릴 수 없는 동작) */
  danger: boolean;

  /** 체크된 항목 수 (전체 선택 칸의 상태와 동작 버튼 막기에만 쓴다. 화면에 숫자는 보여 주지 않는다) */
  checkedCount: number;

  /** 지금 보이는 항목 수 */
  shownCount: number;

  /** 동작 버튼 글자 (예: 삭제, 구매완료로 변경) */
  actionLabel: string;

  /** 전체 선택 (이미 전부 체크돼 있으면 전체 해제) */
  onToggleAll: () => void;

  /** 동작 버튼을 눌렀을 때 */
  onAction: () => void;

  /** 나가기 버튼을 눌렀을 때. 없으면 나가기 버튼을 그리지 않는다(나가는 버튼이 따로 있는 화면) */
  onCancel?: () => void;
}

/**
 * 선택 모드 도구줄. 왼쪽은 전체 선택 칸, 오른쪽은 동작 버튼과 나가기. 상품 목록 헤더와 분류 목록 아래 칸이 같이 쓴다(표시 전용).
 */
const SelectBar = ({ danger, checkedCount, shownCount, actionLabel, onToggleAll, onAction, onCancel }: SelectBarProps) => {
  const allChecked = shownCount > 0 && checkedCount === shownCount;
  const ActionButton = danger ? TonalDangerButton : TonalButton;

  return (
    <Bar>
      <Group>
        <SelectAllLabel
          label="전체 선택"
          disabled={shownCount === 0}
          control={<Checkbox size="small" checked={allChecked} indeterminate={checkedCount > 0 && !allChecked} onChange={onToggleAll} />}
        />
      </Group>
      <Group>
        <ActionButton onClick={onAction} disabled={checkedCount === 0}>
          {actionLabel}
        </ActionButton>
        {onCancel !== undefined && (
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            나가기
          </Button>
        )}
      </Group>
    </Bar>
  );
};

export default SelectBar;

/** ───────── styles ───────── */

/** 왼쪽 묶음과 오른쪽 묶음을 양 끝으로 벌리고, 칸과 버튼이 줄 높이를 같이 따르도록 늘린다 */
const Bar = styled(SpreadRow)({
  alignItems: 'stretch',
  whiteSpace: 'nowrap',
});

/** 묶음 안의 칸과 버튼이 높이를 같이 따르도록 늘린다 */
const Group = styled(Row)({
  alignItems: 'stretch',
});
