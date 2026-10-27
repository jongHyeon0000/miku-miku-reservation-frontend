import { useState } from 'react';
import type { UrgentTabKey } from '@/app/figure/constant/figureStatus';
import useDemoLoop from '@/app/intro/hook/useDemoLoop';
import { wait } from '@/app/intro/utils/IntroUtils';

const LIST_MILLISECONDS = 2200;
const MODAL_MILLISECONDS = 3500;
const GAP_MILLISECONDS = 700;

/**
 * 마감 알림 데모 대본. 목록의 날짜가 깜빡이는 모습을 먼저 보여 주고,
 * 미구매 알림 창, 예약완료 알림 창이 차례로 뜬다. 돌려주는 urgentTab 이 지금 떠 있는 알림 창이고, 없으면 null 이다.
 * 장면을 떠나면 창은 닫힌 것으로 본다.
 */
const useAlertDemo = (active: boolean) => {
  const [urgentTab, setUrgentTab] = useState<UrgentTabKey | null>(null);

  useDemoLoop(active, async (alive) => {
    setUrgentTab(null);
    await wait(LIST_MILLISECONDS);

    if (!alive()) {
      return;
    }

    for (const tab of ['UNPURCHASED', 'RESERVED'] as const) {
      setUrgentTab(tab);
      await wait(MODAL_MILLISECONDS);

      if (!alive()) {
        return;
      }

      setUrgentTab(null);
      await wait(GAP_MILLISECONDS);

      if (!alive()) {
        return;
      }
    }
  });

  return { urgentTab: active ? urgentTab : null, closeModal: () => setUrgentTab(null) };
};

export default useAlertDemo;
