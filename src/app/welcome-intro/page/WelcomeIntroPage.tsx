import { Navigate, useLocation, type Location } from 'react-router-dom';
import useAuth from '@/app/auth/service/useAuth';
import CommonSceneFrame from '@/app/common/component/CommonSceneFrame';
import WelcomeIntroAlertScene from '@/app/welcome-intro/component/WelcomeIntroAlertScene';
import WelcomeIntroCategoryScene from '@/app/welcome-intro/component/WelcomeIntroCategoryScene';
import WelcomeIntroHero from '@/app/welcome-intro/component/WelcomeIntroHero';
import WelcomeIntroRegisterScene from '@/app/welcome-intro/component/WelcomeIntroRegisterScene';
import WelcomeIntroSearchScene from '@/app/welcome-intro/component/WelcomeIntroSearchScene';
import WelcomeIntroStartScene from '@/app/welcome-intro/component/WelcomeIntroStartScene';
import WelcomeIntroStatusScene from '@/app/welcome-intro/component/WelcomeIntroStatusScene';

/**
 * 소개 화면 (/intro). 로그인하지 않은 채 로그인이 필요한 주소로 들어오면 이곳으로 온다.
 * 장면(한 화면)을 휠, 키보드, 오른쪽 점으로 넘기며 본다. 로그인한 사용자는 /figures 로 보낸다.
 */
const WelcomeIntroPage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from;

  if (isAuthenticated) {
    return <Navigate to="/figures" replace />;
  }

  const scenes = [
    { name: '첫 화면', scene: <WelcomeIntroHero /> },
    { name: '분류', scene: <WelcomeIntroCategoryScene /> },
    { name: '등록', scene: <WelcomeIntroRegisterScene /> },
    { name: '검색', scene: <WelcomeIntroSearchScene /> },
    { name: '상태 전이', scene: <WelcomeIntroStatusScene /> },
    { name: '알림', scene: <WelcomeIntroAlertScene /> },
    { name: '시작하기', scene: <WelcomeIntroStartScene from={from} /> },
  ];

  return <CommonSceneFrame scenes={scenes} />;
};

export default WelcomeIntroPage;
