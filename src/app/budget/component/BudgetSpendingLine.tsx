import { Typography } from '@mui/material';
import { Row, SpreadRow } from '@/app/common/style/CommonLayout.style';
import { ValueText } from '@/app/common/style/CommonText.style';
import { BUDGET_SPENDING_KIND_LABELS } from '@/app/budget/constant/budgetSpendingKind';
import type { BudgetSpending } from '@/app/budget/interface/BudgetSpending';
import { formatBudgetDate, formatSignedPrice } from '@/app/budget/utils/BudgetUtils';

interface BudgetSpendingLineProps {
  /** 보여 줄 지출 한 줄 */
  spending: BudgetSpending;
}

/**
 * 지출 한 줄 (위: 결제일과 종류, 아래: 상품 이름과 빠져나간 금액). 이번 기간 카드의 지출 펼침과 결제 초과 경고 모달이 같이 쓴다.
 */
const BudgetSpendingLine = ({ spending }: BudgetSpendingLineProps) => {
  return (
    <div>
      <Row>
        <Typography variant="body2" color="text.secondary">
          {formatBudgetDate(spending.paidDate)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {BUDGET_SPENDING_KIND_LABELS[spending.kind]}
        </Typography>
      </Row>
      <SpreadRow>
        <ValueText>{spending.figureName}</ValueText>
        <Row>
          <ValueText negative={spending.amount > 0}>{formatSignedPrice(-spending.amount)}</ValueText>
        </Row>
      </SpreadRow>
    </div>
  );
};

export default BudgetSpendingLine;
