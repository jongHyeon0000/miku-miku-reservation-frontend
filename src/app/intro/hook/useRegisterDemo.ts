import { useState } from 'react';
import type { FigurePickItem } from '@/app/figure/interface/form/FigurePickItem';
import { INTRO_PICK_POOLS } from '@/app/intro/constant/introCategories';
import { INTRO_REGISTER_FIGURE } from '@/app/intro/constant/introFigures';
import useDemoLoop from '@/app/intro/hook/useDemoLoop';
import { wait } from '@/app/intro/utils/IntroUtils';

/** 등록 화면에서 고르는 분류 칸 */
type RegisterKey = keyof typeof INTRO_PICK_POOLS;

type RegisterChosen = Record<RegisterKey, FigurePickItem[]>;

const EMPTY_CHOSEN: RegisterChosen = { figureType: [], shop: [], series: [], maker: [] };

/** 고르는 순서와 고르는 분류 (완성되는 상품 INTRO_REGISTER_FIGURE 의 분류와 같다) */
const PICK_STEPS: { key: RegisterKey; id: number }[] = [
  { key: 'figureType', id: INTRO_REGISTER_FIGURE.figureType.id },
  { key: 'shop', id: INTRO_REGISTER_FIGURE.shop.id },
  { key: 'series', id: INTRO_REGISTER_FIGURE.series[0].id },
  { key: 'maker', id: INTRO_REGISTER_FIGURE.maker.id },
];

const PICK_MILLISECONDS = 1100;

/**
 * 등록 데모 대본. 분류를 하나씩 고르고, 다 고르면 완성된 상품 카드가 나온다.
 */
const useRegisterDemo = (active: boolean) => {
  const [chosen, setChosen] = useState<RegisterChosen>(EMPTY_CHOSEN);
  const [done, setDone] = useState<boolean>(false);

  useDemoLoop(active, async (alive) => {
    setChosen(EMPTY_CHOSEN);
    setDone(false);
    await wait(PICK_MILLISECONDS);

    if (!alive()) {
      return;
    }

    for (const step of PICK_STEPS) {
      const picked = INTRO_PICK_POOLS[step.key].find((candidate) => candidate.id === step.id)!;
      setChosen((prev) => ({ ...prev, [step.key]: [picked] }));
      await wait(PICK_MILLISECONDS);

      if (!alive()) {
        return;
      }
    }

    setDone(true);
    await wait(4500);
  });

  return { chosen, done };
};

export default useRegisterDemo;
