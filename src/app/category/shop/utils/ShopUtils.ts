import type { ShopFormValues } from '@/app/category/shop/interface/ShopFormValues';

/**
 * [카테고리 페이지]
 *
 * 판매처 주소: 선택 입력, http 또는 https 로 시작. 길이(2000자)는 서버가 검사한다.
 */
export const validateShopUrl = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (trimmed !== '' && !/^https?:\/\//i.test(trimmed)) return 'http:// 또는 https:// 로 시작하는 주소를 입력해 주세요.';
  return undefined;
};

/**
 * 판매처 추가, 수정 입력을 서버 요청 본문으로 바꾼다.
 * 하위를 추가할 때만 상위 id 를 groupId 로 넣고, 설명이 비어 있으면 필드를 뺀다.
 */
export const toShopRequest = (values: ShopFormValues, groupId?: number): Record<string, unknown> => {
  const groupField = groupId !== undefined ? { groupId } : {};
  const descriptionField = values.description.trim() === '' ? {} : { description: values.description };
  const urlField = values.url.trim() === '' ? {} : { url: values.url.trim() };

  return { ...groupField, name: values.name.trim(), ...descriptionField, ...urlField };
};
