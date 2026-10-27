import { Link as RouterLink, Navigate, useLocation, type Location } from 'react-router-dom';
import { Button, Divider, Link, Typography } from '@mui/material';
import AuthCardLayout from '@/app/auth/component/AuthCardLayout';
import LoginForm from '@/app/auth/component/LoginForm';
import type { LoginRequestBody } from '@/app/auth/interface/LoginRequestBody';
import useAuth from '@/app/auth/service/useAuth';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { useUiStore } from '@/store/uiStore';

/**
 * 로그인 화면
 * 이미 로그인한 상태이거나 로그인에 성공하면, 가려던 주소(RequireAuth 가 넘긴 from)로, 없으면 /figures 로 이동한다.
 */
const LoginPage = () => {
  const { isAuthenticated, login, loginLoading } = useAuth();
  const showResult = useUiStore((state) => state.showResult);
  const location = useLocation();

  const from = (location.state as { from?: Location } | null)?.from;
  const redirectTo = from ? `${from.pathname}${from.search}` : '/figures';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleLoginSubmit = async (body: LoginRequestBody) => {
    const res = await login(body);
    showResult(res);
  };

  return (
    <>
      <AuthCardLayout
        title="로그인"
        footer={
          <FieldStack>
            <Divider>또는</Divider>
            <Button variant="outlined" color="inherit" fullWidth component={RouterLink} to="/signup">
              회원가입
            </Button>
            <Typography variant="body2">
              <Link component={RouterLink} to="/find-id">
                아이디 찾기
              </Link>
              {' · '}
              <Link component={RouterLink} to="/reset-password">
                비밀번호 재설정
              </Link>
            </Typography>
          </FieldStack>
        }
      >
        <LoginForm onSubmit={handleLoginSubmit} loading={loginLoading} />
      </AuthCardLayout>
      <LoadingOverlay open={loginLoading} />
    </>
  );
};

export default LoginPage;
