import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import AuthCardLayout from '@/app/auth/component/AuthCardLayout';
import EmailCodeStep from '@/app/auth/component/EmailCodeStep';
import ResetAccountForm from '@/app/auth/component/ResetAccountForm';
import ResetPasswordForm from '@/app/auth/component/ResetPasswordForm';
import StepBar from '@/app/auth/component/StepBar';
import useEmailVerification from '@/app/auth/hook/useEmailVerification';
import useAuth from '@/app/auth/service/useAuth';
import useResetPassword from '@/app/auth/service/useResetPassword';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

const STEPS = ['① 계정', '② 코드 확인', '③ 새 비밀번호'];

/**
 * 비밀번호 재설정 화면 (3단계: 아이디와 이메일 → 코드 확인 → 새 비밀번호)
 * 1단계에서 입력한 아이디와 이메일은 서버가 마지막 요청에서 다시 받으므로 화면 상태로 들고 있는다.
 * 변경에 성공하면 로그인 화면으로 보낸다. 이미 로그인한 상태면 /figures 로 보낸다.
 */
const ResetPasswordPage = () => {
  const { isAuthenticated } = useAuth();
  const emailVerification = useEmailVerification('RESET_PASSWORD');
  const { resetPasswordLoading, fetchResetPassword } = useResetPassword();
  const showResult = useUiStore((state) => state.showResult);
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  if (isAuthenticated) return <Navigate to="/figures" replace />;

  const handleSendCode = (loginIdValue: string, emailValue: string) => {
    setLoginId(loginIdValue);
    setEmail(emailValue);
    return emailVerification.sendCode({ loginId: loginIdValue, email: emailValue });
  };

  const handleResendCode = () => emailVerification.sendCode({ loginId, email });

  const handleVerifyCode = (code: string) => emailVerification.verifyCode(email, code);

  const handleResetSubmit = async (newPassword: string) => {
    const res = await fetchResetPassword({ loginId, email, newPassword });

    showResult(res);
    if (res.code === API_CODE.OK) {
      navigate('/login');
      return;
    }

    /* 여기서 BAD_REQUEST 는 인증 만료(30분 지남)뿐이다(계정 일치는 코드를 받을 때 이미 확인됨). 처음부터 다시 받게 한다 */
    if (res.code === API_CODE.BAD_REQUEST) emailVerification.reset();
  };

  const loading = emailVerification.loading || resetPasswordLoading;
  const description = [
    '아이디와 가입한 이메일을 입력해 주세요.',
    `${email} 으로 코드를 보냈어요.`,
    '인증됐어요. 30분 안에 마쳐 주세요.',
  ][emailVerification.step];

  return (
    <>
      <AuthCardLayout
        title="비밀번호 재설정"
        description={description}
        footer={
          <Link component={RouterLink} to="/login">
            로그인으로 돌아가기
          </Link>
        }
      >
        <FieldStack>
          <StepBar steps={STEPS} current={emailVerification.step} />
          {emailVerification.step === 0 && <ResetAccountForm loading={loading} onSubmit={handleSendCode} />}
          {emailVerification.step === 1 && (
            <EmailCodeStep
              loading={loading}
              resendSeconds={emailVerification.resendSeconds}
              onVerify={handleVerifyCode}
              onResend={handleResendCode}
              onRestart={emailVerification.reset}
              restartLabel="처음부터 다시"
            />
          )}
          {emailVerification.step === 2 && <ResetPasswordForm loading={loading} onSubmit={handleResetSubmit} />}
        </FieldStack>
      </AuthCardLayout>
      <LoadingOverlay open={loading} />
    </>
  );
};

export default ResetPasswordPage;
