import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/app/auth/service/useAuth';

/**
 * 로그인이 필요한 라우트를 감싸는 출입문
 * 로그인하지 않았으면 /intro 로 보내고, 원래 가려던 위치(from)를 함께 넘긴다(소개 화면의 로그인 버튼이 /login 으로 이어서 넘긴다).
 */
const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/intro" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
