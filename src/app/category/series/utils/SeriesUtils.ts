import type { SeriesFormValues } from '@/app/category/series/interface/SeriesFormValues';

/**
 * 시리즈 추가, 수정 입력을 서버 요청 본문으로 바꾼다.
 * 하위를 추가할 때만 상위 id 를 groupId 로 넣고, 설명이 비어 있으면 필드를 뺀다.
 */
export const toSeriesRequest = (values: SeriesFormValues, groupId?: number): Record<string, unknown> => {
  const groupField = groupId !== undefined ? { groupId } : {};
  const descriptionField = values.description.trim() === '' ? {} : { description: values.description };

  return { ...groupField, name: values.name.trim(), ...descriptionField };
};
