import ErrorView from '@/app/common/component/ErrorView';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { SplitLayout } from '@/app/common/style/CommonLayout.style';
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style';
import BudgetAdjustPanel from '@/app/budget/component/BudgetAdjustPanel';
import BudgetPeriodCard from '@/app/budget/component/BudgetPeriodCard';
import BudgetSettingCard from '@/app/budget/component/BudgetSettingCard';
import BudgetSpendingPanel from '@/app/budget/component/BudgetSpendingPanel';
import type { BudgetStatus } from '@/app/budget/interface/BudgetStatus';

interface BudgetStatusPageProps {
  /** 켜져 있는 예산 현황 */
  budget: BudgetStatus;
}

/**
 * 예산 현황 화면. 왼쪽 넓은 열에 증감 내역과 지출 내역, 오른쪽 좁은 열에 이번 기간과 예산 설정을 둔다.
 * 현황은 BudgetPage 가 읽어서 내려 주고, 각 카드는 받은 값을 그대로 보여 준다.
 */
const BudgetStatusPage = ({ budget }: BudgetStatusPageProps) => {
  const period = budget.period;

  if (period === null) {
    return (
      <PageContainer>
        <ErrorView message="이번 기간의 예산 정보를 불러오지 못했어요." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          예산 관리
        </PageTitle>
      </PageHeader>

      <SplitLayout>
        <FieldStack>
          <BudgetAdjustPanel adjusts={budget.adjusts} />
          <BudgetSpendingPanel spendings={budget.spendings} spent={period.spent} />
        </FieldStack>
        <FieldStack>
          <BudgetPeriodCard period={period} adjusts={budget.adjusts} spendings={budget.spendings} />
          <BudgetSettingCard startDay={budget.startDay} defaultBudget={budget.defaultBudget} />
        </FieldStack>
      </SplitLayout>
    </PageContainer>
  );
};

export default BudgetStatusPage;
