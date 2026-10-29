import { Typography } from '@mui/material';
import { ColumnCard, SectionTitle } from '@/app/common/style/CommonCard.style';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { LabelText, ValueText } from '@/app/common/style/CommonText.style';
import { formatPrice } from '@/app/common/utils/CommonUtils';

interface BudgetSettingCardProps {
  /** 기간 시작일 설정 (1~28) */
  startDay: number;

  /** 기본 예산 설정(원) */
  defaultBudget: number;
}

/**
 * 예산 설정 카드. 지금 설정(시작일, 기본 예산)을 값으로 보여 준다.
 */
const BudgetSettingCard = ({ startDay, defaultBudget }: BudgetSettingCardProps) => {
  return (
    <ColumnCard>
      <SectionTitle variant="h6" component="h2">
        예산 설정
      </SectionTitle>
      <SpreadRow>
        <LabelText>기간 시작일</LabelText>
        <ValueText>매월 {startDay}일</ValueText>
      </SpreadRow>
      <SpreadRow>
        <LabelText>기본 예산</LabelText>
        <ValueText>{formatPrice(defaultBudget)}</ValueText>
      </SpreadRow>
      <Typography variant="caption" color="text.secondary">
        바꾼 값은 다음 기간부터 적용돼요. 이번 기간은 그대로예요.
      </Typography>
    </ColumnCard>
  );
};

export default BudgetSettingCard;
