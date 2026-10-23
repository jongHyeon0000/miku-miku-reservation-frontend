import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { removeAccessToken } from '@/utils/cookieUtils';

/**
 * 로그아웃 커스텀 훅
 *
 * - 쿠키에서 토큰 삭제
 * - 스토어의 사용자 정보 초기화
 * - 보관된 조회 결과를 모두 비운다(다른 계정으로 로그인했을 때 이전 계정의 값이 보이지 않게)
 * 서버에는 로그아웃 API가 없어서 클라이언트가 토큰을 버리는 것이 로그아웃이다.
 */
const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    removeAccessToken();
    logout();
    queryClient.clear();
  };

  return { logout: handleLogout };
};

export default useLogout;
