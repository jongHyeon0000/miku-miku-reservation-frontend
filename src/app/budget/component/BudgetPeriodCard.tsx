import { useState } from 'react';
import type { LinearProgressProps } from '@mui/material';
import { Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ColumnCard, DetailList, ReceiptBox, SectionTitle, ToggleRow, TotalDivider, UsageBar } from '@/app/common/style/CommonCard.style';
import { GroupStack, Row, SpreadRow } from '@/app/common/style/CommonLayout.style';
import { BoldText, LabelText, PriceText, ValueText } from '@/app/common/style/CommonText.style';
import { formatPrice } from '@/app/common/utils/CommonUtils';
import { BUDGET_SPENDING_KIND_LABELS } from '@/app/budget/constant/budgetSpendingKind';
import type { BudgetAdjust } from '@/app/budget/interface/BudgetAdjust';
import type { BudgetPeriod } from '@/app/budget/interface/BudgetPeriod';
import type { BudgetSpending } from '@/app/budget/interface/BudgetSpending';
import { formatBudgetDate, formatBudgetPeriod, formatSignedPrice, getBudgetUsagePercent } from '@/app/budget/utils/BudgetUtils';

interface BudgetPeriodCardProps {
  /** 이번 기간 현황 */
  period: BudgetPeriod;

  /** 이번 기간 증감 목록 (증감 합계를 누르면 펼쳐 보인다) */
  adjusts: BudgetAdjust[];

  /** 이번 기간 지출 목록 (지출을 누르면 펼쳐 보인다) */
  spendings: BudgetSpending[];
}

/**
 * 부호 있는 금액의 글자색. 빼는 금액(음수)은 빨강, 더하는 금액은 기본색이다 (증감, 지출은 -를 곱해 넘긴다)
 */
const getSignedAmountColor = (amount: number): string => {
  return amount < 0 ? 'error' : 'text.primary';
};

/**
 * 이번 기간 카드. 위에 기간과 남은 돈, 사용 막대를 보여 주고, 아래 어두운 상자에 계산 내역을 영수증처럼 쌓는다
 * (기본 예산, 증감 합계, 총 예산, 지출, 남은 돈 순서). 증감 합계와 지출 줄을 누르면 그 줄 아래로 모든 내역이 펼쳐지고, 같은 줄을 다시 누르면 접힌다.
 * 지출이 총 예산을 넘으면(남은 돈이 음수) 남은 돈과 막대가 빨갛게 되고 "예산 초과"가 붙는다.
 */
const BudgetPeriodCard = ({ period, adjusts, spendings }: BudgetPeriodCardProps) => {
  const [adjustOpen, setAdjustOpen] = useState<boolean>(false);
  const [spendingOpen, setSpendingOpen] = useState<boolean>(false);

  const usagePercent = getBudgetUsagePercent(period.spent, period.totalBudget);
  const barValue = Math.min(usagePercent, 100);
  const isOver = period.remaining < 0;
  const barColor: LinearProgressProps['color'] = isOver ? 'error' : 'primary';
  const remainColor = isOver ? 'error' : 'primary';
  const adjustAmountColor = getSignedAmountColor(period.adjustTotal);
  const spentColor = getSignedAmountColor(-period.spent);

  const handleToggleAdjust = () => {
    setAdjustOpen((isOpen) => !isOpen);
  };

  const handleToggleSpending = () => {
    setSpendingOpen((isOpen) => !isOpen);
  };

  return (
    <ColumnCard>
      <SpreadRow>
        <SectionTitle variant="h6" component="h2">
          이번 기간
        </SectionTitle>
        <LabelText>{formatBudgetPeriod(period.startDate, period.endDate)}</LabelText>
      </SpreadRow>

      <GroupStack>
        <SpreadRow>
          <BoldText>남은 돈</BoldText>
          {isOver && <BoldText color="error">예산 초과</BoldText>}
        </SpreadRow>
        <PriceText size="lg" negative={isOver}>
          {formatPrice(period.remaining)}
        </PriceText>
      </GroupStack>

      <GroupStack>
        <SpreadRow>
          <LabelText>사용</LabelText>
          <LabelText>{usagePercent}%</LabelText>
        </SpreadRow>
        <UsageBar variant="determinate" value={barValue} color={barColor} />
      </GroupStack>

      <ReceiptBox>
        <SpreadRow>
          <LabelText>기본 예산</LabelText>
          <ValueText>{formatPrice(period.amount)}</ValueText>
        </SpreadRow>

        <ToggleRow aria-expanded={adjustOpen} onClick={handleToggleAdjust}>
          <Row>
            <LabelText>증감 합계</LabelText>
            {adjustOpen ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
          </Row>
          <Typography variant="inherit" component="span" color={adjustAmountColor}>
            {formatSignedPrice(period.adjustTotal)}
          </Typography>
        </ToggleRow>
        {adjustOpen && (
          <DetailList>
            {adjusts.length === 0 && (
              <Typography variant="caption" color="text.secondary">
                증감 내역이 없어요.
              </Typography>
            )}
            {adjusts.map((adjust) => (
              <div key={adjust.budgetAdjustId}>
                <Typography variant="body2" color="text.secondary">
                  {formatBudgetDate(adjust.createdAt)}
                </Typography>
                <SpreadRow>
                  <ValueText>{adjust.memo ? adjust.memo : '(메모 없음)'}</ValueText>
                  <Row>
                    <Typography variant="mono" noWrap color={getSignedAmountColor(adjust.amount)}>
                      {formatSignedPrice(adjust.amount)}
                    </Typography>
                  </Row>
                </SpreadRow>
              </div>
            ))}
          </DetailList>
        )}

        <TotalDivider />
        <SpreadRow>
          <BoldText>총 예산</BoldText>
          <BoldText color={getSignedAmountColor(period.totalBudget)}>{formatPrice(period.totalBudget)}</BoldText>
        </SpreadRow>

        <ToggleRow aria-expanded={spendingOpen} onClick={handleToggleSpending}>
          <Row>
            <LabelText>지출</LabelText>
            {spendingOpen ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
          </Row>
          <Typography variant="inherit" component="span" color={spentColor}>
            {formatSignedPrice(-period.spent)}
          </Typography>
        </ToggleRow>
        {spendingOpen && (
          <DetailList>
            {spendings.length === 0 && (
              <Typography variant="caption" color="text.secondary">
                이번 기간에 결제한 상품이 없어요.
              </Typography>
            )}
            {spendings.map((spending) => (
              <div key={`${spending.figureId}-${spending.kind}`}>
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
                    <Typography variant="mono" noWrap color={getSignedAmountColor(-spending.amount)}>
                      {formatSignedPrice(-spending.amount)}
                    </Typography>
                  </Row>
                </SpreadRow>
              </div>
            ))}
          </DetailList>
        )}

        <TotalDivider />
        <SpreadRow>
          <BoldText>남은 돈</BoldText>
          <BoldText color={remainColor}>{formatPrice(period.remaining)}</BoldText>
        </SpreadRow>
      </ReceiptBox>
    </ColumnCard>
  );
};

export default BudgetPeriodCard;
