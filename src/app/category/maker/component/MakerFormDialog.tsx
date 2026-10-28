import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { MakerFormValues } from '@/app/category/maker/interface/MakerFormValues';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';
import useCreateMaker from '@/app/category/maker/service/useCreateMaker';
import useUpdateMaker from '@/app/category/maker/service/useUpdateMaker';
import { FieldColumn, FormLayout, ThumbnailBox } from '@/app/category/common/style/CategoryForm.style';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import ThumbnailUploader from '@/app/common/component/ThumbnailUploader';
import type { ThumbnailChange } from '@/app/common/interface/ThumbnailChange';
import useDeleteThumbnail from '@/app/common/service/useDeleteThumbnail';
import useUploadThumbnail from '@/app/common/service/useUploadThumbnail';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { DialogFormBody, FormActions } from '@/app/common/style/CommonForm.style';
import { validateCategoryDescription, validateCategoryName } from '@/app/common/utils/ValidationUtils';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

/** 열려 있는 추가/수정 창의 상태 */
export type MakerDialogState = { mode: 'insert' } | { mode: 'edit'; target: MakerItem };

interface MakerFormDialogProps {
  /** 열린 창의 상태 (추가인지 수정인지) */
  dialog: MakerDialogState;

  /** 저장(썸네일 포함)이 끝났을 때 */
  onSaved: () => void;

  /** 닫기 */
  onClose: () => void;
}

/**
 * 제조사 추가, 수정 창. 왼쪽 썸네일 칸에서 이미지를 고르거나 끌어다 놓는다.
 * 저장 버튼을 누르면 이 창이 이름, 설명을 서버에 보내고, 성공하면 고른 이미지도 이어서 보낸다.
 * 열릴 때마다 새로 그려지므로 defaultValues 가 그때의 값으로 들어간다.
 */
const MakerFormDialog = ({ dialog, onSaved, onClose }: MakerFormDialogProps) => {
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const showResult = useUiStore((state) => state.showResult);

  const { createMakerLoading, fetchCreateMaker } = useCreateMaker();
  const { updateMakerLoading, fetchUpdateMaker } = useUpdateMaker();
  const { uploadThumbnailLoading, fetchUploadThumbnail } = useUploadThumbnail();
  const { deleteThumbnailLoading, fetchDeleteThumbnail } = useDeleteThumbnail();

  const target = dialog.mode === 'edit' ? dialog.target : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MakerFormValues>({
    mode: 'onTouched',
    defaultValues: { name: target?.name ?? '', description: target?.description ?? '' },
  });

  const [thumbnail, setThumbnail] = useState<ThumbnailChange>({ type: 'none' });

  const actionText = dialog.mode === 'insert' ? '추가' : '수정';
  const loading = createMakerLoading || updateMakerLoading || uploadThumbnailLoading || deleteThumbnailLoading;

  /* 고른 썸네일 변경 사항을 서버에 보낸다. 보낼 것이 없으면 null */
  const saveThumbnail = async (targetId: number) => {
    if (thumbnail.type === 'none') {
      return null;
    }

    return thumbnail.type === 'upload'
      ? fetchUploadThumbnail('maker', targetId, thumbnail.file)
      : fetchDeleteThumbnail('maker', targetId);
  };

  const handleValid = async (values: MakerFormValues) => {
    const res: ApiResponse<MakerItem | null> =
      dialog.mode === 'insert' ? await fetchCreateMaker(values) : await fetchUpdateMaker(dialog.target.id, values);

    if (res.code !== API_CODE.OK) {
      showResult(res);
      return;
    }

    /* 썸네일은 분류를 저장해 id 를 받은 뒤에 올린다(추가는 응답의 새 id, 수정은 원래 id) */
    const targetId = dialog.mode === 'insert' ? res.data!.id : dialog.target.id;
    const thumbnailRes = await saveThumbnail(targetId);

    if (thumbnailRes !== null && thumbnailRes.code !== API_CODE.OK) {
      showSnackbar(`저장했지만 이미지는 처리하지 못했어요. ${thumbnailRes.message}`, 'warning');
    } else {
      showResult(res);
    }

    onSaved();
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogFormBody noValidate onSubmit={handleSubmit(handleValid)}>
        <DialogTitle>
          제조사 {actionText}
        </DialogTitle>
        <DialogContent>
          <FormLayout>
            <ThumbnailBox>
              <ThumbnailUploader currentUrl={target?.thumbnailUrl} value={thumbnail} onChange={setThumbnail} disabled={loading} />
            </ThumbnailBox>
            <FieldColumn>
              <TextField
                label="이름"
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message}
                inputRef={register('name', { validate: validateCategoryName }).ref}
                {...register('name', { validate: validateCategoryName })}
              />
              <TextField
                label="설명 (선택)"
                multiline
                minRows={5}
                maxRows={5}
                error={!!errors.description}
                helperText={errors.description?.message}
                inputRef={register('description', { validate: validateCategoryDescription }).ref}
                {...register('description', { validate: validateCategoryDescription })}
              />
            </FieldColumn>
          </FormLayout>
        </DialogContent>
        <FormActions>
          <TonalButton onClick={onClose}>닫기</TonalButton>
          <Button type="submit" variant="contained" disabled={loading}>
            {actionText}
          </Button>
        </FormActions>
      </DialogFormBody>
      <LoadingOverlay open={loading} />
    </Dialog>
  );
};

export default MakerFormDialog;
