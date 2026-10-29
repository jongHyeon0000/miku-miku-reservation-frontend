import { Typography } from '@mui/material';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { PageContainer } from '@/app/common/style/CommonPage.style';
import { StateStack } from '@/app/common/style/CommonState.style';
import BudgetIntroPage from '@/app/budget/page/BudgetIntroPage';
import useReadBudget from '@/app/budget/service/useReadBudget';
import { API_CODE } from '@/config/axios/constant/apiCode';

/**
 * 예산관리 화면 (/budget). 예산 현황 응답으로 보여 줄 화면을 고른다.
 * 꺼져 있으면 예산 소개(시작하기 또는 다시 켜기), 켜져 있으면 현황이다. 현황은 아직 만드는 중이라 안내 문구만 보여 준다.
 */
const BudgetPage = () => {
  const { budget, budgetLoading, fetchReadBudget } = useReadBudget();

  if (budgetLoading || !budget) {
    return <LoadingOverlay open />;
  }

  const status = budget.data;

  if (budget.code !== API_CODE.OK || status === null) {
    return (
      <PageContainer>
        <ErrorView message={budget.message} onRetry={fetchReadBudget} />
      </PageContainer>
    );
  }

  if (!status.enabled) {
    return <BudgetIntroPage budget={status} />;
  }

  return (
    <PageContainer>
      <StateStack>
        <Typography color="text.secondary">개발중이에요~</Typography>
      </StateStack>
    </PageContainer>
  );
};

export default BudgetPage;
