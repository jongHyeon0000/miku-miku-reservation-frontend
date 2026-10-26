import { useState } from 'react';
import { Button } from '@mui/material';
import MakerCategoryTree from '@/app/category/maker/component/MakerCategoryTree';
import MakerFormDialog from '@/app/category/maker/component/MakerFormDialog';
import type { MakerFormValues } from '@/app/category/maker/interface/MakerFormValues';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';
import useCreateMaker from '@/app/category/maker/service/useCreateMaker';
import useUpdateMaker from '@/app/category/maker/service/useUpdateMaker';
import useDeleteMaker from '@/app/category/maker/service/useDeleteMaker';
import useReadMakerList from '@/app/category/maker/service/useReadMakerList';
import useReadMakerUsage from '@/app/category/maker/service/useReadMakerUsage';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import type { ThumbnailChange } from '@/app/common/interface/ThumbnailChange';
import useDeleteThumbnail from '@/app/common/service/useDeleteThumbnail';
import useUploadThumbnail from '@/app/common/service/useUploadThumbnail';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

/** 열려 있는 추가/수정 창의 상태 */
type DialogState = { mode: 'insert' } | { mode: 'edit'; target: MakerItem };

/**
 * 제조사 목록과 추가, 수정, 삭제. 상위만 있는 축이라 목록 한 줄이 곧 분류다.
 * 추가, 수정, 삭제 훅이 성공하면 키를 울려서 목록이 새 값으로 다시 그려진다.
 */
const MakerCategoryContent = () => {
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const showResult = useUiStore((state) => state.showResult);

  const [page, setPage] = useState<number>(1);
  const { makerList, makerListLoading, fetchReadMakerList } = useReadMakerList(page);
  const { createMakerLoading, fetchCreateMaker } = useCreateMaker();
  const { updateMakerLoading, fetchUpdateMaker } = useUpdateMaker();
  const { deleteMakerLoading, fetchDeleteMaker } = useDeleteMaker();
  const { makerUsageLoading, fetchReadMakerUsage } = useReadMakerUsage();
  const { uploadThumbnailLoading, fetchUploadThumbnail } = useUploadThumbnail();
  const { deleteThumbnailLoading, fetchDeleteThumbnail } = useDeleteThumbnail();

  const [dialog, setDialog] = useState<DialogState | null>(null);

  const makerPageData = makerList?.data;
  const makers = makerPageData ? makerPageData.items : [];
  const totalPages = makerPageData ? makerPageData.totalPages : 0;
  const isBusy =
    makerListLoading ||
    createMakerLoading ||
    updateMakerLoading ||
    deleteMakerLoading ||
    makerUsageLoading ||
    uploadThumbnailLoading ||
    deleteThumbnailLoading;

  const handleSave = async (dialog: DialogState, values: MakerFormValues, thumbnail: ThumbnailChange) => {
    const res: ApiResponse<MakerItem | null> =
      dialog.mode === 'insert' ? await fetchCreateMaker(values) : await fetchUpdateMaker(dialog.target.id, values);

    if (res.code !== API_CODE.OK) {
      showResult(res);
      return;
    }

    /* 썸네일은 분류를 저장해 id 를 받은 뒤에 올린다(추가는 응답의 새 id, 수정은 원래 id) */
    const targetId = dialog.mode === 'insert' ? res.data!.id : dialog.target.id;
    const thumbnailRes = await saveThumbnail(targetId, thumbnail);

    if (thumbnailRes !== null && thumbnailRes.code !== API_CODE.OK) {
      showSnackbar(`저장했지만 이미지는 처리하지 못했어요. ${thumbnailRes.message}`, 'warning');
    } else {
      showResult(res);
    }
    setDialog(null);
  };

  /* 고른 썸네일 변경 사항을 서버에 보낸다. 보낼 것이 없으면 null */
  const saveThumbnail = async (targetId: number, thumbnail: ThumbnailChange) => {
    if (thumbnail.type === 'none') return null;

    return thumbnail.type === 'upload'
      ? fetchUploadThumbnail('maker', targetId, thumbnail.file)
      : fetchDeleteThumbnail('maker', targetId);
  };

  const handleDelete = async (target: MakerItem) => {
    const usageRes = await fetchReadMakerUsage(target.id);
    if (usageRes.code !== API_CODE.OK) {
      showResult(usageRes);
      return;
    }

    const usageText =
      usageRes.data!.count === 0
        ? '이 분류를 쓰는 상품은 없어요.'
        : `이 분류를 쓰는 상품 ${usageRes.data!.count}개는 '기타'로 옮겨져요.`;

    const confirmed = await showConfirmAlert({
      title: `'${target.name}'을(를) 삭제할까요?`,
      text: `${usageText} 삭제하면 되돌릴 수 없어요.`,
      confirmText: '삭제',
      danger: true,
      focusCancel: true,
    });
    if (!confirmed) return;

    const res = await fetchDeleteMaker(target.id);
    showResult(res);
    if (res.code !== API_CODE.OK) return;

    /* 마지막 쪽의 마지막 항목을 지웠으면 그 쪽이 비므로 앞 쪽으로 돌아간다 */
    if (makers.length === 1 && page > 1) setPage(page - 1);
  };

  return (
    <>
      {makerList && makerList.code !== API_CODE.OK && <ErrorView message={makerList.message} onRetry={fetchReadMakerList} />}
      {makerList?.code === API_CODE.OK && makers.length === 0 && page === 1 && (
        <EmptyView
          message="등록된 제조사가 없어요"
          action={
            <Button variant="contained" onClick={() => setDialog({ mode: 'insert' })}>
              제조사 추가
            </Button>
          }
        />
      )}
      {makerList?.code === API_CODE.OK && makers.length > 0 && (
        <MakerCategoryTree
          groups={makers}
          page={page}
          totalPages={totalPages}
          onChangePage={setPage}
          onInsert={() => setDialog({ mode: 'insert' })}
          onEdit={(target) => setDialog({ mode: 'edit', target })}
          onDelete={handleDelete}
        />
      )}

      {dialog && (
        <MakerFormDialog
          mode={dialog.mode}
          levelName="제조사"
          target={dialog.mode === 'edit' ? dialog.target : undefined}
          loading={createMakerLoading || updateMakerLoading || uploadThumbnailLoading || deleteThumbnailLoading}
          onSubmit={(values, thumbnail) => handleSave(dialog, values, thumbnail)}
          onClose={() => setDialog(null)}
        />
      )}

      <LoadingOverlay open={isBusy} />
    </>
  );
};

export default MakerCategoryContent;
