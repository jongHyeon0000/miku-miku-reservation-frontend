import { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Link } from '@mui/material';
import AuthCardLayout from '@/app/auth/component/AuthCardLayout';
import EmailCodeStep from '@/app/auth/component/EmailCodeStep';
import FindIdEmailForm from '@/app/auth/component/FindIdEmailForm';
import FindIdResult from '@/app/auth/component/FindIdResult';
import StepBar from '@/app/auth/component/StepBar';
import useEmailVerification from '@/app/auth/hook/useEmailVerification';
import useAuth from '@/app/auth/service/useAuth';
import useFindId from '@/app/auth/service/useFindId';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

const STEPS = ['① 이메일', '② 코드 확인', '③ 결과'];

/**
 * 아이디 찾기 화면 (3단계: 이메일 → 코드 확인 → 결과)
 * 코드 확인에 성공하면 화면 이동 없이 바로 아이디를 받아 보여 준다. 이미 로그인한 상태면 /figures 로 보낸다.
 */
const FindIdPage = () => {
  const { isAuthenticated } = useAuth();
  const emailVerification = useEmailVerification('FIND_ID');
  const { findIdLoading, fetchFindId } = useFindId();
  const showResult = useUiStore((state) => state.showResult);
  const [email, setEmail] = useState<string>('');
  const [loginId, setLoginId] = useState<string>('');

  if (isAuthenticated) return <Navigate to="/figures" replace />;

  const handleSendCode = (value: string) => {
    setEmail(value);
    return emailVerification.sendCode({ email: value });
  };

  const handleResendCode = () => emailVerification.sendCode({ email });

  const handleVerifyCode = async (code: string) => {
    const verified = await emailVerification.verifyCode(email, code);
    if (!verified) return;

    const res = await fetchFindId({ email });

    showResult(res);
    if (res.code === API_CODE.OK && res.data) {
      setLoginId(res.data.loginId);
      return;
    }

    /* 인증이 풀렸다(30분 지남 등). 처음부터 다시 받게 한다 */
    emailVerification.reset();
  };

  const loading = emailVerification.loading || findIdLoading;
  const description = [
    '가입한 이메일을 입력해 주세요.',
    `${email} 으로 코드를 보냈어요.`,
    '인증됐어요.',
  ][emailVerification.step];

  return (
    <>
      <AuthCardLayout
        title="아이디 찾기"
        description={description}
        footer={
          <Link component={RouterLink} to="/login">
            로그인으로 돌아가기
          </Link>
        }
      >
        <FieldStack>
          <StepBar steps={STEPS} current={emailVerification.step} />
          {emailVerification.step === 0 && <FindIdEmailForm loading={loading} onSubmit={handleSendCode} />}
          {emailVerification.step === 1 && (
            <EmailCodeStep
              loading={loading}
              resendSeconds={emailVerification.resendSeconds}
              onVerify={handleVerifyCode}
              onResend={handleResendCode}
              onRestart={emailVerification.reset}
              restartLabel="이메일 다시 입력"
            />
          )}
          {emailVerification.step === 2 && loginId !== '' && <FindIdResult loginId={loginId} />}
        </FieldStack>
      </AuthCardLayout>
      <LoadingOverlay open={loading} />
    </>
  );
};

export default FindIdPage;
