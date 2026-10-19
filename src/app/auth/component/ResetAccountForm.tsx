import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { FormBody } from '@/app/common/style/CommonForm.style';
import { validateEmail, validateLoginIdRequired } from '@/app/common/utils/ValidationUtils';
import type { ResetPasswordRequestBody } from '@/app/auth/interface/ResetPasswordRequestBody';

type ResetAccountFormValues = Pick<ResetPasswordRequestBody, 'loginId' | 'email'>;

interface ResetAccountFormProps {
  /** 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 입력이 통과했을 때 (코드 받기 요청은 페이지가 한다) */
  onSubmit: (loginId: string, email: string) => void;
}

/**
 * 비밀번호 재설정 첫 단계. 아이디와 가입한 이메일을 입력하고 인증번호를 받는다.
 */
const ResetAccountForm = ({ loading, onSubmit }: ResetAccountFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetAccountFormValues>({
    mode: 'onTouched',
    defaultValues: { loginId: '', email: '' },
  });

  const handleValid = ({ loginId, email }: ResetAccountFormValues) => onSubmit(loginId.trim(), email.trim());

  return (
    <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
      <TextField
        label="아이디"
        autoComplete="username"
        autoFocus
        error={!!errors.loginId}
        helperText={errors.loginId?.message}
        inputRef={register('loginId', { validate: validateLoginIdRequired }).ref}
        {...register('loginId', { validate: validateLoginIdRequired })}
      />
      <TextField
        label="이메일"
        type="email"
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        inputRef={register('email', { validate: validateEmail }).ref}
        {...register('email', { validate: validateEmail })}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        인증번호 받기
      </Button>
    </FormBody>
  );
};

export default ResetAccountForm;
