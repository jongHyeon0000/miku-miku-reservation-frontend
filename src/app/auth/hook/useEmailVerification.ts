import { useState } from 'react';
import { EMAIL_RESEND_SECONDS, type EmailPurpose } from '@/app/auth/constant/emailPurpose';
import useCountdown from '@/app/auth/hook/useCountdown';
import type { EmailCodeRequestBody } from '@/app/auth/interface/EmailCodeRequestBody';
import useSendEmailCode from '@/app/auth/service/useSendEmailCode';
import useVerifyEmailCode from '@/app/auth/service/useVerifyEmailCode';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

/**
 * 이메일 인증 흐름 훅 (가입, 아이디 찾기, 비밀번호 재설정 공통)
 * 코드 받기, 코드 확인, 인증 상태, 재발송 카운트다운을 한 곳에서 맡고 결과 알림도 여기서 띄운다.
 * step 은 화면 단계(0 코드 받기 전, 1 코드 확인 중, 2 인증 완료)이다.
 * 인증 뒤에 이어지는 요청(가입, 아이디 받기, 비밀번호 변경)은 페이지가 한다.
 */
const useEmailVerification = (purpose: EmailPurpose) => {
  const { sendEmailCodeLoading, fetchSendEmailCode } = useSendEmailCode();
  const { verifyEmailCodeLoading, fetchVerifyEmailCode } = useVerifyEmailCode();
  const { countdown, startCountdown } = useCountdown();
  const showResult = useUiStore((state) => state.showResult);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  const sendCode = async (body: EmailCodeRequestBody) => {
    const res = await fetchSendEmailCode(purpose, body);

    showResult(res);
    if (res.code !== API_CODE.OK) return;

    setCodeSent(true);
    startCountdown(EMAIL_RESEND_SECONDS);
  };

  /* 인증에 성공했는지를 돌려준다 (이어서 바로 요청해야 하는 페이지가 쓴다) */
  const verifyCode = async (email: string, code: string): Promise<boolean> => {
    const res = await fetchVerifyEmailCode({ email, purpose, code });

    showResult(res);
    if (res.code !== API_CODE.OK) return false;

    setEmailVerified(true);
    return true;
  };

  /* 인증이 풀렸을 때(30분 지남 등) 처음부터 다시 하게 한다. 재발송 대기는 서버 규칙이라 그대로 둔다 */
  const reset = () => {
    setCodeSent(false);
    setEmailVerified(false);
  };

  const step = emailVerified ? 2 : codeSent ? 1 : 0;

  return {
    step,
    codeSent,
    emailVerified,
    resendSeconds: countdown,
    loading: sendEmailCodeLoading || verifyEmailCodeLoading,
    sendCode,
    verifyCode,
    reset,
  };
};

export default useEmailVerification;
