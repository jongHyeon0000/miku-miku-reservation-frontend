import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { FormBody } from '@/app/common/style/CommonForm.style';
import { validateEmail } from '@/app/common/utils/ValidationUtils';
interface FindIdEmailFormValues {
  /** 인증을 받을 가입 이메일 */
  email: string;
}

interface FindIdEmailFormProps {
  /** 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 이메일 형식이 통과했을 때 (코드 받기 요청은 페이지가 한다) */
  onSubmit: (email: string) => void;
}

/**
 * 아이디 찾기 첫 단계. 가입한 이메일을 입력하고 인증번호를 받는다.
 */
const FindIdEmailForm = ({ loading, onSubmit }: FindIdEmailFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindIdEmailFormValues>({
    mode: 'onTouched',
    defaultValues: { email: '' },
  });

  const handleValid = ({ email }: FindIdEmailFormValues) => onSubmit(email.trim());

  return (
    <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
      <TextField
        label="이메일"
        type="email"
        autoComplete="email"
        autoFocus
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

export default FindIdEmailForm;
