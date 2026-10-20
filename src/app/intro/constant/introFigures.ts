import dayjs from 'dayjs';
import type { CategoryGroup } from '@/app/category/interface/CategoryGroup';
import type { FigureStatus } from '@/app/figure/constant/figureStatus';
import type { FigureCategoryRef } from '@/app/figure/interface/FigureCategoryRef';
import type { FigureMakerRef } from '@/app/figure/interface/FigureMakerRef';
import type { FigureSummary } from '@/app/figure/interface/FigureSummary';
import {
  INTRO_CHARACTER_GROUPS,
  INTRO_FIGURE_TYPE_GROUPS,
  INTRO_MAKERS,
  INTRO_SERIES_GROUPS,
  INTRO_SHOP_GROUPS,
} from '@/app/intro/constant/introCategories';
import { INTRO_FIGURE_SOURCES, type IntroFigureSource } from '@/app/intro/constant/introFigureSource';
import { INTRO_THUMBNAILS } from '@/app/intro/constant/introImages';

/*
* 소개 화면 데모에 쓰는 상품 목데이터 (목록 응답 한 건의 모양 그대로, 20건).
* 이름과 분류는 원본(introFigureSource)이고, 상태, 가격, 수량, 마감일, 배송월은 순서에 따라 정해 둔다(실제 구매 내역과 무관).
* 마감일과 배송월은 항상 "오늘 기준 며칠 뒤"로 만들어, 언제 열어도 마감 임박(깜빡임, 알림)이 그대로 보이게 한다.
* */

const dayAfter = (days: number): string => dayjs().add(days, 'day').format('YYYY-MM-DD');

const monthAfter = (months: number): string => dayjs().add(months, 'month').startOf('month').format('YYYY-MM-DD');

/* 상태는 이 순서가 되풀이된다 (미구매를 가장 많이) */
const STATUS_CYCLE: FigureStatus[] = ['CART', 'UNPURCHASED', 'UNPURCHASED', 'RESERVED', 'PURCHASED', 'DELIVERED'];

/* 분류 목데이터에서 id 로 하위를 찾아 상품이 가진 분류 모양으로 바꾼다 */
const refById = (groups: CategoryGroup[], itemId: number): FigureCategoryRef => {
  const found = groups.find((candidate) => candidate.children.some((child) => child.id === itemId))!;
  const child = found.children.find((candidate) => candidate.id === itemId)!;
  return { id: child.id, name: child.name, groupId: found.id, groupName: found.name };
};

const refByName = (groups: CategoryGroup[], name: string): FigureCategoryRef => {
  const child = groups.flatMap((candidate) => candidate.children).find((candidate) => candidate.name === name)!;
  return refById(groups, child.id);
};

const makerByName = (name: string): FigureMakerRef => {
  const found = INTRO_MAKERS.find((maker) => maker.name === name)!;
  return { id: found.id, name: found.name };
};

/* 형태: 넨도로이드는 기본형, 스케일은 이름에 1/7 이 있으면 1/7 스케일 */
const figureTypeOf = (source: IntroFigureSource): FigureCategoryRef => {
  if (source.style === '넨도로이드') return refById(INTRO_FIGURE_TYPE_GROUPS, 21);
  return refById(INTRO_FIGURE_TYPE_GROUPS, source.name.includes('1/7') ? 11 : 14);
};

/* 시리즈: 특전이나 한정이면 특전·한정, 재판이면 재판, 나머지는 일반 예약 */
const seriesOf = (source: IntroFigureSource): FigureCategoryRef => {
  if (/\[특전\]|한정/.test(source.name)) return refById(INTRO_SERIES_GROUPS, 61);
  if (source.name.includes('(재판)')) return refById(INTRO_SERIES_GROUPS, 62);
  return refById(INTRO_SERIES_GROUPS, 71);
};

const toFigure = (source: IntroFigureSource, index: number): FigureSummary => {
  const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
  const beforePurchase = status === 'CART' || status === 'UNPURCHASED';
  const price = (source.style === '넨도로이드' ? 60000 : 130000) + ((index * 7) % 5) * 10000;

  return {
    figureId: Number(source.id),
    status,
    paymentType: status === 'RESERVED' ? 'DEPOSIT' : status === 'PURCHASED' || status === 'DELIVERED' ? 'FULL' : null,
    name: source.name,
    deliveryMonth: status === 'DELIVERED' ? monthAfter(-1) : monthAfter(1 + (index % 4)),
    reservationDeadline: beforePurchase ? dayAfter(10 + ((index * 13) % 70)) : '',
    price,
    quantity: index % 5 === 1 ? 2 : 1,
    depositAmount: status === 'RESERVED' ? 30000 : null,
    balanceDueDate: status === 'RESERVED' ? dayAfter(5 + ((index * 7) % 40)) : null,
    thumbnailUrl: INTRO_THUMBNAILS[source.id] ?? null,
    purchaseLink: '',
    figureType: figureTypeOf(source),
    shop: refByName(INTRO_SHOP_GROUPS, source.shop),
    maker: makerByName(source.maker),
    series: [seriesOf(source)],
    characters: source.character.split(', ').map((name) => refByName(INTRO_CHARACTER_GROUPS, name)),
  };
};

/** 소개 화면의 상품 20건 (figureId 는 원본 id 의 숫자: 2~21) */
export const INTRO_FIGURES: FigureSummary[] = INTRO_FIGURE_SOURCES.map(toFigure);

/** figureId 로 골라 순서대로 */
export const pickIntroFigures = (figureIds: number[]): FigureSummary[] => {
  return figureIds.map((figureId) => INTRO_FIGURES.find((figure) => figure.figureId === figureId)!);
};

/** 등록 데모가 분류를 골라 완성하는 상품 (넨도로이드, 한정판 모음 시리즈가 붙은 3번) */
export const INTRO_REGISTER_FIGURE: FigureSummary = pickIntroFigures([3])[0];
