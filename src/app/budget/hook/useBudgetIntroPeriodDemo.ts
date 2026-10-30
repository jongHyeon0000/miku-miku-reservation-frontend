import { useState } from 'react';
import useWelcomeIntroDemoLoop from '@/app/welcome-intro/hook/useWelcomeIntroDemoLoop';
import { wait } from '@/app/welcome-intro/utils/WelcomeIntroUtils';
import { BUDGET_INTRO_PERIOD_STEPS } from '@/app/budget/constant/budgetIntroDemo';

const STEP_MILLISECONDS = 1800;

/**
 * 기간 장면 데모 대본. 시작일이 저절로 눌리고 기본 예산이 따라 바뀌기를 되풀이한다.
 * 돌려주는 값이 지금 보여 줄 시작일과 기본 예산이다. 장면을 떠나면 멈춘다.
 */
const useBudgetIntroPeriodDemo = (active: boolean) => {
  const [stepIndex, setStepIndex] = useState<number>(0);

  useWelcomeIntroDemoLoop(active, async (alive) => {
    for (let index = 0; index < BUDGET_INTRO_PERIOD_STEPS.length; index += 1) {
      setStepIndex(index);
      await wait(STEP_MILLISECONDS);

      if (!alive()) {
        return;
      }
    }
  });

  return BUDGET_INTRO_PERIOD_STEPS[stepIndex];
};

export default useBudgetIntroPeriodDemo;
