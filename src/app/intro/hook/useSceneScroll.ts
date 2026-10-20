import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'motion/react';

/* 장면 하나를 넘어가는 시간과 곡선 (천천히 시작해 빠르게 가다 천천히 멈춘다) */
const SCROLL_SECONDS = 0.85;
const SCROLL_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

/* 휠이 이 시간(밀리초) 쉬면 새 동작으로 본다. 트랙패드 관성이 남아도 한 동작에는 한 장면만 움직인다 */
const WHEEL_GESTURE_GAP = 130;
const WHEEL_MIN_DELTA = 4;

/**
 * 장면 단위 스크롤. 마우스, 트랙패드는 휠 한 번에 바로 다음(이전) 장면으로 곡선을 그리며 넘어가고,
 * 방향키, PageUp/PageDown, Home/End, 진행 점도 같은 이동을 쓴다. 터치 화면은 브라우저 스냅에 맡긴다.
 * 스크롤 영역의 높이는 이 훅이 상단 메뉴 아래에 남는 높이를 재서 돌려준다(viewHeight).
 */
const useSceneScroll = (sceneCount: number) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const indexRef = useRef<number>(0);
  const movingRef = useRef<boolean>(false);
  const controlsRef = useRef<{ stop: () => void } | null>(null);
  const reduceMotion = useReducedMotion();

  /* 상단 메뉴 아래부터 화면 끝까지의 높이를 잰다 */
  useLayoutEffect(() => {
    const measure = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const top = scroller.getBoundingClientRect().top + window.scrollY;
      setViewHeight(window.innerHeight - top);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* 높이가 바뀌면 지금 장면에 다시 맞춘다 */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller && !movingRef.current) scroller.scrollTop = indexRef.current * scroller.clientHeight;
  }, [viewHeight]);

  const goTo = useCallback(
    (target: number) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const next = Math.max(0, Math.min(sceneCount - 1, target));
      const from = scroller.scrollTop;
      const to = next * scroller.clientHeight;

      indexRef.current = next;
      setIndex(next);
      controlsRef.current?.stop();

      if (reduceMotion || from === to) {
        movingRef.current = false;
        scroller.scrollTop = to;
        return;
      }

      movingRef.current = true;
      controlsRef.current = animate(from, to, {
        duration: SCROLL_SECONDS,
        ease: SCROLL_EASE,
        onUpdate: (value) => {
          scroller.scrollTop = value;
        },
        onComplete: () => {
          movingRef.current = false;
        },
      });
    },
    [sceneCount, reduceMotion],
  );

  /* 휠과 키보드 (마우스, 트랙패드 같은 정밀한 입력에서만) */
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let lastWheelAt = 0;
    let gestureDone = false;

    const handleWheel = (event: WheelEvent) => {
      /* 알림 창 같은 대화상자 안의 휠은 그대로 둔다 */
      if ((event.target as Element).closest('[role="dialog"]')) return;

      event.preventDefault();
      const now = performance.now();
      if (now - lastWheelAt > WHEEL_GESTURE_GAP) gestureDone = false;
      lastWheelAt = now;

      if (gestureDone || movingRef.current || Math.abs(event.deltaY) < WHEEL_MIN_DELTA) return;
      gestureDone = true;
      goTo(indexRef.current + (event.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.target as Element).closest('input, textarea, select, [role="dialog"]')) return;

      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        if (!movingRef.current) goTo(indexRef.current + 1);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        if (!movingRef.current) goTo(indexRef.current - 1);
      } else if (event.key === 'Home') {
        goTo(0);
      } else if (event.key === 'End') {
        goTo(sceneCount - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      controlsRef.current?.stop();
    };
  }, [goTo, sceneCount]);

  /* 터치로 직접 넘겼을 때 진행 점을 맞춘다 (우리가 움직이는 중에는 건드리지 않는다) */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      if (movingRef.current) return;
      const next = Math.round(scroller.scrollTop / scroller.clientHeight);
      if (next !== indexRef.current) {
        indexRef.current = next;
        setIndex(next);
      }
    };

    scroller.addEventListener('scroll', handleScroll);
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollerRef, viewHeight, index, goTo };
};

export default useSceneScroll;
