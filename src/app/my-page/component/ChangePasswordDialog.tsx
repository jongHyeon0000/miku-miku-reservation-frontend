import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { DialogFieldStack, DialogFormBody, FormActions } from '@/app/common/style/CommonForm.style';
import { validateNewPasswordConfirm, validatePassword, validatePasswordRequired } from '@/app/common/utils/ValidationUtils';
import type { ChangePasswordRequestBody } from '@/app/auth/interface/ChangePasswordRequestBody';

interface ChangePasswordFormValues extends ChangePasswordRequestBody {
  /** 새 비밀번호 확인 (화면에서만 쓰고 서버에는 보내지 않는다) */
  newPasswordConfirm: string;
}

interface ChangePasswordDialogProps {
  /** 변경 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 입력이 통과했을 때 (서버 요청은 페이지가 한다) */
  onSubmit: (body: ChangePasswordRequestBody) => void;

  /** 닫기 */
  onClose: () => void;
}

/**
 * 비밀번호 변경 창. 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인.
 * 열릴 때마다 새로 그려지므로 입력값이 비워진 채로 시작한다.
 */
const ChangePasswordDialog = ({ loading, onSubmit, onClose }: ChangePasswordDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    mode: 'onTouched',
    defaultValues: { currentPassword: '', newPassword: '', newPasswordConfirm: '' },
  });

  /* 새 비밀번호 확인은 화면에서만 쓰는 칸이라 서버로 보내는 값에서 뺀다 */
  const handleValid = ({ currentPassword, newPassword }: ChangePasswordFormValues) => {
    onSubmit({ currentPassword, newPassword });
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogFormBody noValidate onSubmit={handleSubmit(handleValid)}>
        <DialogTitle>비밀번호 변경</DialogTitle>
        <DialogContent>
          <DialogFieldStack>
            <TextField
              label="현재 비밀번호"
              type="password"
              autoComplete="current-password"
              autoFocus
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              inputRef={register('currentPassword', { validate: validatePasswordRequired }).ref}
              {...register('currentPassword', { validate: validatePasswordRequired })}
            />
            <TextField
              label="새 비밀번호"
              type="password"
              autoComplete="new-password"
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
          </DialogFieldStack>
        </DialogContent>
        <FormActions>
          <TonalButton onClick={onClose}>닫기</TonalButton>
          <Button type="submit" variant="contained" disabled={loading}>
            변경
          </Button>
        </FormActions>
      </DialogFormBody>
    </Dialog>
  );
};

export default ChangePasswordDialog;
