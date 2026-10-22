import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { FormBody } from '@/app/common/style/CommonForm.style';
import { validateNewPasswordConfirm, validatePassword } from '@/app/common/utils/ValidationUtils';

interface ResetPasswordFormValues {
  /** 새 비밀번호 (8~20자) */
  newPassword: string;

  /** 새 비밀번호 확인 (화면에서만 쓰고 서버에는 보내지 않는다) */
  newPasswordConfirm: string;
}

interface ResetPasswordFormProps {
  /** 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 입력이 통과했을 때 (변경 요청은 페이지가 한다) */
  onSubmit: (newPassword: string) => void;
}

/**
 * 비밀번호 재설정 마지막 단계. 새 비밀번호와 확인을 입력한다.
 */
const ResetPasswordForm = ({ loading, onSubmit }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    mode: 'onTouched',
    defaultValues: { newPassword: '', newPasswordConfirm: '' },
  });

  /* 새 비밀번호 확인은 화면에서만 쓰는 칸이라 서버로 보내는 값에서 뺀다 */
  const handleValid = ({ newPassword }: ResetPasswordFormValues) => onSubmit(newPassword);

  return (
    <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
      <TextField
        label="새 비밀번호"
        type="password"
        autoComplete="new-password"
        autoFocus
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        inputRef={register('newPassword', { validate: validatePassword }).ref}
        {...register('newPassword', { validate: validatePassword })}
      />
      <TextField
        label="새 비밀번호 확인"
        type="password"
        autoComplete="new-password"
        error={!!errors.newPasswordConfirm}
        helperText={errors.newPasswordConfirm?.message}
        inputRef={register('newPasswordConfirm', { validate: validateNewPasswordConfirm }).ref}
        {...register('newPasswordConfirm', { validate: validateNewPasswordConfirm })}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        비밀번호 변경
      </Button>
    </FormBody>
  );
};

export default ResetPasswordForm;
