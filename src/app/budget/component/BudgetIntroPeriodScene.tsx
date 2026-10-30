import { motion } from 'motion/react';
import { ToggleButton } from '@mui/material';
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import CommonSceneTextBlock from '@/app/common/component/CommonSceneTextBlock';
import { SectionTitle } from '@/app/common/style/CommonCard.style';
import { DayOfMonthGrid } from '@/app/common/style/CommonForm.style';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { Panel, PanelBody } from '@/app/common/style/CommonList.style';
import { cardEnterVariants } from '@/app/common/style/CommonMotion.style';
import { Scene, SceneDemo, SceneDesc, SceneInner } from '@/app/common/style/CommonScene.style';
import { Highlight, LabelText, ValueText } from '@/app/common/style/CommonText.style';
import { formatPrice } from '@/app/common/utils/CommonUtils';
import useSceneActive from '@/app/common/hook/useSceneActive';
import { BUDGET_START_DAYS } from '@/app/budget/constant/budgetStartDay';
import useBudgetIntroPeriodDemo from '@/app/budget/hook/useBudgetIntroPeriodDemo';
import { getBudgetPeriodLabel } from '@/app/budget/utils/BudgetUtils';

/**
 * 예산 소개의 두 번째 장면. 시작일을 고르면 기간이 정해지는 모습을, 시작일이 저절로 눌리는 설정 카드로 보여 준다.
 * 날짜 격자는 시작하기 장면과 같은 모양이다.
 */
const BudgetIntroPeriodScene = () => {
  const { sceneRef, active } = useSceneActive();
  const { startDay, defaultBudget } = useBudgetIntroPeriodDemo(active);
  const animate = active ? 'visible' : 'hidden';

  return (
    <Scene ref={sceneRef}>
      <SceneInner>
        <CommonSceneTextBlock
          active={active}
          eyebrow="02 · 기간"
          title={
            <>
              내 월급날에 맞춘
              <br />
              <Highlight>나만의 기간</Highlight>
            </>
          }
        >
          <SceneDesc>
            <Highlight>시작일</Highlight>과 <Highlight>기본 예산</Highlight>만 정하면 돼요.
          </SceneDesc>
          <SceneDesc>매달 시작일부터 새 기간이 자동으로 이어져서, 따로 챙길 게 없어요.</SceneDesc>
        </CommonSceneTextBlock>

        <SceneDemo>
          <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={3}>
            <Panel>
              <PanelTop>
                <PanelHeader>
                  <SectionTitle variant="h6" component="h2">
                    예산 설정
                  </SectionTitle>
                  <LabelText>시작일 {startDay}일</LabelText>
                </PanelHeader>
              </PanelTop>
              <PanelBody>
                <DayOfMonthGrid>
                  {BUDGET_START_DAYS.map((day) => (
                    <ToggleButton key={day} value={day} color="primary" selected={day === startDay}>
                      {day}
                    </ToggleButton>
                  ))}
                </DayOfMonthGrid>
                <SpreadRow>
                  <LabelText>기본 예산</LabelText>
                  <ValueText>{formatPrice(defaultBudget)}</ValueText>
                </SpreadRow>
                <SpreadRow>
                  <LabelText>이번 기간</LabelText>
                  <ValueText>{getBudgetPeriodLabel(startDay)}</ValueText>
                </SpreadRow>
              </PanelBody>
            </Panel>
          </motion.div>
        </SceneDemo>
      </SceneInner>
    </Scene>
  );
};

export default BudgetIntroPeriodScene;
