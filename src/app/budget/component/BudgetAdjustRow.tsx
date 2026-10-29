import { Typography } from '@mui/material';
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import { RowBox } from '@/app/common/style/CommonList.style';
import { BoldText, LabelText } from '@/app/common/style/CommonText.style';
import type { BudgetAdjust } from '@/app/budget/interface/BudgetAdjust';
import { formatBudgetDate, formatSignedPrice } from '@/app/budget/utils/BudgetUtils';

interface BudgetAdjustRowProps {
  /** 보여 줄 증감 한 줄 */
  adjust: BudgetAdjust;

  /** [수정]을 눌렀을 때 */
  onEdit: (adjust: BudgetAdjust) => void;

  /** [삭제]를 눌렀을 때 */
  onDelete: (adjust: BudgetAdjust) => void;
}

/**
 * 증감 한 줄. 날짜, 메모, 부호 있는 금액(빼는 금액은 빨간 글자)과 [수정], [삭제] 버튼을 보여 준다.
 */
const BudgetAdjustRow = ({ adjust, onEdit, onDelete }: BudgetAdjustRowProps) => {
  const memoText = adjust.memo ? adjust.memo : '(메모 없음)';
  const amountColor = adjust.amount < 0 ? 'error' : 'text.primary';

  const handleEdit = () => {
    onEdit(adjust);
  };

  const handleDelete = () => {
    onDelete(adjust);
  };

  return (
    <RowBox>
      <Row>
        <LabelText>{formatBudgetDate(adjust.createdAt)}</LabelText>
        <BoldText>{memoText}</BoldText>
      </Row>
      <Row>
        <Typography variant="mono" color={amountColor}>
          {formatSignedPrice(adjust.amount)}
        </Typography>
        <TonalButton size="small" onClick={handleEdit}>
          수정
        </TonalButton>
        <TonalDangerButton size="small" onClick={handleDelete}>
          삭제
        </TonalDangerButton>
      </Row>
    </RowBox>
  );
};

export default BudgetAdjustRow;
