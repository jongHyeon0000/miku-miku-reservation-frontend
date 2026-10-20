import type { CategoryGroup } from '@/app/category/interface/CategoryGroup';
import type { CategoryItem } from '@/app/category/interface/CategoryItem';
import type { FigurePickItem } from '@/app/figure/interface/FigurePickItem';
import { toGroupPickItems, toPickItems } from '@/app/figure/utils/FigureUtils';
import { INTRO_FIGURE_SOURCES } from '@/app/intro/constant/introFigureSource';

/*
* 소개 화면 데모에 쓰는 분류 목데이터 (서버가 주는 모양 그대로).
* 형태, 판매처, 시리즈는 원본 상품(introFigureSource)에 맞춰 정해 둔 것이고, 장르·캐릭터와 제조사는 원본에서 뽑는다.
* 상품 목데이터(introFigures)가 이 분류를 가리키므로 id 를 같이 쓴다.
* */

const item = (id: number, name: string, groupId: number): CategoryItem => ({ id, name, groupId });

const group = (id: number, name: string, children: CategoryItem[]): CategoryGroup => ({ id, name, children });

const unique = (values: string[]): string[] => [...new Set(values)];

/** 형태 (원본의 형태가 스케일이면 이름에 1/7 이 있는지로 나눈다) */
export const INTRO_FIGURE_TYPE_GROUPS: CategoryGroup[] = [
  group(1, '스케일', [item(11, '1/7 스케일', 1), item(14, '기타 스케일', 1)]),
  group(2, '넨도로이드', [item(21, '기본형', 2)]),
];

/** 판매처 */
export const INTRO_SHOP_GROUPS: CategoryGroup[] = [group(4, '국내 스토어', [item(41, '네이버스토어', 4), item(42, '코믹스아트', 4)])];

/** 시리즈 (한정판 모음은 사용자가 직접 만든 분류의 예) */
export const INTRO_SERIES_GROUPS: CategoryGroup[] = [
  group(6, '한정판 모음', [item(61, '특전·한정', 6), item(62, '재판', 6)]),
  group(7, '정규 발매', [item(71, '일반 예약', 7)]),
];

/** 장르·캐릭터 (상품 카드의 장르 글자가 상위 이름을 쓴다). id 는 장르 8부터, 캐릭터는 장르마다 10 단위로 시작해 나온 순서대로 */
export const INTRO_CHARACTER_GROUPS: CategoryGroup[] = unique(INTRO_FIGURE_SOURCES.map((source) => source.genre)).map(
  (genre, genreIndex) => {
    const groupId = 8 + genreIndex;
    const names = unique(INTRO_FIGURE_SOURCES.filter((source) => source.genre === genre).flatMap((source) => source.character.split(', ')));
    return group(
      groupId,
      genre,
      names.map((name, nameIndex) => item(100 + genreIndex * 10 + nameIndex, name, groupId)),
    );
  },
);

/** 제조사 (상위가 없다) */
export const INTRO_MAKERS: CategoryItem[] = unique(INTRO_FIGURE_SOURCES.map((source) => source.maker)).map((name, index) => ({
  id: index + 1,
  name,
}));

/** 등록 데모의 분류 선택 칸이 쓰는 선택지 */
export const INTRO_PICK_POOLS: Record<'figureType' | 'shop' | 'series' | 'maker', FigurePickItem[]> = {
  figureType: toPickItems(INTRO_FIGURE_TYPE_GROUPS),
  shop: toPickItems(INTRO_SHOP_GROUPS),
  series: toPickItems(INTRO_SERIES_GROUPS),
  maker: toGroupPickItems(INTRO_MAKERS),
};
