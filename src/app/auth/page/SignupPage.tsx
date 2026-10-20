import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import AuthCardLayout from '@/app/auth/component/AuthCardLayout';
import SignupForm from '@/app/auth/component/SignupForm';
import useEmailVerification from '@/app/auth/hook/useEmailVerification';
import type { SignupRequestBody } from '@/app/auth/interface/SignupRequestBody';
import useAuth from '@/app/auth/service/useAuth';
import useSignup from '@/app/auth/service/useSignup';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

/**
 * 회원가입 화면
 * 이메일 인증(코드 받기, 확인)을 마쳐야 가입할 수 있다. 가입에 성공하면 로그인 화면으로 보내고, 이미 로그인한 상태면 /figures 로 보낸다.
 */
const SignupPage = () => {
  const { isAuthenticated } = useAuth();
  const { signupLoading, fetchSignup } = useSignup();
  const emailVerification = useEmailVerification('SIGNUP');
  const showResult = useUiStore((state) => state.showResult);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/figures" replace />;

  const handleSendCode = (email: string) => emailVerification.sendCode({ email });

  const handleSignupSubmit = async (body: SignupRequestBody) => {
    const res = await fetchSignup(body);

    showResult(res);
    if (res.code === API_CODE.OK) {
      navigate('/login');
      return;
    }

    /* 가입에서 BAD_REQUEST 는 인증 만료(30분 지남)뿐이다. 인증을 풀고 코드 받기부터 다시 하게 한다 */
    if (res.code === API_CODE.BAD_REQUEST) {
      emailVerification.reset();
    }
  };

  const loading = signupLoading || emailVerification.loading;

  return (
    <>
      <AuthCardLayout
        title="회원가입"
        footer={
          <>
            이미 계정이 있으신가요?{' '}
            <Link component={RouterLink} to="/login">
              로그인
            </Link>
          </>
        }
      >
        <SignupForm
          onSubmit={handleSignupSubmit}
          onSendCode={handleSendCode}
          onVerifyCode={emailVerification.verifyCode}
          loading={loading}
          codeSent={emailVerification.codeSent}
          emailVerified={emailVerification.emailVerified}
          resendSeconds={emailVerification.resendSeconds}
        />
      </AuthCardLayout>
      <LoadingOverlay open={loading} />
    </>
  );
};

export default SignupPage;
