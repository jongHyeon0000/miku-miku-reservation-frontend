import { useState } from 'react';
import type { FigurePickItem } from '@/app/figure/interface/form/FigurePickItem';
import { WELCOME_INTRO_PICK_POOLS } from '@/app/welcome-intro/constant/welcomeIntroCategories';
import { WELCOME_INTRO_REGISTER_FIGURE } from '@/app/welcome-intro/constant/welcomeIntroFigures';
import useWelcomeIntroDemoLoop from '@/app/welcome-intro/hook/useWelcomeIntroDemoLoop';
import { wait } from '@/app/welcome-intro/utils/WelcomeIntroUtils';

/** 등록 화면에서 고르는 분류 칸 */
type RegisterKey = keyof typeof WELCOME_INTRO_PICK_POOLS;

type RegisterChosen = Record<RegisterKey, FigurePickItem[]>;

const EMPTY_CHOSEN: RegisterChosen = { figureType: [], shop: [], series: [], maker: [] };

/** 고르는 순서와 고르는 분류 (완성되는 상품 WELCOME_INTRO_REGISTER_FIGURE 의 분류와 같다) */
const PICK_STEPS: { key: RegisterKey; id: number }[] = [
  { key: 'figureType', id: WELCOME_INTRO_REGISTER_FIGURE.figureType.id },
  { key: 'shop', id: WELCOME_INTRO_REGISTER_FIGURE.shop.id },
  { key: 'series', id: WELCOME_INTRO_REGISTER_FIGURE.series[0].id },
  { key: 'maker', id: WELCOME_INTRO_REGISTER_FIGURE.maker.id },
];

const PICK_MILLISECONDS = 1100;

/**
 * 등록 데모 대본. 분류를 하나씩 고르고, 다 고르면 완성된 상품 카드가 나온다.
 */
const useWelcomeIntroRegisterDemo = (active: boolean) => {
  const [chosen, setChosen] = useState<RegisterChosen>(EMPTY_CHOSEN);
  const [done, setDone] = useState<boolean>(false);

  useWelcomeIntroDemoLoop(active, async (alive) => {
    setChosen(EMPTY_CHOSEN);
    setDone(false);
    await wait(PICK_MILLISECONDS);

    if (!alive()) {
      return;
    }

    for (const step of PICK_STEPS) {
      const picked = WELCOME_INTRO_PICK_POOLS[step.key].find((candidate) => candidate.id === step.id)!;
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

export default useWelcomeIntroRegisterDemo;
