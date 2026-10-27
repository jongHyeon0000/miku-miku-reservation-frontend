import { Button, Typography } from '@mui/material';
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { styled } from '@mui/material/styles';
import { Row } from '@/app/common/style/CommonLayout.style';

interface SelectBarProps {
  /** 동작 버튼을 경고색으로 그릴지 (삭제처럼 되돌릴 수 없는 동작) */
  danger: boolean;

  /** 체크된 항목 수 */
  checkedCount: number;

  /** 지금 보이는 항목 수 */
  shownCount: number;

  /** 동작 버튼 글자 (예: 삭제, 구매완료로 변경) */
  actionLabel: string;

  /** 전체 선택 (이미 전부 체크돼 있으면 전체 해제) */
  onToggleAll: () => void;

  /** 동작 버튼을 눌렀을 때 */
  onAction: () => void;

  /** 취소 버튼을 눌렀을 때. 없으면 취소 버튼을 그리지 않는다(나가는 버튼이 따로 있는 화면) */
  onCancel?: () => void;
}

/**
 * 선택 모드 도구줄 (N개 선택 · 전체 선택 · 동작 버튼 · 취소). 상품 목록 헤더와 분류 목록 아래 칸이 같이 쓴다(표시 전용).
 */
const SelectBar = ({ danger, checkedCount, shownCount, actionLabel, onToggleAll, onAction, onCancel }: SelectBarProps) => {
  const allChecked = shownCount > 0 && checkedCount === shownCount;
  const ActionButton = danger ? TonalDangerButton : TonalButton;

  return (
    <Bar>
      <Typography color="text.secondary" variant="body2">
        <Highlight>{checkedCount}개</Highlight> 선택
      </Typography>
      <Button onClick={onToggleAll} disabled={shownCount === 0}>
        {allChecked ? '전체 해제' : '전체 선택'}
      </Button>
      <ActionButton onClick={onAction} disabled={checkedCount === 0}>
        {actionLabel}
      </ActionButton>
      {onCancel !== undefined && <Button onClick={onCancel}>취소</Button>}
    </Bar>
  );
};

export default SelectBar;

/** ───────── styles ───────── */

const Bar = styled(Row)({
  whiteSpace: 'nowrap',
});
