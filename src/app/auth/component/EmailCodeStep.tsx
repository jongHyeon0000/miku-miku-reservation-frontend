import { useForm } from 'react-hook-form';
import { Button, Link, TextField } from '@mui/material';
import { FormBody } from '@/app/common/style/CommonForm.style';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { LabelText } from '@/app/common/style/CommonText.style';
import { validateEmailCode } from '@/app/common/utils/ValidationUtils';
import type { EmailCodeFormValues } from '@/app/auth/interface/EmailCodeFormValues';

interface EmailCodeStepProps {
  /** 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 코드를 다시 받을 수 있기까지 남은 초 (0이면 받을 수 있다) */
  resendSeconds: number;

  /** 코드 형식이 통과했을 때 (확인 요청은 페이지가 한다) */
  onVerify: (code: string) => void;

  /** 코드 다시 받기를 눌렀을 때 */
  onResend: () => void;

  /** 첫 단계로 돌아가기를 눌렀을 때 */
  onRestart: () => void;

  /** 첫 단계로 돌아가는 링크 글자 (예: "이메일 다시 입력") */
  restartLabel: string;
}

/**
 * 인증 코드 확인 단계 (아이디 찾기와 비밀번호 재설정이 같이 쓴다)
 * 코드 칸과 [확인], 아래에 첫 단계로 돌아가기와 코드 다시 받기가 있다.
 */
const EmailCodeStep = ({ loading, resendSeconds, onVerify, onResend, onRestart, restartLabel }: EmailCodeStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailCodeFormValues>({
    mode: 'onTouched',
    defaultValues: { emailCode: '' },
  });

  const handleValid = ({ emailCode }: EmailCodeFormValues) => onVerify(emailCode.trim());

  return (
    <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
      <TextField
        label="인증 코드"
        autoComplete="one-time-code"
        autoFocus
        error={!!errors.emailCode}
        helperText={errors.emailCode?.message ?? '코드는 10분 동안 유효해요.'}
        inputRef={register('emailCode', { validate: validateEmailCode }).ref}
        {...register('emailCode', { validate: validateEmailCode })}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        확인
      </Button>
      <SpreadRow>
        <Link component="button" type="button" onClick={onRestart}>
          {restartLabel}
        </Link>
        {resendSeconds > 0 ? (
          <LabelText>코드 다시 받기 ({resendSeconds}초)</LabelText>
        ) : (
          <Link component="button" type="button" disabled={loading} onClick={onResend}>
            코드 다시 받기
          </Link>
        )}
      </SpreadRow>
    </FormBody>
  );
};

export default EmailCodeStep;
