import { Fragment, type ReactNode } from 'react';
import { SceneDot, SceneDots, SceneScroller } from '@/app/common/style/CommonScene.style';
import useSceneScroll from '@/app/common/hook/useSceneScroll';

interface SceneItem {
  /** 오른쪽 진행 점의 이름 (점에 마우스를 올리면 보이고, 목록 안에서 겹치지 않아야 한다) */
  name: string;

  /** 장면 (Scene) */
  scene: ReactNode;
}

interface CommonSceneFrameProps {
  /** 장면 목록. 적은 순서대로 한 화면씩 쌓이고, 이름은 같은 순서의 진행 점이 된다 */
  scenes: SceneItem[];
}

/**
 * 한 화면(장면)씩 넘겨 보는 틀. 스크롤 영역과 오른쪽 진행 점을 그리고, 휠, 키보드, 점으로 장면을 넘긴다.
 * 소개 화면과 예산관리 소개가 같이 쓴다.
 */
const CommonSceneFrame = ({ scenes }: CommonSceneFrameProps) => {
  const { scrollerRef, viewHeight, index, goTo } = useSceneScroll(scenes.length);

  return (
    <>
      <SceneScroller ref={scrollerRef} viewHeight={viewHeight}>
        {scenes.map((item) => (
          <Fragment key={item.name}>{item.scene}</Fragment>
        ))}
      </SceneScroller>

      <SceneDots>
        {scenes.map((item, sceneIndex) => (
          <SceneDot
            key={item.name}
            type="button"
            active={sceneIndex === index}
            title={item.name}
            aria-label={item.name}
            onClick={() => goTo(sceneIndex)}
          />
        ))}
      </SceneDots>
    </>
  );
};

export default CommonSceneFrame;
