import type { FigureTypeFormValues } from '@/app/category/figure-type/interface/FigureTypeFormValues';

/**
 * 형태 추가, 수정 입력을 서버 요청 본문으로 바꾼다.
 * 하위를 추가할 때만 상위 id 를 groupId 로 넣고, 설명이 비어 있으면 필드를 뺀다.
 */
export const toFigureTypeRequest = (values: FigureTypeFormValues, groupId?: number): Record<string, unknown> => {
  const groupField = groupId !== undefined ? { groupId } : {};
  const descriptionField = values.description.trim() === '' ? {} : { description: values.description };

  return { ...groupField, name: values.name.trim(), ...descriptionField };
};
