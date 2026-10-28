import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { CategoryLevel } from '@/app/category/common/constant/categoryAxes';
import type { SeriesFormValues } from '@/app/category/series/interface/SeriesFormValues';
import type { SeriesItem } from '@/app/category/series/interface/SeriesItem';
import useCreateSeries from '@/app/category/series/service/useCreateSeries';
import useCreateSeriesGroup from '@/app/category/series/service/useCreateSeriesGroup';
import useUpdateSeries from '@/app/category/series/service/useUpdateSeries';
import useUpdateSeriesGroup from '@/app/category/series/service/useUpdateSeriesGroup';
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

/** 열려 있는 추가/수정 창의 상태. 하위를 추가할 때는 속할 상위 id 를 가진다 */
export type SeriesDialogState =
  | { mode: 'insert'; level: CategoryLevel; parentId?: number }
  | { mode: 'edit'; level: CategoryLevel; target: SeriesItem };

interface SeriesFormDialogProps {
  /** 열린 창의 상태 (추가인지 수정인지, 상위인지 하위인지) */
  dialog: SeriesDialogState;

  /** 저장(썸네일 포함)이 끝났을 때. 저장한 분류의 id 를 넘긴다 */
  onSaved: (targetId: number) => void;

  /** 닫기 */
  onClose: () => void;
}

/**
 * 분류 추가, 수정 창. 왼쪽 썸네일 칸에서 이미지를 고르거나 끌어다 놓는다.
 * 저장 버튼을 누르면 이 창이 이름, 설명을 서버에 보내고, 성공하면 고른 이미지도 이어서 보낸다.
 * 열릴 때마다 새로 그려지므로 defaultValues 가 그때의 값으로 들어간다.
 */
const SeriesFormDialog = ({ dialog, onSaved, onClose }: SeriesFormDialogProps) => {
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const showResult = useUiStore((state) => state.showResult);

  const { createSeriesGroupLoading, fetchCreateSeriesGroup } = useCreateSeriesGroup();
  const { updateSeriesGroupLoading, fetchUpdateSeriesGroup } = useUpdateSeriesGroup();
  const { createSeriesLoading, fetchCreateSeries } = useCreateSeries();
  const { updateSeriesLoading, fetchUpdateSeries } = useUpdateSeries();
  const { uploadThumbnailLoading, fetchUploadThumbnail } = useUploadThumbnail();
  const { deleteThumbnailLoading, fetchDeleteThumbnail } = useDeleteThumbnail();

  const target = dialog.mode === 'edit' ? dialog.target : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SeriesFormValues>({
    mode: 'onTouched',
    defaultValues: { name: target?.name ?? '', description: target?.description ?? '' },
  });

  const [thumbnail, setThumbnail] = useState<ThumbnailChange>({ type: 'none' });

  const levelName = dialog.level === 'group' ? '그룹' : '하위';
  const actionText = dialog.mode === 'insert' ? '추가' : '수정';
  const loading =
    createSeriesGroupLoading ||
    updateSeriesGroupLoading ||
    createSeriesLoading ||
    updateSeriesLoading ||
    uploadThumbnailLoading ||
    deleteThumbnailLoading;

  /* 창 종류(추가, 수정, 상위, 하위)에 맞는 저장 요청을 보낸다 */
  const requestSave = async (values: SeriesFormValues): Promise<ApiResponse<SeriesItem | null>> => {
    if (dialog.mode === 'insert' && dialog.level === 'group') {
      return fetchCreateSeriesGroup(values);
    }

    if (dialog.mode === 'insert') {
      return fetchCreateSeries(dialog.parentId!, values);
    }

    if (dialog.level === 'group') {
      return fetchUpdateSeriesGroup(dialog.target.id, values);
    }

    return fetchUpdateSeries(dialog.target.id, values);
  };

  /* 고른 썸네일 변경 사항을 서버에 보낸다. 보낼 것이 없으면 null */
  const saveThumbnail = async (targetId: number) => {
    if (thumbnail.type === 'none') {
      return null;
    }

    const thumbnailTarget = dialog.level === 'group' ? 'series-group' : 'series';
    return thumbnail.type === 'upload'
      ? fetchUploadThumbnail(thumbnailTarget, targetId, thumbnail.file)
      : fetchDeleteThumbnail(thumbnailTarget, targetId);
  };

  const handleValid = async (values: SeriesFormValues) => {
    const res = await requestSave(values);

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

    onSaved(targetId);
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogFormBody noValidate onSubmit={handleSubmit(handleValid)}>
        <DialogTitle>
          {levelName} {actionText}
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

export default SeriesFormDialog;
