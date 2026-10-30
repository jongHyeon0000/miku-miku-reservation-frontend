import { useState } from 'react';
import useWelcomeIntroDemoLoop from '@/app/welcome-intro/hook/useWelcomeIntroDemoLoop';
import { wait } from '@/app/welcome-intro/utils/WelcomeIntroUtils';
import { BUDGET_INTRO_SPENT_STEPS } from '@/app/budget/constant/budgetIntroDemo';

const STEP_MILLISECONDS = 1800;

/**
 * 남은 돈 장면 데모 대본. 지출이 늘었다 줄었다 하며 남은 돈과 막대가 따라 바뀌기를 되풀이한다.
 * 돌려주는 값이 지금 보여 줄 지출이다. 장면을 떠나면 멈춘다.
 */
const useBudgetIntroRemainDemo = (active: boolean) => {
  const [stepIndex, setStepIndex] = useState<number>(0);

  useWelcomeIntroDemoLoop(active, async (alive) => {
    for (let index = 0; index < BUDGET_INTRO_SPENT_STEPS.length; index += 1) {
      setStepIndex(index);
      await wait(STEP_MILLISECONDS);

      if (!alive()) {
        return;
      }
    }
  });

  return BUDGET_INTRO_SPENT_STEPS[stepIndex];
};

export default useBudgetIntroRemainDemo;
