import { useState } from 'react';
import { EMPTY_FIGURE_FILTERS } from '@/app/figure/constant/figureFilter';
import { DEFAULT_FIGURE_SORT, type FigureSortKey } from '@/app/figure/constant/figureSortOptions';
import type { FigureFilters } from '@/app/figure/interface/FigureFilter';
import { pickIntroFigures } from '@/app/intro/constant/introFigures';
import useDemoLoop from '@/app/intro/hook/useDemoLoop';
import { wait } from '@/app/intro/utils/IntroUtils';

/** 검색 화면의 한 모습 (걸린 분류 필터, 배송월, 정렬) */
interface SearchDemoStep {
  filters: FigureFilters;
  month: string | null;
  sort: FigureSortKey;
}

/** 배송월 필터로 고르는 달 (상품 2번의 배송월, "YYYY-MM") */
const MONTH = pickIntroFigures([2])[0].deliveryMonth.slice(0, 7);

const NO_FILTERS = { filters: EMPTY_FIGURE_FILTERS, month: null, sort: DEFAULT_FIGURE_SORT };

/** 전체 → 상위 분류(그룹 단위) → 하위 분류(개별 단위) → 직접 만든 분류 → 배송월 → 정렬. id 는 introCategories 의 것이다 */
const STEPS: SearchDemoStep[] = [
  { ...NO_FILTERS },
  {
    ...NO_FILTERS,
    filters: { ...EMPTY_FIGURE_FILTERS, figureType: { groupId: 1, itemId: null } },
  },
  {
    ...NO_FILTERS,
    filters: { ...EMPTY_FIGURE_FILTERS, figureType: { groupId: 1, itemId: 11 } },
  },
  {
    ...NO_FILTERS,
    filters: { ...EMPTY_FIGURE_FILTERS, series: { groupId: 6, itemId: null } },
  },
  { ...NO_FILTERS, month: MONTH },
  { ...NO_FILTERS, sort: 'MONTH_ASC' },
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

      if (!alive()) {
        return;
      }
    }
  });

  return step;
};

export default useSearchDemo;
