import { useState } from 'react';
import { Button } from '@mui/material';
import { PROTECTED_CATEGORY_NAME, type CategoryLevel } from '@/app/category/common/constant/categoryAxes';
import FigureTypeCategoryTree from '@/app/category/figure-type/component/FigureTypeCategoryTree';
import FigureTypeFormDialog from '@/app/category/figure-type/component/FigureTypeFormDialog';
import type { FigureTypeFormValues } from '@/app/category/figure-type/interface/FigureTypeFormValues';
import type { FigureTypeItem } from '@/app/category/figure-type/interface/FigureTypeItem';
import useCreateFigureTypeGroup from '@/app/category/figure-type/service/useCreateFigureTypeGroup';
import useCreateFigureType from '@/app/category/figure-type/service/useCreateFigureType';
import useUpdateFigureTypeGroup from '@/app/category/figure-type/service/useUpdateFigureTypeGroup';
import useUpdateFigureType from '@/app/category/figure-type/service/useUpdateFigureType';
import useDeleteFigureTypeGroup from '@/app/category/figure-type/service/useDeleteFigureTypeGroup';
import useDeleteFigureType from '@/app/category/figure-type/service/useDeleteFigureType';
import useDeleteFigureTypeList from '@/app/category/figure-type/service/useDeleteFigureTypeList';
import useReadFigureTypeList from '@/app/category/figure-type/service/useReadFigureTypeList';
import useReadFigureTypeChildList from '@/app/category/figure-type/service/useReadFigureTypeChildList';
import useReadFigureTypeGroupUsage from '@/app/category/figure-type/service/useReadFigureTypeGroupUsage';
import useReadFigureTypeUsage from '@/app/category/figure-type/service/useReadFigureTypeUsage';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import useSelection from '@/app/common/hook/useSelection';
import type { ThumbnailChange } from '@/app/common/interface/ThumbnailChange';
import useDeleteThumbnail from '@/app/common/service/useDeleteThumbnail';
import useUploadThumbnail from '@/app/common/service/useUploadThumbnail';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

/** 일괄 삭제 확인창 글자 */
const BULK_DELETE_ALERT = {
  title: (count: number) => `${count}개를 삭제할까요?`,
  text: "선택한 분류를 쓰는 상품은 '기타'로 옮겨져요. 삭제하면 되돌릴 수 없어요.",
  confirmText: '삭제',
};

/** 열려 있는 추가/수정 창의 상태. 하위를 추가할 때는 속할 상위 id 를 가진다 */
type DialogState =
  | { mode: 'insert'; level: CategoryLevel; parentId?: number }
  | { mode: 'edit'; level: CategoryLevel; target: FigureTypeItem };

/**
 * 형태 분류 목록과 추가, 수정, 삭제. 상태(조회 결과, 고른 상위, 열린 창)는 이 컴포넌트가 들고 있다.
 * 추가, 수정, 삭제 훅이 성공하면 키를 울려서 목록이 새 값으로 다시 그려진다.
 */
