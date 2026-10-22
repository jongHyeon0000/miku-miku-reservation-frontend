import type { MakerFormValues } from '@/app/category/maker/interface/MakerFormValues';

/**
 * 제조사 추가, 수정 입력을 서버 요청 본문으로 바꾼다. 설명이 비어 있으면 필드를 뺀다.
 */
export const toMakerRequest = (values: MakerFormValues): Record<string, unknown> => {
  const descriptionField = values.description.trim() === '' ? {} : { description: values.description };

  return { name: values.name.trim(), ...descriptionField };
};
