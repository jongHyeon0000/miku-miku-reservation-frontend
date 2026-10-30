import CommonSceneTextBlock from '@/app/common/component/CommonSceneTextBlock';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { EndRow } from '@/app/common/style/CommonLayout.style';
import { Scene, SceneDemo, SceneDesc, SceneInner } from '@/app/common/style/CommonScene.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import useSceneActive from '@/app/common/hook/useSceneActive';
import FigureListComponent from '@/app/figure/component/list/FigureListComponent';
import { noop } from '@/app/welcome-intro/utils/WelcomeIntroUtils';
import BudgetPaymentWarningModal from '@/app/budget/component/BudgetPaymentWarningModal';
import { BUDGET_INTRO_LINK_FIGURES, BUDGET_INTRO_WARNING } from '@/app/budget/constant/budgetIntroDemo';
import useBudgetIntroPaymentDemo from '@/app/budget/hook/useBudgetIntroPaymentDemo';

/**
 * 예산 소개의 네 번째 장면. 상품 상태를 바꾸면 지출에 잡히고, 예산을 넘을 때는 미리 알려 주는 모습.
 * 상품 카드가 보인 뒤 결제 초과 경고 모달(실제 모달)이 장면 안에 뜨고 닫히기를 되풀이한다. 모달이 좌우로 길어서 설명 아래에 데모를 놓는다(wide). 모달 높이만큼 데모 영역이 필요해서 상품 카드는 셋이다.
 */
const BudgetIntroLinkScene = () => {
  const { sceneRef, active } = useSceneActive();
  const { modalOpen } = useBudgetIntroPaymentDemo(active);

  return (
    <Scene ref={sceneRef}>
      <SceneInner wide>
        <CommonSceneTextBlock
          active={active}
          eyebrow="04 · 연동"
          title={
            <>
              구매만 하면
              <br />
              <Highlight>지출은 자동</Highlight>으로
            </>
          }
        >
          <SceneDesc>
            구매완료로 바꾸면 결제일 기준으로 <Highlight>이번 달 지출에 바로 잡혀요.</Highlight> 따로 관리할 필요가 없어요.
          </SceneDesc>
          <SceneDesc>
            이번달 예산을 넘길때는 <Highlight>구매 처리 전에 미리 알려 줘요.</Highlight>
          </SceneDesc>
        </CommonSceneTextBlock>

        <SceneDemo>
          <FieldStack>
            <EndRow>
              <TonalButton>구매완료로 변경</TonalButton>
            </EndRow>
            <FigureListComponent figures={BUDGET_INTRO_LINK_FIGURES} blinkUrgent={false} />
          </FieldStack>
          {modalOpen && <BudgetPaymentWarningModal warning={BUDGET_INTRO_WARNING} onClose={noop} embedded />}
        </SceneDemo>
      </SceneInner>
    </Scene>
  );
};

export default BudgetIntroLinkScene;
