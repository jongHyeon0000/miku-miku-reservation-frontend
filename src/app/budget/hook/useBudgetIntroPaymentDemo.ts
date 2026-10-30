import { useState } from 'react';
import useWelcomeIntroDemoLoop from '@/app/welcome-intro/hook/useWelcomeIntroDemoLoop';
import { wait } from '@/app/welcome-intro/utils/WelcomeIntroUtils';

const CARD_MILLISECONDS = 1800;
const MODAL_MILLISECONDS = 4500;
const GAP_MILLISECONDS = 700;

/**
 * 결제 초과 경고 데모 대본. 상품 카드를 잠깐 보여 준 뒤 경고 모달이 뜨고, 읽을 시간이 지나면 닫힌다.
 * 돌려주는 modalOpen 이 지금 모달이 떠 있는지이고, 장면을 떠나면 닫힌 것으로 본다.
 */
const useBudgetIntroPaymentDemo = (active: boolean) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useWelcomeIntroDemoLoop(active, async (alive) => {
    setModalOpen(false);
    await wait(CARD_MILLISECONDS);

    if (!alive()) {
      return;
    }

    setModalOpen(true);
    await wait(MODAL_MILLISECONDS);

    if (!alive()) {
      return;
    }

    setModalOpen(false);
    await wait(GAP_MILLISECONDS);
  });

  return { modalOpen: active ? modalOpen : false };
};

export default useBudgetIntroPaymentDemo;
