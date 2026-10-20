/**
 * 소개 화면의 데모가 같이 쓰는 도구 모음
 */

/** 데모 대본에서 기다린다 (장면을 떠나면 대본이 알아서 멈춘다) */
export const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/** 데모 화면은 눌러 볼 수 없으므로 실제 컴포넌트가 요구하는 핸들러 자리에 넣는다 */
export const noop = (): undefined => undefined;