const FigureTypeCategoryContent = () => {
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const showResult = useUiStore((state) => state.showResult);

  const { figureTypeList, figureTypeListLoading, fetchReadFigureTypeList } = useReadFigureTypeList();
  const { createFigureTypeGroupLoading, fetchCreateFigureTypeGroup } = useCreateFigureTypeGroup();
  const { updateFigureTypeGroupLoading, fetchUpdateFigureTypeGroup } = useUpdateFigureTypeGroup();
  const { deleteFigureTypeGroupLoading, fetchDeleteFigureTypeGroup } = useDeleteFigureTypeGroup();
  const { figureTypeGroupUsageLoading, fetchReadFigureTypeGroupUsage } = useReadFigureTypeGroupUsage();
  const { createFigureTypeLoading, fetchCreateFigureType } = useCreateFigureType();
  const { updateFigureTypeLoading, fetchUpdateFigureType } = useUpdateFigureType();
  const { deleteFigureTypeLoading, fetchDeleteFigureType } = useDeleteFigureType();
  const { deleteFigureTypeListLoading, fetchDeleteFigureTypeList } = useDeleteFigureTypeList();
  const { figureTypeUsageLoading, fetchReadFigureTypeUsage } = useReadFigureTypeUsage();
  const { uploadThumbnailLoading, fetchUploadThumbnail } = useUploadThumbnail();
  const { deleteThumbnailLoading, fetchDeleteThumbnail } = useDeleteThumbnail();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const groups = figureTypeList?.data ?? [];

  /* 오른쪽에 펼칠 상위. 고른 것이 없으면 첫 번째 상위 (Tree 와 같은 규칙) */
  const hasGroup = groups.length > 0;
  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0];
  const childGroupId = hasGroup ? selectedGroup.id : 0;
  const { figureTypeChildPage, figureTypeChildLoading } = useReadFigureTypeChildList(childGroupId, page, hasGroup);
  const childPageData = figureTypeChildPage?.data;
  const childItems = childPageData ? childPageData.items : [];
  const totalPages = childPageData ? childPageData.totalPages : 0;

  /* 일괄 삭제로 고를 수 있는 하위. 서버가 막아 둔 '기타'는 뺀다 */
  const selectableIds = childItems.filter((item) => item.name !== PROTECTED_CATEGORY_NAME).map((item) => item.id);
  const selection = useSelection<'DELETE'>(selectableIds);
  const isBusy =
    figureTypeListLoading ||
    figureTypeChildLoading ||
    createFigureTypeGroupLoading ||
    updateFigureTypeGroupLoading ||
    deleteFigureTypeGroupLoading ||
    figureTypeGroupUsageLoading ||
    createFigureTypeLoading ||
    updateFigureTypeLoading ||
    deleteFigureTypeLoading ||
    deleteFigureTypeListLoading ||
    figureTypeUsageLoading ||
    uploadThumbnailLoading ||
    deleteThumbnailLoading;

  /* 상위를 바꾸면 하위 목록은 1쪽부터 다시 본다 */
  const handleSelectGroup = (groupId: number) => {
    selection.exitMode();
    setSelectedGroupId(groupId);
    setPage(1);
  };

  /* 쪽을 바꾸면 선택 모드는 끝난다(체크는 이번 쪽의 하위에만 있다) */
  const handleChangePage = (nextPage: number) => {
    selection.exitMode();
    setPage(nextPage);
  };

  const handleSave = async (dialog: DialogState, values: FigureTypeFormValues, thumbnail: ThumbnailChange) => {
    const res = await requestSave(dialog, values);

    if (res.code !== API_CODE.OK) {
      showResult(res);
      return;
    }

    /* 썸네일은 분류를 저장해 id 를 받은 뒤에 올린다(추가는 응답의 새 id, 수정은 원래 id) */
    const targetId = dialog.mode === 'insert' ? res.data!.id : dialog.target.id;
    const thumbnailRes = await saveThumbnail(dialog.level, targetId, thumbnail);

    if (thumbnailRes !== null && thumbnailRes.code !== API_CODE.OK) {
      showSnackbar(`저장했지만 이미지는 처리하지 못했어요. ${thumbnailRes.message}`, 'warning');
    } else {
      showResult(res);
    }

    setDialog(null);

    /* 새로 만든 상위는 바로 오른쪽에 펼쳐 보여 준다 */
    if (dialog.mode === 'insert' && dialog.level === 'group') {
      handleSelectGroup(targetId);
    }
  };

  /* 창 종류(추가, 수정, 상위, 하위)에 맞는 저장 요청을 보낸다 */
  const requestSave = async (dialog: DialogState, values: FigureTypeFormValues): Promise<ApiResponse<FigureTypeItem | null>> => {
    if (dialog.mode === 'insert' && dialog.level === 'group') {
      return fetchCreateFigureTypeGroup(values);
    }

    if (dialog.mode === 'insert') {
      return fetchCreateFigureType(dialog.parentId!, values);
    }

    if (dialog.level === 'group') {
      return fetchUpdateFigureTypeGroup(dialog.target.id, values);
    }

    return fetchUpdateFigureType(dialog.target.id, values);
  };

  /* 고른 썸네일 변경 사항을 서버에 보낸다. 보낼 것이 없으면 null */
  const saveThumbnail = async (level: CategoryLevel, targetId: number, thumbnail: ThumbnailChange) => {
    if (thumbnail.type === 'none') {
      return null;
    }

    const target = level === 'group' ? 'figure-type-group' : 'figure-type';
    return thumbnail.type === 'upload'
      ? fetchUploadThumbnail(target, targetId, thumbnail.file)
      : fetchDeleteThumbnail(target, targetId);
  };

  const handleDelete = async (level: CategoryLevel, target: FigureTypeItem) => {
    const usageRes = level === 'group' ? await fetchReadFigureTypeGroupUsage(target.id) : await fetchReadFigureTypeUsage(target.id);

    if (usageRes.code !== API_CODE.OK) {
      showResult(usageRes);
      return;
    }

    const usageText =
      usageRes.data!.count === 0
        ? '이 분류를 쓰는 상품은 없어요.'
        : `이 분류를 쓰는 상품 ${usageRes.data!.count}개는 '기타'로 옮겨져요.`;
    const groupText = level === 'group' ? ' 하위 분류도 함께 \'기타\'로 옮겨져요.' : '';

    const confirmed = await showConfirmAlert({
      title: `'${target.name}'을(를) 삭제할까요?`,
      text: `${usageText}${groupText} 삭제하면 되돌릴 수 없어요.`,
      confirmText: '삭제',
      danger: true,
      focusCancel: true,
    });

    if (!confirmed) {
      return;
    }

    const res = level === 'group' ? await fetchDeleteFigureTypeGroup(target.id) : await fetchDeleteFigureType(target.id);
    showResult(res);

    if (res.code !== API_CODE.OK) {
      return;
    }

    /* 마지막 쪽의 마지막 항목을 지웠으면 그 쪽이 비므로 앞 쪽으로 돌아간다 */
    if (level === 'child' && childItems.length === 1 && page > 1) {
      setPage(page - 1);
    }

    if (level === 'group' && target.id === selectedGroupId) {
      setSelectedGroupId(null);
      setPage(1);
    }
  };

  /* 체크한 하위를 확인창을 거쳐 한 번에 지운다 */
  const handleBulkDelete = async () => {
    const checkedCount = selection.checkedIds.length;
    const confirmed = await showConfirmAlert({
      title: BULK_DELETE_ALERT.title(checkedCount),
      text: BULK_DELETE_ALERT.text,
      confirmText: BULK_DELETE_ALERT.confirmText,
      danger: true,
      focusCancel: true,
    });

    if (!confirmed) {
      return;
    }

    const res = await fetchDeleteFigureTypeList(selection.checkedIds);
    showResult(res);

    if (res.code !== API_CODE.OK) {
      return;
    }

    selection.exitMode();

    /* 이번 쪽 하위를 모두 지웠으면 그 쪽이 비므로 앞 쪽으로 돌아간다 */
    if (checkedCount === childItems.length && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      {figureTypeList && figureTypeList.code !== API_CODE.OK && <ErrorView message={figureTypeList.message} onRetry={fetchReadFigureTypeList} />}
      {figureTypeList?.code === API_CODE.OK && groups.length === 0 && (
        <EmptyView
          message="등록된 그룹이 없어요"
          action={
            <Button variant="contained" onClick={() => setDialog({ mode: 'insert', level: 'group' })}>
              그룹 추가
            </Button>
          }
        />
      )}
      {figureTypeList?.code === API_CODE.OK && groups.length > 0 && (
        <FigureTypeCategoryTree
          groups={groups}
          selectedGroupId={selectedGroupId}
          childItems={childItems}
          page={page}
          totalPages={totalPages}
          onSelectGroup={handleSelectGroup}
          onChangePage={handleChangePage}
          onInsert={(level, parentId) => setDialog({ mode: 'insert', level, parentId })}
          onEdit={(level, target) => setDialog({ mode: 'edit', level, target })}
          onDelete={handleDelete}
          selectMode={selection.mode !== null}
          checkedIds={selection.checkedIds}
          selectableCount={selectableIds.length}
          onEnterSelect={() => selection.enterMode('DELETE')}
          onExitSelect={selection.exitMode}
          onToggleItem={selection.toggleId}
          onToggleAll={selection.toggleAllIds}
          onBulkDelete={handleBulkDelete}
        />
      )}

      {dialog && (
        <FigureTypeFormDialog
          mode={dialog.mode}
          levelName={dialog.level === 'group' ? '그룹' : '하위'}
          target={dialog.mode === 'edit' ? dialog.target : undefined}
          loading={createFigureTypeGroupLoading || updateFigureTypeGroupLoading || createFigureTypeLoading || updateFigureTypeLoading || uploadThumbnailLoading || deleteThumbnailLoading}
          onSubmit={(values, thumbnail) => handleSave(dialog, values, thumbnail)}
          onClose={() => setDialog(null)}
        />
      )}

      <LoadingOverlay open={isBusy} />
    </>
  );
};

export default FigureTypeCategoryContent;
