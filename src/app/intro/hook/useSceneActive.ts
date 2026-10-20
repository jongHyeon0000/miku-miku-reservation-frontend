import { useEffect, useRef, useState } from 'react';

/* 장면이 이만큼 보이면 지금 보고 있는 장면으로 본다 */
const SCENE_ACTIVE_RATIO = 0.6;

/**
 * 장면이 화면에 들어오면 active 가 true, 나가면 false 가 된다. 장면의 글 등장과 데모 재생을 여기에 맞춘다.
 * sceneRef 를 장면(Scene)에 붙인다.
 */
const useSceneActive = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: SCENE_ACTIVE_RATIO });
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return { sceneRef, active };
};

export default useSceneActive;
