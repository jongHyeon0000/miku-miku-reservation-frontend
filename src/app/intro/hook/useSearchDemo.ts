import { useState } from 'react';
import { EMPTY_FIGURE_FILTERS } from '@/app/figure/constant/figureFilter';
import { DEFAULT_FIGURE_SORT, type FigureSortKey } from '@/app/figure/constant/figureSortOptions';
import type { FigureFilters } from '@/app/figure/interface/FigureFilters';
import { pickIntroFigures } from '@/app/intro/constant/introFigures';
import useDemoLoop from '@/app/intro/hook/useDemoLoop';
import { wait } from '@/app/intro/utils/IntroUtils';

/** 검색 화면의 한 모습 (걸린 분류 필터, 배송월, 정렬, 그 모습을 설명하는 글) */
interface SearchDemoStep {
  filters: FigureFilters;
  month: string | null;
  sort: FigureSortKey;
  caption: string;
}

/* 배송월 필터로 고르는 달 (상품 2번의 배송월, "YYYY-MM") */
const MONTH = pickIntroFigures([2])[0].deliveryMonth.slice(0, 7);

const NO_FILTERS = { filters: EMPTY_FIGURE_FILTERS, month: null, sort: DEFAULT_FIGURE_SORT };

/* 전체 → 상위 분류(그룹 단위) → 하위 분류(개별 단위) → 직접 만든 분류 → 배송월 → 정렬. id 는 introCategories 의 것이다 */
const STEPS: SearchDemoStep[] = [
  { ...NO_FILTERS, caption: '조건 없이 전체를 봐요.' },
  {
    ...NO_FILTERS,
    filters: { ...EMPTY_FIGURE_FILTERS, figureType: { groupId: 1, itemId: null } },
    caption: '그룹 단위로 찾아요. 스케일 피규어 전체예요.',
  },
  {
    ...NO_FILTERS,
    filters: { ...EMPTY_FIGURE_FILTERS, figureType: { groupId: 1, itemId: 11 } },
    caption: '개별 분류로 좁혀요. 스케일 피규어 중 1/7만 봐요.',
  },
  {
    ...NO_FILTERS,
    filters: { ...EMPTY_FIGURE_FILTERS, series: { groupId: 6, itemId: null } },
    caption: '내가 만든 분류로 찾아요. 한정판 모음 시리즈예요.',
  },
  { ...NO_FILTERS, month: MONTH, caption: '배송월을 골라 그달에 올 것만 모아요.' },
  { ...NO_FILTERS, sort: 'MONTH_ASC', caption: '배송 빠른순으로 정렬하면 먼저 올 것부터 보여요.' },
];

const STEP_MILLISECONDS = 2200;

/**
 * 검색 데모 대본. 돌려주는 값이 필터 줄, 필터 칩, 목록에 그대로 쓰인다.
 */
const useSearchDemo = (active: boolean): SearchDemoStep => {
  const [step, setStep] = useState<SearchDemoStep>(STEPS[0]);

  useDemoLoop(active, async (alive) => {
    for (const next of STEPS) {
      setStep(next);
      await wait(STEP_MILLISECONDS);
      if (!alive()) return;
    }
  });

  return step;
};

export default useSearchDemo;
