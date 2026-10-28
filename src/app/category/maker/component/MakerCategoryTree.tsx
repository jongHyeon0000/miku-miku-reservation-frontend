import CategoryChildPanel from '@/app/category/common/component/CategoryChildPanel';
import MakerChildRow from '@/app/category/maker/component/MakerChildRow';
import type { MakerItem } from '@/app/category/maker/interface/MakerItem';
import useDeleteMakerList from '@/app/category/maker/service/useDeleteMakerList';

interface MakerCategoryTreeProps {
  /** 이번 페이지 제조사 */
  groups: MakerItem[];

  /** 지금 보는 목록 페이지 (1부터) */
  page: number;

  /** 전체 페이지 수 */
  totalPages: number;

  /** 페이지 번호를 눌렀을 때 */
  onChangePage: (page: number) => void;

  /** 제조사 추가 버튼을 눌렀을 때 */
  onInsert: () => void;

  /** 수정 버튼을 눌렀을 때 */
  onEdit: (target: MakerItem) => void;

  /** 삭제 버튼을 눌렀을 때 */
  onDelete: (target: MakerItem) => void;
}

/**
 * 제조사 목록. 상위만 있는 축이라 목록 한 단이 곧 분류다(CategoryChildPanel).
 */
const MakerCategoryTree = ({ groups, page, totalPages, onChangePage, onInsert, onEdit, onDelete }: MakerCategoryTreeProps) => {
  const { deleteMakerListLoading, fetchDeleteMakerList } = useDeleteMakerList();

  return (
    /* 쪽이 바뀌면 key 가 달라져 패널이 새로 그려지고 선택 모드가 끝난다 */
    <CategoryChildPanel
      key={page}
      title="제조사 목록"
      childItems={groups}
      page={page}
      totalPages={totalPages}
      renderRow={(item, select) => (
        <MakerChildRow item={item} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} {...select} />
      )}
      addLabel="제조사 추가"
      onAdd={onInsert}
      deleteListLoading={deleteMakerListLoading}
      fetchDeleteList={fetchDeleteMakerList}
      onChangePage={onChangePage}
    />
  );
};

export default MakerCategoryTree;
