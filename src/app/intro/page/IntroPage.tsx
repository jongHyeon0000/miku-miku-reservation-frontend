import { useLocation, type Location } from 'react-router-dom';
import useAuth from '@/app/auth/service/useAuth';
import { SceneDot, SceneDots, SceneScroller } from '@/app/common/style/CommonScene.style';
import IntroAlertScene from '@/app/intro/component/IntroAlertScene';
import IntroCategoryScene from '@/app/intro/component/IntroCategoryScene';
import IntroHero from '@/app/intro/component/IntroHero';
import IntroRegisterScene from '@/app/intro/component/IntroRegisterScene';
import IntroSearchScene from '@/app/intro/component/IntroSearchScene';
import IntroStartScene from '@/app/intro/component/IntroStartScene';
import IntroStatusScene from '@/app/intro/component/IntroStatusScene';
import useSceneScroll from '@/app/intro/hook/useSceneScroll';

/* 진행 점의 이름 (장면 순서와 같다) */
const SCENE_NAMES = ['첫 화면', '분류', '등록', '검색', '상태 전이', '알림', '시작하기'];

/**
 * 소개 화면 (/intro). 로그인하지 않은 채 로그인이 필요한 주소로 들어오면 이곳으로 온다.
 * 장면(한 화면)을 휠, 키보드, 오른쪽 점으로 넘기며 보고, 로그인한 사용자에게는 마지막 시작하기 장면을 보여 주지 않는다.
 */
const IntroPage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from;

  const sceneNames = isAuthenticated ? SCENE_NAMES.slice(0, -1) : SCENE_NAMES;
  const { scrollerRef, viewHeight, index, goTo } = useSceneScroll(sceneNames.length);

  return (
    <>
      <SceneScroller ref={scrollerRef} viewHeight={viewHeight}>
        <IntroHero />
        <IntroCategoryScene />
        <IntroRegisterScene />
        <IntroSearchScene />
        <IntroStatusScene />
        <IntroAlertScene />
        {!isAuthenticated && <IntroStartScene from={from} />}
      </SceneScroller>

      <SceneDots>
        {sceneNames.map((name, sceneIndex) => (
          <SceneDot key={name} type="button" active={sceneIndex === index} title={name} aria-label={name} onClick={() => goTo(sceneIndex)} />
        ))}
      </SceneDots>
    </>
  );
};

export default IntroPage;
