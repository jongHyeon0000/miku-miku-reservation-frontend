import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { DialogFieldStack, DialogFormBody, FormActions } from '@/app/common/style/CommonForm.style';
import { validateName } from '@/app/common/utils/ValidationUtils';

interface ChangeNameFormValues {
  /** 새 닉네임 */
  name: string;
}

interface ChangeNameDialogProps {
  /** 지금 닉네임 (읽기 전용으로 보여 준다) */
  currentName: string;

  /** 변경 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 입력이 통과했을 때 (서버 요청은 페이지가 한다) */
  onSubmit: (name: string) => void;

  /** 닫기 */
  onClose: () => void;
}

/**
 * 닉네임 변경 창. 현재 닉네임(읽기 전용), 새 닉네임.
 * 닉네임은 중복을 확인하지 않는다. 열릴 때마다 새로 그려지므로 입력값이 비워진 채로 시작한다.
 */
const ChangeNameDialog = ({ currentName, loading, onSubmit, onClose }: ChangeNameDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeNameFormValues>({
    mode: 'onTouched',
    defaultValues: { name: '' },
  });

  const handleValid = ({ name }: ChangeNameFormValues) => {
    onSubmit(name);
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogFormBody noValidate onSubmit={handleSubmit(handleValid)}>
        <DialogTitle>닉네임 변경</DialogTitle>
        <DialogContent>
          <DialogFieldStack>
            <TextField label="현재 닉네임" value={currentName} disabled />
            <TextField
              label="새 닉네임"
              autoComplete="nickname"
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
              inputRef={register('name', { validate: validateName }).ref}
              {...register('name', { validate: validateName })}
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

export default ChangeNameDialog;
