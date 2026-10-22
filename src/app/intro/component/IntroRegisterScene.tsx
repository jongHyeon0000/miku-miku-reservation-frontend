import FigureListComponent from '@/app/figure/component/list/FigureListComponent';
import FigurePickField from '@/app/figure/component/form/FigurePickField';
import { InfoGroup } from '@/app/figure/style/FigureInfo.style';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { Scene, SceneDemo, SceneDesc, SceneInner } from '@/app/common/style/CommonScene.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { INTRO_PICK_POOLS } from '@/app/intro/constant/introCategories';
import { INTRO_REGISTER_FIGURE } from '@/app/intro/constant/introFigures';
import IntroSceneText from '@/app/intro/component/IntroSceneText';
import useRegisterDemo from '@/app/intro/hook/useRegisterDemo';
import useSceneActive from '@/app/intro/hook/useSceneActive';
import { noop } from '@/app/intro/utils/IntroUtils';

/**
 * 장면 3. 만들어 둔 분류를 골라 상품을 등록하는 모습. 분류를 하나씩 고르면 칩이 붙고, 다 고르면 완성된 상품 카드가 나온다.
 */
const IntroRegisterScene = () => {
  const { sceneRef, active } = useSceneActive();
  const { chosen, done } = useRegisterDemo(active);

  return (
    <Scene ref={sceneRef}>
      <SceneInner>
        <IntroSceneText
          active={active}
          eyebrow="02 · 등록"
          title={
            <>
              직접 만든 카테고리에서
              <br />
              <Highlight>자유롭게</Highlight> 등록해요
            </>
          }
        >
          <SceneDesc>굿즈마다 다른 형태, 판매처, 시리즈, 제조사를 내가 만든 분류에서 골라 붙여요.</SceneDesc>
          <SceneDesc>설명에는 간단한 이미지도 넣을 수 있어요.</SceneDesc>
        </IntroSceneText>

        <SceneDemo>
          <FieldStack>
            <InfoGroup>
              <FigurePickField
                label="형태"
                dialogTitle="형태 추가"
                chips={chosen.figureType}
                pool={INTRO_PICK_POOLS.figureType}
                multiple={false}
                showGroup
                onChange={noop}
              />
              <FigurePickField
                label="판매처"
                dialogTitle="판매처 추가"
                chips={chosen.shop}
                pool={INTRO_PICK_POOLS.shop}
                multiple={false}
                showGroup
                onChange={noop}
              />
              <FigurePickField
                label="시리즈"
                dialogTitle="시리즈 추가"
                chips={chosen.series}
                pool={INTRO_PICK_POOLS.series}
                multiple
                showGroup
                onChange={noop}
              />
              <FigurePickField
                label="제조사"
                dialogTitle="제조사 추가"
                chips={chosen.maker}
                pool={INTRO_PICK_POOLS.maker}
                multiple={false}
                onChange={noop}
              />
            </InfoGroup>
            {done && <FigureListComponent figures={[INTRO_REGISTER_FIGURE]} blinkUrgent={false} />}
          </FieldStack>
        </SceneDemo>
      </SceneInner>
    </Scene>
  );
};

export default IntroRegisterScene;
