/** 가져오기 미리보기 */
export interface TemplateImportPreview {
  /** 템플릿 id */
  templateId: number;

  /** 템플릿 이름 */
  name: string;

  /** 새로 추가될 하위 항목 수 */
  addCount: number;

  /** 이미 있어서 제외될 항목 수 */
  skippedCount: number;

  /** 새로 추가될 항목 (상위 그룹별). 없으면 빈 배열 */
  added: TemplateImportGroup[];

  /** 제외될 항목 (상위 그룹별). 없으면 빈 배열 */
  skipped: TemplateImportGroup[];
}

/** 추가되거나 제외될 항목의 상위 그룹 */
export interface TemplateImportGroup {
  /** 상위 그룹 이름. 제조사 템플릿은 상위가 없어 필드가 빠져 있다 */
  groupName?: string;

  /** 그룹에 속한 항목 */
  items: TemplateImportItem[];
}

/** 추가되거나 제외될 항목 한 건 (템플릿에 있는 값) */
export interface TemplateImportItem {
  /** 이름 */
  name: string;

  /** 설명. 없으면 필드가 빠져 있다 */
  description?: string;

  /** 썸네일 주소 ('/uploads/...' 상대 경로). 없으면 필드가 빠져 있다 */
  thumbnailUrl?: string;
}
