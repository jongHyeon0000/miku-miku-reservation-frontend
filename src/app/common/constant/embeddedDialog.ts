import type { DialogProps } from '@mui/material';

/**
* 대화상자를 화면 전체가 아니라 놓인 자리 안에 그리는 설정 (소개 화면의 데모).
* 포털을 쓰지 않고, 스크롤 잠금과 포커스 가두기를 끈다. 놓일 자리는 contain 으로 기준 상자를 만든 영역이어야 한다.
* */
export const EMBEDDED_DIALOG_PROPS: Partial<DialogProps> = {
  disablePortal: true,
  disableScrollLock: true,
  disableEnforceFocus: true,
  disableAutoFocus: true,
  disableRestoreFocus: true,
};
