import type { Transition, Variants } from 'motion/react';

/** 카드 진입. 아래에서 위로 떠오르며 나타나고, 줄 순서(index)대로 조금씩 늦게 시작한다(너무 늦지 않게 상한을 둔다) */
const ENTER_DELAY_STEP = 0.07;
const ENTER_DELAY_MAX = 0.7;

export const cardEnterVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 0.61, 0.36, 1],
      delay: Math.min(index * ENTER_DELAY_STEP, ENTER_DELAY_MAX),
    },
  }),
};

/** 깜빡임. 투명도가 1 → 0.25 → 1 로 오가며 계속 반복한다 */
export const blinkAnimate = { opacity: [1, 0.25, 1] };

export const blinkTransition: Transition = { duration: 1.1, ease: 'easeInOut', repeat: Infinity };

/** 이미지 롤링. 같은 목록을 두 번 이어 붙인 줄이 오른쪽에서 왼쪽으로 절반만큼(한 목록 길이) 끊김 없이 계속 흐른다 */
export const rollAnimate = { x: ['0%', '-50%'] };

/** 이미지 한 장이 지나가는 시간(초). 장수가 달라도 흐르는 속도가 같다 */
const ROLL_SECONDS_PER_IMAGE = 7;

export const getRollTransition = (imageCount: number): Transition => ({
  duration: imageCount * ROLL_SECONDS_PER_IMAGE,
  ease: 'linear',
  repeat: Infinity,
});
