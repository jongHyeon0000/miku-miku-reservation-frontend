import { Typography } from '@mui/material';
import { Row } from '@/app/common/style/CommonLayout.style';
import { RowBox } from '@/app/common/style/CommonList.style';
import { BoldText, LabelText } from '@/app/common/style/CommonText.style';
import type { BudgetAdjust } from '@/app/budget/interface/BudgetAdjust';
import { formatBudgetDate, formatSignedPrice } from '@/app/budget/utils/BudgetUtils';

interface BudgetAdjustRowProps {
  /** 보여 줄 증감 한 줄 */
  adjust: BudgetAdjust;
}

/**
 * 증감 한 줄. 날짜, 메모, 부호 있는 금액을 보여 준다(빼는 금액은 빨간 글자).
 */
const BudgetAdjustRow = ({ adjust }: BudgetAdjustRowProps) => {
  const memoText = adjust.memo ? adjust.memo : '(메모 없음)';
  const amountColor = adjust.amount < 0 ? 'error' : 'text.primary';

  return (
    <RowBox>
      <Row>
        <LabelText>{formatBudgetDate(adjust.createdAt)}</LabelText>
        <BoldText>{memoText}</BoldText>
      </Row>
      <Typography variant="mono" color={amountColor}>
        {formatSignedPrice(adjust.amount)}
      </Typography>
    </RowBox>
  );
};

export default BudgetAdjustRow;
