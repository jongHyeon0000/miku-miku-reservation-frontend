/** 목록 선택 모드. MANAGE 는 상품 관리(삭제), STATUS 는 상태 변경(일괄). 평소는 모드 없음(null) */
export const SELECT_MODES = ['MANAGE', 'STATUS'] as const;

export type SelectMode = (typeof SELECT_MODES)[number];

/** 선택 모드 이름 (선택 모드 중 목록 제목 자리에 보여 준다) */
export const SELECT_MODE_NAMES: Record<SelectMode, string> = {
  MANAGE: '상품 관리',
  STATUS: '상태 변경',
};
