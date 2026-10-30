import { motion } from 'motion/react';
import CommonSceneTextBlock from '@/app/common/component/CommonSceneTextBlock';
import { cardEnterVariants } from '@/app/common/style/CommonMotion.style';
import { Scene, SceneDemo, SceneDesc, SceneInner } from '@/app/common/style/CommonScene.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import useSceneActive from '@/app/common/hook/useSceneActive';
import BudgetPeriodCard from '@/app/budget/component/BudgetPeriodCard';
import { BUDGET_INTRO_ADJUSTS, BUDGET_INTRO_SPENDINGS, toBudgetIntroPeriod } from '@/app/budget/constant/budgetIntroDemo';
import useBudgetIntroRemainDemo from '@/app/budget/hook/useBudgetIntroRemainDemo';

/**
 * 예산 소개의 세 번째 장면. 남은 돈이 어떻게 계산되는지, 이번 기간 카드(실제 컴포넌트)에 목데이터를 넣어 보여 준다.
 * 지출이 늘었다 줄었다 하면서 남은 돈과 막대가 바뀌고, 총 예산을 넘으면 "예산 초과"가 붙는다.
 */
const BudgetIntroRemainScene = () => {
  const { sceneRef, active } = useSceneActive();
  const spent = useBudgetIntroRemainDemo(active);
  const animate = active ? 'visible' : 'hidden';

  return (
    <Scene ref={sceneRef}>
      <SceneInner>
        <CommonSceneTextBlock
          active={active}
          eyebrow="03 · 남은 돈"
          title={
            <>
              이번 기간에
              <br />
              <Highlight>얼마 남았는지</Highlight> 한눈에
            </>
          }
        >
          <SceneDesc>
            기본 예산에 보너스는 더하고 경조사는 빼고, 쓴 돈을 뺀 <Highlight>남은 돈</Highlight>이 바로 보여요.
          </SceneDesc>
          <SceneDesc>넘겨 써도 막지 않고, 숫자로 정직하게 알려 줘요.</SceneDesc>
        </CommonSceneTextBlock>

        <SceneDemo>
          <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={3}>
            <BudgetPeriodCard period={toBudgetIntroPeriod(spent)} adjusts={BUDGET_INTRO_ADJUSTS} spendings={BUDGET_INTRO_SPENDINGS} />
          </motion.div>
        </SceneDemo>
      </SceneInner>
    </Scene>
  );
};

export default BudgetIntroRemainScene;
