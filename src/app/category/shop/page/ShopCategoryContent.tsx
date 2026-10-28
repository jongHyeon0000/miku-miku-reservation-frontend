import { useState } from 'react';
import { Button } from '@mui/material';
import type { CategoryLevel } from '@/app/category/common/constant/categoryAxes';
import ShopCategoryTree from '@/app/category/shop/component/ShopCategoryTree';
import ShopFormDialog, { type ShopDialogState } from '@/app/category/shop/component/ShopFormDialog';
import type { ShopItem } from '@/app/category/shop/interface/ShopItem';
import useDeleteShopGroup from '@/app/category/shop/service/useDeleteShopGroup';
import useDeleteShop from '@/app/category/shop/service/useDeleteShop';
import useReadShopList from '@/app/category/shop/service/useReadShopList';
import useReadShopChildList from '@/app/category/shop/service/useReadShopChildList';
import useReadShopGroupUsage from '@/app/category/shop/service/useReadShopGroupUsage';
import useReadShopUsage from '@/app/category/shop/service/useReadShopUsage';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

/**
 * 판매처 분류 목록과 삭제. 상태(조회 결과, 고른 상위, 열린 창)는 이 컴포넌트가 들고 있다.
 * 저장은 ShopFormDialog, 하위 일괄 삭제는 ShopChildPanel 이 맡는다.
 * 추가, 수정, 삭제 훅이 성공하면 키를 울려서 목록이 새 값으로 다시 그려진다.
 */
const ShopCategoryContent = () => {
  const showResult = useUiStore((state) => state.showResult);

  const { shopList, shopListLoading, fetchReadShopList } = useReadShopList();
  const { deleteShopGroupLoading, fetchDeleteShopGroup } = useDeleteShopGroup();
  const { shopGroupUsageLoading, fetchReadShopGroupUsage } = useReadShopGroupUsage();
  const { deleteShopLoading, fetchDeleteShop } = useDeleteShop();
  const { shopUsageLoading, fetchReadShopUsage } = useReadShopUsage();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [dialog, setDialog] = useState<ShopDialogState | null>(null);

  const groups = shopList?.data ?? [];

  /* 오른쪽에 펼칠 상위. 고른 것이 없으면 첫 번째 상위 (Tree 와 같은 규칙) */
  const hasGroup = groups.length > 0;
  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0];
  const childGroupId = hasGroup ? selectedGroup.id : 0;
  const { shopChildPage, shopChildLoading } = useReadShopChildList(childGroupId, page, hasGroup);
  const childPageData = shopChildPage?.data;
  const childItems = childPageData ? childPageData.items : [];
  const totalPages = childPageData ? childPageData.totalPages : 0;

  const isBusy =
    shopListLoading ||
    shopChildLoading ||
    deleteShopGroupLoading ||
    shopGroupUsageLoading ||
    deleteShopLoading ||
    shopUsageLoading;

  /* 상위를 바꾸면 하위 목록은 1쪽부터 다시 본다 */
  const handleSelectGroup = (groupId: number) => {
    setSelectedGroupId(groupId);
    setPage(1);
  };

  /* 저장이 끝나면 창을 닫는다 */
  const handleSaved = (dialog: ShopDialogState, targetId: number) => {
    setDialog(null);

    /* 새로 만든 상위는 바로 오른쪽에 펼쳐 보여 준다 */
    if (dialog.mode === 'insert' && dialog.level === 'group') {
      handleSelectGroup(targetId);
    }
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

    if (!confirmed) {
      return;
    }

    const res = level === 'group' ? await fetchDeleteShopGroup(target.id) : await fetchDeleteShop(target.id);
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
          childItems={childItems}
          page={page}
          totalPages={totalPages}
          onSelectGroup={handleSelectGroup}
          onChangePage={setPage}
          onInsert={(level, parentId) => setDialog({ mode: 'insert', level, parentId })}
          onEdit={(level, target) => setDialog({ mode: 'edit', level, target })}
          onDelete={handleDelete}
        />
      )}

      {dialog && (
        <ShopFormDialog
          dialog={dialog}
          onSaved={(targetId) => handleSaved(dialog, targetId)}
          onClose={() => setDialog(null)}
        />
      )}

      <LoadingOverlay open={isBusy} />
    </>
  );
};

export default ShopCategoryContent;
