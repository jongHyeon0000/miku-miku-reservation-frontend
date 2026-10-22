import { DEADLINE_ALERT_MONTHS, URGENT_ALERT } from '@/app/figure/constant/figureStatus';
import FigureListComponent from '@/app/figure/component/list/FigureListComponent';
import FigureUrgentModal from '@/app/figure/component/list/FigureUrgentModal';
import { isDeadlineUnder } from '@/app/figure/utils/FigureUtils';
import { todayString } from '@/app/common/utils/CommonUtils';
import { Scene, SceneDemo, SceneDesc, SceneInner } from '@/app/common/style/CommonScene.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { pickIntroFigures } from '@/app/intro/constant/introFigures';
import IntroSceneText from '@/app/intro/component/IntroSceneText';
import useAlertDemo from '@/app/intro/hook/useAlertDemo';
import useSceneActive from '@/app/intro/hook/useSceneActive';

const FIGURES = pickIntroFigures([3, 4, 5]);

/**
 * 장면 5. 마감이 다가오면 날짜가 깜빡이고 알림 창이 뜨는 모습. 미구매 알림, 예약완료 알림이 실제 창으로 차례로 뜬다.
 * 알림 창이 들어갈 폭을 넉넉히 주려고 설명 아래에 데모를 놓는다(wide).
 */
const IntroAlertScene = () => {
  const { sceneRef, active } = useSceneActive();
  const { urgentTab, closeModal } = useAlertDemo(active);

  const urgentFigures = urgentTab
    ? FIGURES.filter((figure) => figure.status === urgentTab && isDeadlineUnder(figure, todayString(), DEADLINE_ALERT_MONTHS))
    : [];

  return (
    <Scene ref={sceneRef}>
      <SceneInner wide>
        <IntroSceneText
          active={active}
          eyebrow="05 · 알림"
          title={
            <>
              장바구니 담고 잊어버리지 않게
              <br />
              <Highlight>결제 마감일</Highlight> 알려 드려요
            </>
          }
        >
          <SceneDesc>
            미구매 상품은 <Highlight>예약마감일</Highlight>이, 예약완료 상품은 <Highlight>잔금 기한</Highlight>이 다가오면 날짜가 깜빡이고 알림이 떠요.
          </SceneDesc>
          <SceneDesc>결제 타이밍을 놓쳐 품절되는 일을 줄여 줘요.</SceneDesc>
        </IntroSceneText>

        <SceneDemo>
          <FigureListComponent figures={FIGURES} blinkUrgent />
          {urgentTab && (
            <FigureUrgentModal
              title={URGENT_ALERT[urgentTab].title}
              subtitle={URGENT_ALERT[urgentTab].subtitle}
              figures={urgentFigures}
              onClose={closeModal}
              embedded
            />
          )}
        </SceneDemo>
      </SceneInner>
    </Scene>
  );
};

export default IntroAlertScene;
