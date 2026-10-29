import { Button } from '@mui/material';
import { motion } from 'motion/react';
import { cardEnterVariants } from '@/app/common/style/CommonMotion.style';
import { Scene, SceneDesc, SceneEyebrow, SceneTitle } from '@/app/common/style/CommonScene.style';
import { StateStack } from '@/app/common/style/CommonState.style';
import { Highlight, LabelText, LabelValueGrid, LabelValueRow, ValueText } from '@/app/common/style/CommonText.style';
import { formatPrice } from '@/app/common/utils/CommonUtils';
import useSceneActive from '@/app/common/hook/useSceneActive';
import useUpdateBudgetEnabled from '@/app/budget/service/useUpdateBudgetEnabled';
import { getBudgetPeriodLabel } from '@/app/budget/utils/BudgetUtils';
import { useUiStore } from '@/store/uiStore';

interface BudgetIntroResumeSceneProps {
  /** 서버가 준 저장된 시작일 설정 */
  startDay: number;

  /** 서버가 준 저장된 기본 예산 설정 */
  defaultBudget: number;
}

/**
 * 예산 소개의 마지막 장면(다시 켜기). 껐지만 이번 기간 기록이 남아 있을 때 나온다.
 * 입력 없이 한 번 누르면 켜진다. 성공하면 현황이 다시 읽혀 화면이 바뀐다.
 */
const BudgetIntroResumeScene = ({ startDay, defaultBudget }: BudgetIntroResumeSceneProps) => {
  const { sceneRef, active } = useSceneActive();
  const showResult = useUiStore((state) => state.showResult);
  const { updateBudgetEnabledLoading, fetchUpdateBudgetEnabled } = useUpdateBudgetEnabled();
  const animate = active ? 'visible' : 'hidden';

  const handleResume = async () => {
    const res = await fetchUpdateBudgetEnabled(true);
    showResult(res);
  };

  return (
    <Scene ref={sceneRef}>
      <StateStack>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={0}>
          <SceneEyebrow variant="mono" align="center">
            RESUME
          </SceneEyebrow>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={1}>
          <SceneTitle variant="h3" component="h2" align="center">
            예산 기능이 <Highlight>꺼져 있어요</Highlight>
          </SceneTitle>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={2}>
          <SceneDesc align="center">
            이번 기간({getBudgetPeriodLabel(startDay)})의 기록이 남아 있어요.
            <br />
            다시 켜면 이어서 쓸 수 있어요.
          </SceneDesc>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={3}>
          <LabelValueGrid>
            <LabelValueRow>
              <LabelText>기간 시작일</LabelText>
              <ValueText>매월 {startDay}일</ValueText>
            </LabelValueRow>
            <LabelValueRow>
              <LabelText>기본 예산</LabelText>
              <ValueText>{formatPrice(defaultBudget)}</ValueText>
            </LabelValueRow>
          </LabelValueGrid>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={4}>
          <Button variant="contained" size="large" disabled={updateBudgetEnabledLoading} onClick={handleResume}>
            다시 켜기
          </Button>
        </motion.div>
      </StateStack>
    </Scene>
  );
};

export default BudgetIntroResumeScene;
