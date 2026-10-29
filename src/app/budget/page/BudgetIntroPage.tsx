import CommonSceneFrame from '@/app/common/component/CommonSceneFrame';
import BudgetIntroResumeScene from '@/app/budget/component/BudgetIntroResumeScene';
import BudgetIntroStartScene from '@/app/budget/component/BudgetIntroStartScene';
import type { BudgetStatus } from '@/app/budget/interface/BudgetStatus';

interface BudgetIntroPageProps {
  /** 꺼져 있는 예산 현황 (resumable 로 마지막 장면을 고른다) */
  budget: BudgetStatus;
}

/**
 * 예산 소개 화면. 지금은 마지막 장면 하나만 있고, 소개 장면이 만들어지면 그 앞에 장면을 더한다.
 * 이번 기간 기록이 남아 있으면 다시 켜기, 없으면 시작하기가 나온다(둘이 함께 나오지 않는다).
 */
const BudgetIntroPage = ({ budget }: BudgetIntroPageProps) => {
  const lastName = budget.resumable ? '다시 켜기' : '시작하기';
  const lastScene = budget.resumable ? (
    <BudgetIntroResumeScene startDay={budget.startDay} defaultBudget={budget.defaultBudget} />
  ) : (
    <BudgetIntroStartScene startDay={budget.startDay} defaultBudget={budget.defaultBudget} />
  );
  const scenes = [{ name: lastName, scene: lastScene }];

  return <CommonSceneFrame scenes={scenes} />;
};

export default BudgetIntroPage;
