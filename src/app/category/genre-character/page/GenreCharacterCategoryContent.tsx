import { useState } from 'react';
import { Button } from '@mui/material';
import type { CategoryLevel } from '@/app/category/common/constant/categoryAxes';
import GenreCharacterCategoryTree from '@/app/category/genre-character/component/GenreCharacterCategoryTree';
import GenreCharacterFormDialog from '@/app/category/genre-character/component/GenreCharacterFormDialog';
import type { GenreCharacterFormValues } from '@/app/category/genre-character/interface/GenreCharacterFormValues';
import type { GenreCharacterItem } from '@/app/category/genre-character/interface/GenreCharacterItem';
import useCreateGenreCharacterGroup from '@/app/category/genre-character/service/useCreateGenreCharacterGroup';
import useCreateGenreCharacter from '@/app/category/genre-character/service/useCreateGenreCharacter';
import useUpdateGenreCharacterGroup from '@/app/category/genre-character/service/useUpdateGenreCharacterGroup';
import useUpdateGenreCharacter from '@/app/category/genre-character/service/useUpdateGenreCharacter';
import useDeleteGenreCharacterGroup from '@/app/category/genre-character/service/useDeleteGenreCharacterGroup';
import useDeleteGenreCharacter from '@/app/category/genre-character/service/useDeleteGenreCharacter';
import useReadGenreCharacterList from '@/app/category/genre-character/service/useReadGenreCharacterList';
import useReadGenreCharacterChildList from '@/app/category/genre-character/service/useReadGenreCharacterChildList';
import useReadGenreCharacterGroupUsage from '@/app/category/genre-character/service/useReadGenreCharacterGroupUsage';
import useReadGenreCharacterUsage from '@/app/category/genre-character/service/useReadGenreCharacterUsage';
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
  | { mode: 'edit'; level: CategoryLevel; target: GenreCharacterItem };

/**
 * 장르·캐릭터 분류 목록과 추가, 수정, 삭제. 상태(조회 결과, 고른 상위, 열린 창)는 이 컴포넌트가 들고 있다.
 * 추가, 수정, 삭제 훅이 성공하면 키를 울려서 목록이 새 값으로 다시 그려진다.
 */
