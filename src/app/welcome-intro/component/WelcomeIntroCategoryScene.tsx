import CategoryAxisTabs from '@/app/category/common/component/CategoryAxisTabs';
import FigureTypeCategoryTree from '@/app/category/figure-type/component/FigureTypeCategoryTree';
import SeriesCategoryTree from '@/app/category/series/component/SeriesCategoryTree';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { Scene, SceneDemo, SceneDesc, SceneInner } from '@/app/common/style/CommonScene.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import CommonSceneTextBlock from '@/app/common/component/CommonSceneTextBlock';
import useWelcomeIntroCategoryDemo from '@/app/welcome-intro/hook/useWelcomeIntroCategoryDemo';
import useSceneActive from '@/app/common/hook/useSceneActive';
import { noop } from '@/app/welcome-intro/utils/WelcomeIntroUtils';

/**
 * 장면 2. 분류를 직접 만드는 모습. 형태, 시리즈 같은 축에서 상위 분류와 그 아래 하위 분류가 차례로 채워진다.
 */
const WelcomeIntroCategoryScene = () => {
  const { sceneRef, active } = useSceneActive();
  const { axis, groups, selectedGroupId } = useWelcomeIntroCategoryDemo(active);
  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const childItems = selectedGroup ? selectedGroup.children : [];

  return (
    <Scene ref={sceneRef}>
      <SceneInner>
        <CommonSceneTextBlock
          active={active}
          eyebrow="01 · 분류"
          title={
            <>
              어떤 종류의 상품도 자유롭게,
              <br />
              <Highlight>카테고리는 직접</Highlight> 만들어요
            </>
          }
        >
          <SceneDesc>판매처, 형태, 시리즈, 장르, 캐릭터, 제조사를 상위, 하위 분류로 내 맘대로 만들어요.</SceneDesc>
          <SceneDesc>피규어든 아크릴이든, 내 컬렉션에 맞는 분류 체계를 스스로 만들어 관리할 수 있어요.</SceneDesc>
        </CommonSceneTextBlock>

        <SceneDemo>
          <FieldStack>
            <CategoryAxisTabs axis={axis} onChange={noop} />
            {axis === 'figure-type' ? (
              <FigureTypeCategoryTree
                groups={groups}
                selectedGroupId={selectedGroupId}
                childItems={childItems}
                page={1}
                totalPages={1}
                onSelectGroup={noop}
                onChangePage={noop}
                onInsert={noop}
                onEdit={noop}
                onDelete={noop}
              />
            ) : (
              <SeriesCategoryTree
                groups={groups}
                selectedGroupId={selectedGroupId}
                childItems={childItems}
                page={1}
                totalPages={1}
                onSelectGroup={noop}
                onChangePage={noop}
                onInsert={noop}
                onEdit={noop}
                onDelete={noop}
              />
            )}
          </FieldStack>
        </SceneDemo>
      </SceneInner>
    </Scene>
  );
};

export default WelcomeIntroCategoryScene;
