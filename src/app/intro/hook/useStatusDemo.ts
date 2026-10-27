import { useState } from 'react';
import type { SelectMode } from '@/app/figure/constant/figureSelect';
import type { FigureTabKey } from '@/app/figure/constant/figureStatus';
import useDemoLoop from '@/app/intro/hook/useDemoLoop';
import { wait } from '@/app/intro/utils/IntroUtils';

/** 상태 탭을 장바구니부터 배송완료까지 차례로 본 뒤, 미구매 탭에서 선택 모드로 두 개를 한 번에 넘긴다 */
const TAB_STEPS: FigureTabKey[] = ['CART', 'UNPURCHASED', 'RESERVED', 'PURCHASED', 'DELIVERED'];

/** 선택 모드에서 체크하는 상품 (미구매 탭의 두 개) */
const CHECK_STEPS = [3, 4];

const TAB_MILLISECONDS = 1700;
const CHECK_MILLISECONDS = 800;
const MODAL_MILLISECONDS = 3800;

/**
 * 상태 전이 데모 대본. 보고 있는 탭, 선택 모드와 체크한 상품, 상태 변경 창이 열렸는지를 돌려준다.
 * 장면을 떠나면 창은 닫힌 것으로 본다.
 */
const useStatusDemo = (active: boolean) => {
  const [tab, setTab] = useState<FigureTabKey>('CART');
  const [mode, setMode] = useState<SelectMode | null>(null);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useDemoLoop(active, async (alive) => {
    setMode(null);
    setCheckedIds([]);
    setModalOpen(false);

    for (const next of TAB_STEPS) {
      setTab(next);
      await wait(TAB_MILLISECONDS);

      if (!alive()) {
        return;
      }
    }

    setTab('UNPURCHASED');
    await wait(1200);

    if (!alive()) {
      return;
    }

    setMode('STATUS');
    await wait(1300);

    if (!alive()) {
      return;
    }

    for (const figureId of CHECK_STEPS) {
      setCheckedIds((prev) => [...prev, figureId]);
      await wait(CHECK_MILLISECONDS);

      if (!alive()) {
        return;
      }
    }

    setModalOpen(true);
    await wait(MODAL_MILLISECONDS);

    if (!alive()) {
      return;
    }

    setModalOpen(false);
    await wait(800);
  });

  return { tab, mode, checkedIds, modalOpen: modalOpen && active, closeModal: () => setModalOpen(false) };
};

export default useStatusDemo;
