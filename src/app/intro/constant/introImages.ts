/**
* 소개 화면의 이미지. src/assets/intro/figures/ 에 둔 파일을 번호 순서로 모두 읽는다.
* 파일 이름이 introFigureSource 의 id 와 같으면 그 상품의 썸네일이 되고, 첫 화면 롤링에도 모두 쓰인다.
* 파일을 넣거나 지우기만 하면 되고 코드는 고치지 않는다.
* */
const FIGURE_IMAGE_FILES = import.meta.glob<string>('@/assets/intro/figures/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** 파일 이름에서 확장자를 뗀 번호 ("…/002.jpg" -> "002") */
const toFigureId = (path: string): string => path.split('/').pop()!.split('.')[0];

/** 번호 순서로 정렬한 [번호, 이미지 주소] 목록 */
const FIGURE_IMAGES: [string, string][] = Object.entries(FIGURE_IMAGE_FILES)
  .map(([path, url]): [string, string] => [toFigureId(path), url])
  .sort(([a], [b]) => a.localeCompare(b));

/** 번호로 찾는 상품 썸네일 */
export const INTRO_THUMBNAILS: Record<string, string> = Object.fromEntries(FIGURE_IMAGES);

/** 첫 화면에서 오른쪽에서 왼쪽으로 흐르는 이미지 목록 (번호 순서) */
export const INTRO_IMAGES: string[] = FIGURE_IMAGES.map(([, url]) => url);
