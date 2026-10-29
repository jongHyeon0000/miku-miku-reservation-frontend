import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * 장면 데모 대본을 되풀이해서 돌린다. 장면이 화면에 들어오면 처음부터 시작하고, 나가면 멈춘다.
 * 대본은 처음에 상태를 처음 모양으로 되돌려야 하고, 기다린 뒤에는 alive() 로 멈춰야 하는지 확인한다.
 * 움직임 줄이기 설정이면 한 번만 돌고 마지막 모양에 머문다.
 */
const useWelcomeIntroDemoLoop = (active: boolean, script: (alive: () => boolean) => Promise<void>) => {
  const scriptRef = useRef(script);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    scriptRef.current = script;
  });

  useEffect(() => {
    if (!active) {
      return;
    }

    let alive = true;
    const isAlive = () => alive;

    const run = async () => {
      do {
        await scriptRef.current(isAlive);
      } while (alive && !reduceMotion);
    };
    run();

    return () => {
      alive = false;
    };
  }, [active, reduceMotion]);
};

export default useWelcomeIntroDemoLoop;
