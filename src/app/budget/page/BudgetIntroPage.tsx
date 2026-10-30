import CommonSceneFrame from '@/app/common/component/CommonSceneFrame';
import BudgetIntroHeroScene from '@/app/budget/component/BudgetIntroHeroScene';
import BudgetIntroLinkScene from '@/app/budget/component/BudgetIntroLinkScene';
import BudgetIntroPeriodScene from '@/app/budget/component/BudgetIntroPeriodScene';
import BudgetIntroRemainScene from '@/app/budget/component/BudgetIntroRemainScene';
import BudgetIntroResumeScene from '@/app/budget/component/BudgetIntroResumeScene';
import BudgetIntroStartScene from '@/app/budget/component/BudgetIntroStartScene';
import type { BudgetStatus } from '@/app/budget/interface/BudgetStatus';

interface BudgetIntroPageProps {
  /** 꺼져 있는 예산 현황 (resumable 로 마지막 장면을 고른다) */
  budget: BudgetStatus;
}

/**
 * 예산 소개 화면. 소개 장면 4개(예산관리 소개, 기간, 남은 돈, 상품 연동) 뒤에 마지막 장면이 온다.
 * 이번 기간 기록이 남아 있으면 다시 켜기, 없으면 시작하기가 나온다(둘이 함께 나오지 않는다).
 */
const BudgetIntroPage = ({ budget }: BudgetIntroPageProps) => {
  const lastName = budget.resumable ? '다시 켜기' : '시작하기';
  const lastScene = budget.resumable ? (
    <BudgetIntroResumeScene startDay={budget.startDay} defaultBudget={budget.defaultBudget} />
  ) : (
    <BudgetIntroStartScene startDay={budget.startDay} defaultBudget={budget.defaultBudget} />
  );
  const scenes = [
    { name: '예산관리', scene: <BudgetIntroHeroScene /> },
    { name: '기간', scene: <BudgetIntroPeriodScene /> },
    { name: '남은 돈', scene: <BudgetIntroRemainScene /> },
    { name: '연동', scene: <BudgetIntroLinkScene /> },
    { name: lastName, scene: lastScene },
  ];

  return <CommonSceneFrame scenes={scenes} />;
};

export default BudgetIntroPage;
