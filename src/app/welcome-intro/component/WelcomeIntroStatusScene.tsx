import FigureListActions from '@/app/figure/component/list/FigureListActions';
import FigureListComponent from '@/app/figure/component/list/FigureListComponent';
import FigureStatusModal from '@/app/figure/component/common/FigureStatusModal';
import FigureStatusTabs from '@/app/figure/component/list/FigureStatusTabs';
import { countByTab, filterByTab } from '@/app/figure/utils/FigureUtils';
import { findBulkTransition, getTransitionLabel } from '@/app/figure/utils/FigureTransitionUtils';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { EndRow } from '@/app/common/style/CommonLayout.style';
import { Scene, SceneDemo, SceneDesc, SceneInner } from '@/app/common/style/CommonScene.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { WELCOME_INTRO_FIGURES } from '@/app/welcome-intro/constant/welcomeIntroFigures';
import CommonSceneTextBlock from '@/app/common/component/CommonSceneTextBlock';
import useSceneActive from '@/app/common/hook/useSceneActive';
import useWelcomeIntroStatusDemo from '@/app/welcome-intro/hook/useWelcomeIntroStatusDemo';
import { noop } from '@/app/welcome-intro/utils/WelcomeIntroUtils';

const COUNTS = countByTab(WELCOME_INTRO_FIGURES);

/** 장면 높이에 맞춰 탭의 상품 중 앞의 몇 건만 카드로 보여 준다 */
const SHOWN_COUNT = 3;

/**
 * 장면 5. 상품이 앞으로만 넘어가는 모습. 상태 탭을 장바구니부터 배송완료까지 보여 준 뒤,
 * 선택 모드에서 상품을 체크하고 상태 변경 창(실제 창)이 열린다. 탭과 버튼 줄이 넓어서 설명 아래에 놓는다(wide).
 */
const WelcomeIntroStatusScene = () => {
  const { sceneRef, active } = useSceneActive();
  const { tab, mode, checkedIds, modalOpen, closeModal } = useWelcomeIntroStatusDemo(active);

  const bulk = findBulkTransition(tab);
  const shown = filterByTab(WELCOME_INTRO_FIGURES, tab).slice(0, SHOWN_COUNT);

  return (
    <Scene ref={sceneRef}>
      <SceneInner wide>
        <CommonSceneTextBlock
          active={active}
          eyebrow="04 · 상태 전이"
          title={
            <>
              등록한 상품을 <Highlight>자유롭게</Highlight> 관리해요
            </>
          }
        >
          <SceneDesc>
            <Highlight>장바구니 → 미구매 → 예약완료(선택) → 구매완료 → 배송완료</Highlight>
          </SceneDesc>
          <SceneDesc>
            여러 개의 상품을 <Highlight>선택 모드</Highlight>로 한 번에 넘길 수 있어요.
          </SceneDesc>
        </CommonSceneTextBlock>

        <SceneDemo>
          <FieldStack>
            <EndRow>
              <FigureListActions
                mode={mode}
                hasFigures
                canChangeStatus={bulk !== undefined}
                checkedCount={checkedIds.length}
                shownCount={shown.length}
                actionLabel={bulk ? getTransitionLabel(bulk) : ''}
                onEnterMode={noop}
                onExitMode={noop}
                onToggleAll={noop}
                onAction={noop}
                onInsert={noop}
              />
            </EndRow>
            <FigureStatusTabs tab={tab} counts={COUNTS} onChange={noop} />
            <FigureListComponent
              key={JSON.stringify([tab, mode])}
              figures={shown}
              blinkUrgent={false}
              selectMode={mode !== null}
              checkedIds={checkedIds}
            />
          </FieldStack>
          {modalOpen && bulk && (
            <FigureStatusModal
              title={getTransitionLabel(bulk)}
              transitions={[bulk]}
              totalPrice={0}
              loading={false}
              onSubmit={noop}
              onClose={closeModal}
              embedded
            />
          )}
        </SceneDemo>
      </SceneInner>
    </Scene>
  );
};

export default WelcomeIntroStatusScene;
