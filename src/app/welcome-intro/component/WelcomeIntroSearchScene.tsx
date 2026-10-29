import FigureFilterBar from '@/app/figure/component/filter/FigureFilterBar';
import FigureFilterChips from '@/app/figure/component/filter/FigureFilterChips';
import FigureListComponent from '@/app/figure/component/list/FigureListComponent';
import { applyFilters, buildFilterOptions, sortFigures } from '@/app/figure/utils/FigureUtils';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { Scene, SceneDemo, SceneDesc, SceneInner } from '@/app/common/style/CommonScene.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { WELCOME_INTRO_FIGURES } from '@/app/welcome-intro/constant/welcomeIntroFigures';
import CommonSceneTextBlock from '@/app/common/component/CommonSceneTextBlock';
import useSceneActive from '@/app/common/hook/useSceneActive';
import useWelcomeIntroSearchDemo from '@/app/welcome-intro/hook/useWelcomeIntroSearchDemo';
import { noop } from '@/app/welcome-intro/utils/WelcomeIntroUtils';

/** 장면 높이에 맞춰 걸러진 상품 중 앞의 몇 건만 카드로 보여 준다 */
const SHOWN_COUNT = 3;

const OPTIONS = buildFilterOptions(WELCOME_INTRO_FIGURES);

/**
 * 장면 4. 분류로 골라 보는 모습. 그룹 단위, 개별 분류, 직접 만든 분류, 배송월, 정렬을 차례로 바꿀 때마다 실제 목록처럼 카드가 새로 떠오른다.
 * 필터 줄은 폭이 넓어서 설명 아래에 놓는다(wide).
 */
const WelcomeIntroSearchScene = () => {
  const { sceneRef, active } = useSceneActive();
  const { filters, month, sort } = useWelcomeIntroSearchDemo(active);
  const matched = sortFigures(applyFilters(WELCOME_INTRO_FIGURES, filters, month), sort);

  return (
    <Scene ref={sceneRef}>
      <SceneInner wide>
        <CommonSceneTextBlock
          active={active}
          eyebrow="03 · 검색"
          title={
            <>
              원하는 대로 <Highlight>골라서</Highlight> 필터링 해요
            </>
          }
        >
          <SceneDesc>
            <Highlight>그룹 단위</Highlight>로도, <Highlight>개별 분류</Highlight>로도, <Highlight>내가 만든 분류</Highlight>로 마음대로 필터링할 수 있어요.
          </SceneDesc>
          <SceneDesc>
            배송월과 정렬로 <Highlight>이번 달에 올 것</Highlight>만 깔끔하게 모아 봐요.
          </SceneDesc>
        </CommonSceneTextBlock>

        <SceneDemo>
          <FieldStack>
            <FigureFilterBar
              options={OPTIONS}
              filters={filters}
              month={month}
              sort={sort}
              onFilterChange={noop}
              onMonthChange={noop}
              onSortChange={noop}
              onReset={noop}
            />
            <FigureFilterChips filters={filters} options={OPTIONS} onClear={noop} />
            <FigureListComponent key={JSON.stringify([filters, month, sort])} figures={matched.slice(0, SHOWN_COUNT)} blinkUrgent={false} />
          </FieldStack>
        </SceneDemo>
      </SceneInner>
    </Scene>
  );
};

export default WelcomeIntroSearchScene;
