import { useForm } from 'react-hook-form';
import { Button, InputAdornment, TextField } from '@mui/material';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FormBody } from '@/app/common/style/CommonForm.style';
import {
  validateEmail,
  validateEmailCode,
  validateLoginId,
  validateName,
  validatePassword,
  validatePasswordConfirm,
} from '@/app/common/utils/ValidationUtils';
import type { SignupFormValues } from '@/app/auth/interface/SignupFormValues';
import type { SignupRequestBody } from '@/app/auth/interface/SignupRequestBody';

interface SignupFormProps {
  /** 입력이 통과했을 때 (서버 요청은 페이지가 한다) */
  onSubmit: (body: SignupRequestBody) => void;

  /** 인증 코드 받기를 눌렀을 때 (이메일 형식이 통과한 경우) */
  onSendCode: (email: string) => void;

  /** 인증 코드 확인을 눌렀을 때 (코드 형식이 통과한 경우) */
  onVerifyCode: (email: string, code: string) => void;

  /** 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 인증 코드를 보낸 상태인지 (코드 입력칸을 보여 준다) */
  codeSent: boolean;

  /** 이메일 인증이 끝난 상태인지 (이메일 칸을 잠그고 나머지 칸을 연다) */
  emailVerified: boolean;

  /** 코드를 다시 받을 수 있기까지 남은 초 (0이면 받을 수 있다) */
  resendSeconds: number;
}

/**
 * 회원가입 입력 폼
 * 이메일 인증을 마쳐야 나머지 칸과 가입 버튼이 열린다. 인증 요청과 상태는 페이지가 맡는다.
 * 칸을 처음 벗어날 때 그 칸을 검사하고, 그 뒤에는 입력할 때마다 다시 검사한다. 제출이 막히면 첫 오류 칸으로 커서가 간다.
 */
const SignupForm = ({ onSubmit, onSendCode, onVerifyCode, loading, codeSent, emailVerified, resendSeconds }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SignupFormValues>({
    mode: 'onTouched',
    defaultValues: { loginId: '', email: '', emailCode: '', name: '', password: '', passwordConfirm: '' },
  });

  /* 비밀번호 확인과 인증 코드는 화면에서만 쓰는 칸이라 서버로 보내는 값에서 뺀다 */
  const handleValid = ({ loginId, email, name, password }: SignupFormValues) => {
    onSubmit({ loginId, email: email.trim(), name: name.trim(), password });
  };

  const handleSendCode = async () => {
    if (!(await trigger('email'))) return;
    onSendCode(getValues('email').trim());
  };

  const handleVerifyCode = async () => {
    if (!(await trigger('emailCode'))) return;
    onVerifyCode(getValues('email').trim(), getValues('emailCode').trim());
  };

  const sendCodeLabel = resendSeconds > 0 ? `다시 받기 (${resendSeconds}초)` : codeSent ? '다시 받기' : '인증번호 받기';

  return (
    <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
      <TextField
        label="이메일"
        type="email"
        autoComplete="email"
        autoFocus
        color="success"
        focused={emailVerified}
        error={!!errors.email}
        helperText={emailVerified ? '이메일 인증이 완료됐어요. 30분 안에 가입을 끝내 주세요.' : errors.email?.message}
        inputRef={register('email', { validate: validateEmail }).ref}
        slotProps={{
          input: {
            readOnly: emailVerified,
            endAdornment: emailVerified ? undefined : (
              <InputAdornment position="end">
                <TonalButton type="button" size="small" disabled={loading || resendSeconds > 0} onClick={handleSendCode}>
                  {sendCodeLabel}
                </TonalButton>
              </InputAdornment>
            ),
          },
        }}
        {...register('email', { validate: validateEmail })}
      />
      {codeSent && !emailVerified && (
        <TextField
          label="인증 코드"
          autoComplete="one-time-code"
          error={!!errors.emailCode}
          helperText={errors.emailCode?.message ?? '코드는 10분 동안 유효해요.'}
          inputRef={register('emailCode', { validate: validateEmailCode }).ref}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <TonalButton type="button" size="small" disabled={loading} onClick={handleVerifyCode}>
                    확인
                  </TonalButton>
                </InputAdornment>
              ),
            },
          }}
          {...register('emailCode', { validate: validateEmailCode })}
        />
      )}
      <TextField
        label="아이디"
        autoComplete="username"
        disabled={!emailVerified}
        error={!!errors.loginId}
        helperText={errors.loginId?.message}
        inputRef={register('loginId', { validate: validateLoginId }).ref}
        {...register('loginId', { validate: validateLoginId })}
      />
      <TextField
        label="닉네임"
        autoComplete="nickname"
        disabled={!emailVerified}
        error={!!errors.name}
        helperText={errors.name?.message}
        inputRef={register('name', { validate: validateName }).ref}
        {...register('name', { validate: validateName })}
      />
      <TextField
        label="비밀번호"
        type="password"
        autoComplete="new-password"
        disabled={!emailVerified}
        error={!!errors.password}
        helperText={errors.password?.message}
        inputRef={register('password', { validate: validatePassword }).ref}
        {...register('password', { validate: validatePassword })}
      />
      <TextField
        label="비밀번호 확인"
        type="password"
        autoComplete="new-password"
        disabled={!emailVerified}
        error={!!errors.passwordConfirm}
        helperText={errors.passwordConfirm?.message}
        inputRef={register('passwordConfirm', { validate: validatePasswordConfirm }).ref}
        {...register('passwordConfirm', { validate: validatePasswordConfirm })}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading || !emailVerified}>
        가입하기
      </Button>
    </FormBody>
  );
};

export default SignupForm;
