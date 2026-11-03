import { useForm, useWatch } from 'react-hook-form';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { DialogFieldStack, DialogFormBody, FormActions } from '@/app/common/style/CommonForm.style';
import { validateBiography, validateName } from '@/app/common/utils/ValidationUtils';
import type { UpdateProfileRequestBody } from '@/app/auth/interface/UpdateProfileRequestBody';

interface EditProfileDialogProps {
  /** 지금 닉네임 (입력칸의 처음 값) */
  currentName: string;

  /** 지금 자기소개 (입력칸의 처음 값). 없으면 빈 글자 */
  currentBiography: string;

  /** 변경 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 입력이 통과했을 때 (서버 요청은 페이지가 한다) */
  onSubmit: (body: UpdateProfileRequestBody) => void;

  /** 닫기 */
  onClose: () => void;
}

/**
 * 프로필 수정 창. 닉네임, 자기소개(선택, 300자 이하)를 한 번에 저장한다.
 * 닉네임은 중복을 확인하지 않는다. 열릴 때마다 새로 그려지므로 지금 값으로 시작한다.
 */
const EditProfileDialog = ({ currentName, currentBiography, loading, onSubmit, onClose }: EditProfileDialogProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateProfileRequestBody>({
    mode: 'onTouched',
    defaultValues: { name: currentName, biography: currentBiography },
  });

  const biography = useWatch({ control, name: 'biography' });
  const biographyLength = [...biography.trim()].length;
  const biographyHelp = errors.biography ? errors.biography.message : `${biographyLength} / 300`;

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogFormBody noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>프로필 수정</DialogTitle>
        <DialogContent>
          <DialogFieldStack>
            <TextField
              label="닉네임"
              autoComplete="nickname"
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
              inputRef={register('name', { validate: validateName }).ref}
              {...register('name', { validate: validateName })}
            />
            <TextField
              label="자기소개 (선택)"
              multiline
              minRows={5}
              maxRows={5}
              error={!!errors.biography}
              helperText={biographyHelp}
              inputRef={register('biography', { validate: validateBiography }).ref}
              {...register('biography', { validate: validateBiography })}
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

export default EditProfileDialog;
