import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import { Panel, RowBox } from '@/app/common/style/CommonList.style';
import { LabelText } from '@/app/common/style/CommonText.style';
import { formatPrice } from '@/app/common/utils/CommonUtils';
import { BUDGET_SPENDING_KIND_LABELS } from '@/app/budget/constant/budgetSpendingKind';
import type { BudgetSpending } from '@/app/budget/interface/BudgetSpending';
import { formatBudgetDate } from '@/app/budget/utils/BudgetUtils';

interface BudgetSpendingPanelProps {
  /** 이번 기간 지출 목록 (최근 결제일 순) */
  spendings: BudgetSpending[];

  /** 지출 합계(원) */
  spent: number;
}

/**
 * 지출 내역 패널. 이번 기간에 결제한 상품(전액, 예약금, 잔금)을 줄로 보여 주고 상품명을 누르면 상세로 간다.
 * 한 상품이 예약금과 잔금을 모두 이번 기간에 냈으면 두 줄로 나온다.
 */
const BudgetSpendingPanel = ({ spendings, spent }: BudgetSpendingPanelProps) => {
  return (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <Typography variant="h6" component="h2">
            지출 내역
          </Typography>
          <LabelText>
            {spendings.length}건 · {formatPrice(spent)}
          </LabelText>
        </PanelHeader>
      </PanelTop>
      <Box>
        {spendings.length === 0 && (
          <RowBox>
            <Typography color="text.secondary">이번 기간에 결제한 상품이 없어요.</Typography>
          </RowBox>
        )}
        {spendings.map((spending) => (
          <RowBox key={`${spending.figureId}-${spending.kind}`}>
            <Row>
              <LabelText>{formatBudgetDate(spending.paidDate)}</LabelText>
              <LabelText>{BUDGET_SPENDING_KIND_LABELS[spending.kind]}</LabelText>
              <Link component={RouterLink} to={`/figures/${spending.figureId}`} color="inherit">
                {spending.figureName}
              </Link>
            </Row>
            <Typography variant="mono">{formatPrice(spending.amount)}</Typography>
          </RowBox>
        ))}
      </Box>
    </Panel>
  );
};

export default BudgetSpendingPanel;
