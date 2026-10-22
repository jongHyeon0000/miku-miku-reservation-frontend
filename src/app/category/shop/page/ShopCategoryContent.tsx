import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import type { CategoryLevel } from '@/app/category/common/constant/categoryAxes';
import ShopCategoryTree from '@/app/category/shop/component/ShopCategoryTree';
import ShopFormDialog from '@/app/category/shop/component/ShopFormDialog';
import type { ShopFormValues } from '@/app/category/shop/interface/ShopFormValues';
import type { ShopItem } from '@/app/category/shop/interface/ShopItem';
import useCreateShopGroup from '@/app/category/shop/service/useCreateShopGroup';
import useCreateShop from '@/app/category/shop/service/useCreateShop';
import useUpdateShopGroup from '@/app/category/shop/service/useUpdateShopGroup';
import useUpdateShop from '@/app/category/shop/service/useUpdateShop';
import useDeleteShopGroup from '@/app/category/shop/service/useDeleteShopGroup';
import useDeleteShop from '@/app/category/shop/service/useDeleteShop';
import useReadShopList from '@/app/category/shop/service/useReadShopList';
import useReadShopGroupUsage from '@/app/category/shop/service/useReadShopGroupUsage';
import useReadShopUsage from '@/app/category/shop/service/useReadShopUsage';
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

/** 열려 있는 추가/수정 창의 상태. 하위를 추가할 때는 속할 상위 id 를 가진다 */
type DialogState =
  | { mode: 'insert'; level: CategoryLevel; parentId?: number }
  | { mode: 'edit'; level: CategoryLevel; target: ShopItem };

/**
 * 판매처 분류 목록과 추가, 수정, 삭제. 상태(조회 결과, 고른 상위, 열린 창)는 이 컴포넌트가 들고 있다.
 * 추가, 수정, 삭제가 성공하면 목록을 다시 불러온다(수정, 삭제 응답에는 data 가 없다).
 */
const ShopCategoryContent = () => {
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const showResult = useUiStore((state) => state.showResult);

  const { shopList, shopListLoading, fetchReadShopList } = useReadShopList();
  const { createShopGroupLoading, fetchCreateShopGroup } = useCreateShopGroup();
  const { updateShopGroupLoading, fetchUpdateShopGroup } = useUpdateShopGroup();
  const { deleteShopGroupLoading, fetchDeleteShopGroup } = useDeleteShopGroup();
  const { shopGroupUsageLoading, fetchReadShopGroupUsage } = useReadShopGroupUsage();
  const { createShopLoading, fetchCreateShop } = useCreateShop();
  const { updateShopLoading, fetchUpdateShop } = useUpdateShop();
  const { deleteShopLoading, fetchDeleteShop } = useDeleteShop();
  const { shopUsageLoading, fetchReadShopUsage } = useReadShopUsage();
  const { uploadThumbnailLoading, fetchUploadThumbnail } = useUploadThumbnail();
  const { deleteThumbnailLoading, fetchDeleteThumbnail } = useDeleteThumbnail();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const groups = shopList?.data ?? [];
  const isBusy =
    shopListLoading ||
    createShopGroupLoading ||
    updateShopGroupLoading ||
    deleteShopGroupLoading ||
    shopGroupUsageLoading ||
    createShopLoading ||
    updateShopLoading ||
    deleteShopLoading ||
    shopUsageLoading ||
    uploadThumbnailLoading ||
    deleteThumbnailLoading;

  useEffect(() => {
    fetchReadShopList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (dialog: DialogState, values: ShopFormValues, thumbnail: ThumbnailChange) => {
    const res: ApiResponse<ShopItem | null> =
      dialog.mode === 'insert'
        ? dialog.level === 'group'
          ? await fetchCreateShopGroup(values)
          : await fetchCreateShop(dialog.parentId!, values)
        : dialog.level === 'group'
          ? await fetchUpdateShopGroup(dialog.target.id, values)
          : await fetchUpdateShop(dialog.target.id, values);

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
      setSelectedGroupId(targetId);
    }
    await fetchReadShopList();
  };

  /* 고른 썸네일 변경 사항을 서버에 보낸다. 보낼 것이 없으면 null */
  const saveThumbnail = async (level: CategoryLevel, targetId: number, thumbnail: ThumbnailChange) => {
    if (thumbnail.type === 'none') return null;

    const target = level === 'group' ? 'shop-group' : 'shop';
    return thumbnail.type === 'upload'
      ? fetchUploadThumbnail(target, targetId, thumbnail.file)
      : fetchDeleteThumbnail(target, targetId);
  };

  const handleDelete = async (level: CategoryLevel, target: ShopItem) => {
    const usageRes = level === 'group' ? await fetchReadShopGroupUsage(target.id) : await fetchReadShopUsage(target.id);
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
    if (!confirmed) return;

    const res = level === 'group' ? await fetchDeleteShopGroup(target.id) : await fetchDeleteShop(target.id);
    showResult(res);
    if (res.code !== API_CODE.OK) return;

    if (level === 'group' && target.id === selectedGroupId) setSelectedGroupId(null);
    await fetchReadShopList();
  };

  return (
    <>
      {shopList && shopList.code !== API_CODE.OK && <ErrorView message={shopList.message} onRetry={fetchReadShopList} />}
      {shopList?.code === API_CODE.OK && groups.length === 0 && (
        <EmptyView
          message="등록된 그룹이 없어요"
          action={
            <Button variant="contained" onClick={() => setDialog({ mode: 'insert', level: 'group' })}>
              그룹 추가
            </Button>
          }
        />
      )}
      {shopList?.code === API_CODE.OK && groups.length > 0 && (
        <ShopCategoryTree
          groups={groups}
          selectedGroupId={selectedGroupId}
          onSelectGroup={setSelectedGroupId}
          onInsert={(level, parentId) => setDialog({ mode: 'insert', level, parentId })}
          onEdit={(level, target) => setDialog({ mode: 'edit', level, target })}
          onDelete={handleDelete}
        />
      )}

      {dialog && (
        <ShopFormDialog
          mode={dialog.mode}
          levelName={dialog.level === 'group' ? '그룹' : '하위'}
          target={dialog.mode === 'edit' ? dialog.target : undefined}
          loading={createShopGroupLoading || updateShopGroupLoading || createShopLoading || updateShopLoading || uploadThumbnailLoading || deleteThumbnailLoading}
          onSubmit={(values, thumbnail) => handleSave(dialog, values, thumbnail)}
          onClose={() => setDialog(null)}
        />
      )}

      <LoadingOverlay open={isBusy} />
    </>
  );
};

export default ShopCategoryContent;
