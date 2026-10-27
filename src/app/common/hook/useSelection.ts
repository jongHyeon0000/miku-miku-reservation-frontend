import { useState } from 'react';

/**
 * 목록의 선택 모드 상태 훅(상품 목록, 분류 목록이 같이 쓴다). 켜진 모드(없으면 null)와 체크만 맡고 화면은 그리지 않는다.
 * 모드는 한 번에 하나만 켜지고, 모드를 바꾸거나 끄면 체크는 비워진다.
 * 탭이나 필터, 쪽을 바꿔 안 보이게 된 항목은 체크했어도 checkedIds 에서 빠진다.
 *
 * @param shownIds 지금 화면에 보이는 항목의 id
 */
const useSelection = <Mode extends string>(shownIds: number[]) => {
  const [mode, setMode] = useState<Mode | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const checkedIds = shownIds.filter((id) => selectedIds.includes(id));

  const enterMode = (next: Mode) => {
    setMode(next);
    setSelectedIds([]);
  };

  const exitMode = () => {
    setMode(null);
    setSelectedIds([]);
  };

  const toggleId = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]));
  };

  /* 보이는 항목이 전부 체크돼 있으면 모두 해제하고, 아니면 전부 체크한다 */
  const toggleAllIds = () => {
    setSelectedIds(checkedIds.length === shownIds.length ? [] : shownIds);
  };

  return { mode, checkedIds, enterMode, exitMode, toggleId, toggleAllIds };
};

export default useSelection;