const GenreCharacterCategoryContent = () => {
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const showResult = useUiStore((state) => state.showResult);

  const { genreCharacterList, genreCharacterListLoading, fetchReadGenreCharacterList } = useReadGenreCharacterList();
  const { createGenreCharacterGroupLoading, fetchCreateGenreCharacterGroup } = useCreateGenreCharacterGroup();
  const { updateGenreCharacterGroupLoading, fetchUpdateGenreCharacterGroup } = useUpdateGenreCharacterGroup();
  const { deleteGenreCharacterGroupLoading, fetchDeleteGenreCharacterGroup } = useDeleteGenreCharacterGroup();
  const { genreCharacterGroupUsageLoading, fetchReadGenreCharacterGroupUsage } = useReadGenreCharacterGroupUsage();
  const { createGenreCharacterLoading, fetchCreateGenreCharacter } = useCreateGenreCharacter();
  const { updateGenreCharacterLoading, fetchUpdateGenreCharacter } = useUpdateGenreCharacter();
  const { deleteGenreCharacterLoading, fetchDeleteGenreCharacter } = useDeleteGenreCharacter();
  const { genreCharacterUsageLoading, fetchReadGenreCharacterUsage } = useReadGenreCharacterUsage();
  const { uploadThumbnailLoading, fetchUploadThumbnail } = useUploadThumbnail();
  const { deleteThumbnailLoading, fetchDeleteThumbnail } = useDeleteThumbnail();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const groups = genreCharacterList?.data ?? [];

  /* 오른쪽에 펼칠 상위. 고른 것이 없으면 첫 번째 상위 (Tree 와 같은 규칙) */
  const hasGroup = groups.length > 0;
  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? groups[0];
  const childGroupId = hasGroup ? selectedGroup.id : 0;
  const { genreCharacterChildPage, genreCharacterChildLoading } = useReadGenreCharacterChildList(childGroupId, page, hasGroup);
  const childPageData = genreCharacterChildPage?.data;
  const childItems = childPageData ? childPageData.items : [];
  const totalPages = childPageData ? childPageData.totalPages : 0;
  const isBusy =
    genreCharacterListLoading ||
    genreCharacterChildLoading ||
    createGenreCharacterGroupLoading ||
    updateGenreCharacterGroupLoading ||
    deleteGenreCharacterGroupLoading ||
    genreCharacterGroupUsageLoading ||
    createGenreCharacterLoading ||
    updateGenreCharacterLoading ||
    deleteGenreCharacterLoading ||
    genreCharacterUsageLoading ||
    uploadThumbnailLoading ||
    deleteThumbnailLoading;

  /* 상위를 바꾸면 하위 목록은 1쪽부터 다시 본다 */
  const handleSelectGroup = (groupId: number) => {
    setSelectedGroupId(groupId);
    setPage(1);
  };

  const handleSave = async (dialog: DialogState, values: GenreCharacterFormValues, thumbnail: ThumbnailChange) => {
    const res: ApiResponse<GenreCharacterItem | null> =
      dialog.mode === 'insert'
        ? dialog.level === 'group'
          ? await fetchCreateGenreCharacterGroup(values)
          : await fetchCreateGenreCharacter(dialog.parentId!, values)
        : dialog.level === 'group'
          ? await fetchUpdateGenreCharacterGroup(dialog.target.id, values)
          : await fetchUpdateGenreCharacter(dialog.target.id, values);

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

  /* 고른 썸네일 변경 사항을 서버에 보낸다. 보낼 것이 없으면 null */
  const saveThumbnail = async (level: CategoryLevel, targetId: number, thumbnail: ThumbnailChange) => {
    if (thumbnail.type === 'none') return null;

    const target = level === 'group' ? 'genre-character-group' : 'genre-character';
    return thumbnail.type === 'upload'
      ? fetchUploadThumbnail(target, targetId, thumbnail.file)
      : fetchDeleteThumbnail(target, targetId);
  };

  const handleDelete = async (level: CategoryLevel, target: GenreCharacterItem) => {
    const usageRes = level === 'group' ? await fetchReadGenreCharacterGroupUsage(target.id) : await fetchReadGenreCharacterUsage(target.id);
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

    const res = level === 'group' ? await fetchDeleteGenreCharacterGroup(target.id) : await fetchDeleteGenreCharacter(target.id);
    showResult(res);
    if (res.code !== API_CODE.OK) return;

    /* 마지막 쪽의 마지막 항목을 지웠으면 그 쪽이 비므로 앞 쪽으로 돌아간다 */
    if (level === 'child' && childItems.length === 1 && page > 1) setPage(page - 1);

    if (level === 'group' && target.id === selectedGroupId) {
      setSelectedGroupId(null);
      setPage(1);
    }
  };

  return (
    <>
      {genreCharacterList && genreCharacterList.code !== API_CODE.OK && <ErrorView message={genreCharacterList.message} onRetry={fetchReadGenreCharacterList} />}
      {genreCharacterList?.code === API_CODE.OK && groups.length === 0 && (
        <EmptyView
          message="등록된 그룹이 없어요"
          action={
            <Button variant="contained" onClick={() => setDialog({ mode: 'insert', level: 'group' })}>
              그룹 추가
            </Button>
          }
        />
      )}
      {genreCharacterList?.code === API_CODE.OK && groups.length > 0 && (
        <GenreCharacterCategoryTree
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
        <GenreCharacterFormDialog
          mode={dialog.mode}
          levelName={dialog.level === 'group' ? '그룹' : '하위'}
          target={dialog.mode === 'edit' ? dialog.target : undefined}
          loading={createGenreCharacterGroupLoading || updateGenreCharacterGroupLoading || createGenreCharacterLoading || updateGenreCharacterLoading || uploadThumbnailLoading || deleteThumbnailLoading}
          onSubmit={(values, thumbnail) => handleSave(dialog, values, thumbnail)}
          onClose={() => setDialog(null)}
        />
      )}

      <LoadingOverlay open={isBusy} />
    </>
  );
};

export default GenreCharacterCategoryContent;
