import type { TemplateType } from '@/app/category/template/constant/templateType';

/** 템플릿 한 건 (목록 항목) */
export interface Template {
  /** 템플릿 id */
  templateId: number;

  /** 템플릿 종류 */
  templateType: TemplateType;

  /** 이름 */
  name: string;

  /** 설명. 없으면 필드가 빠져 있다 */
  description?: string;

  /** 가져오면 만들어지는 하위 항목 수 (상위 그룹 수는 제외) */
  itemCount: number;

  /** 썸네일 주소 ('/uploads/...' 상대 경로). 없으면 필드가 빠져 있다 */
  thumbnailUrl?: string;
}
