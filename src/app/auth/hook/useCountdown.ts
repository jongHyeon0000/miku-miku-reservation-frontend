import { useEffect, useState } from 'react';

/**
 * 초 단위 카운트다운 훅 (재발송 대기 시간 표시용)
 * startCountdown(초)로 시작하면 1초마다 줄어들어 0에서 멈춘다.
 */
const useCountdown = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return { countdown: seconds, startCountdown: setSeconds };
};

export default useCountdown;
