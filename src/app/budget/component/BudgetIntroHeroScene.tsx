import { motion } from 'motion/react';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ColumnCard, SectionTitle } from '@/app/common/style/CommonCard.style';
import { TripleGrid } from '@/app/common/style/CommonLayout.style';
import { cardEnterVariants } from '@/app/common/style/CommonMotion.style';
import { Scene, SceneDesc, SceneEyebrow, SceneHint, SceneTitle } from '@/app/common/style/CommonScene.style';
import { StateStack } from '@/app/common/style/CommonState.style';
import { Highlight, LabelText } from '@/app/common/style/CommonText.style';
import useSceneActive from '@/app/common/hook/useSceneActive';

/**
 * 예산 소개의 첫 장면. 예산관리가 무엇인지 말하고, 뒤에 나올 핵심 세 가지를 카드 셋으로 미리 보여 준다.
 * 처음 화면의 첫 장면처럼 가운데 정렬이고, 설명 데모는 두지 않는다.
 */
const BudgetIntroHeroScene = () => {
  const { sceneRef, active } = useSceneActive();
  const animate = active ? 'visible' : 'hidden';

  return (
    <Scene ref={sceneRef}>
      <StateStack>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={0}>
          <SceneEyebrow variant="mono" align="center">
            01 · 예산관리
          </SceneEyebrow>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={1}>
          <SceneTitle variant="h3" component="h1" align="center">
            취미에 쓸 돈,
            <br />
            <Highlight>한 달 예산</Highlight>을 정해 보세요
          </SceneTitle>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={2}>
          <SceneDesc align="center">
            기본 예산과 시작일만 정해 두면 한 달동안 쓸 수있는 비용이 얼마 남았는지 알려 주는 예산 장부예요.
            <br />
            예약해서 사는 취미 상품의 결제가 쌓여도 한 달에 얼마를 썼는지 놓치지 않게 도와줘요.
          </SceneDesc>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={3}>
          <TripleGrid>
            <ColumnCard>
              <SectionTitle variant="h6" component="h3">
                마음대로 설정하는 기간
              </SectionTitle>
              <LabelText>
                <Typography variant="body2">시작일을 기준으로 한 달 기간이 자동으로 이어져요</Typography>
              </LabelText>
            </ColumnCard>
            <ColumnCard>
              <SectionTitle variant="h6" component="h3">
                자유롭게 설정하는 예산
              </SectionTitle>
              <LabelText>
                <Typography variant="body2">한 달에 할당한 돈에 더해, 보너스와 경조사, 지출등 유동적으로 관리하는 시스템이에요.</Typography>
              </LabelText>
            </ColumnCard>
            <ColumnCard>
              <SectionTitle variant="h6" component="h3">
                예약할 상품과 자동 연동
              </SectionTitle>
              <LabelText>
                <Typography variant="body2">구매완료로 바꾸면 그 즉시 지출에 잡히고, 과소비 각이 나오면 미리 알려 줘요</Typography>
              </LabelText>
            </ColumnCard>
          </TripleGrid>
        </motion.div>
      </StateStack>

      <SceneHint animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
        아래로 스크롤
        <ExpandMoreIcon fontSize="small" />
      </SceneHint>
    </Scene>
  );
};

export default BudgetIntroHeroScene;
