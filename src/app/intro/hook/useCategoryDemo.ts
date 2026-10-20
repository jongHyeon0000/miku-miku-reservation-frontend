import { useState } from 'react';
import type { CategoryAxisKey } from '@/app/category/constant/categoryAxes';
import type { CategoryGroup } from '@/app/category/interface/CategoryGroup';
import { INTRO_FIGURE_TYPE_GROUPS, INTRO_SERIES_GROUPS } from '@/app/intro/constant/introCategories';
import useDemoLoop from '@/app/intro/hook/useDemoLoop';
import { wait } from '@/app/intro/utils/IntroUtils';

/** 분류 화면의 한 모습 (보고 있는 축, 그때까지 만들어진 상위와 하위, 오른쪽에 펼친 상위) */
interface CategoryDemoStep {
  axis: CategoryAxisKey;
  groups: CategoryGroup[];
  selectedGroupId: number;
}

/* 상위를 하나 만들고, 그 아래 하위를 하나씩 채우는 모습을 순서대로 만든다 */
const buildSteps = (axis: CategoryAxisKey, groups: CategoryGroup[]): CategoryDemoStep[] => {
  return groups.flatMap((group, groupIndex) =>
    Array.from({ length: group.children.length + 1 }, (_, childCount) => ({
      axis,
      groups: [...groups.slice(0, groupIndex), { ...group, children: group.children.slice(0, childCount) }],
      selectedGroupId: group.id,
    })),
  );
};

/* 형태 축을 채운 뒤 시리즈 축으로 넘어간다 */
const STEPS: CategoryDemoStep[] = [
  ...buildSteps('figure-type', INTRO_FIGURE_TYPE_GROUPS),
  ...buildSteps('series', INTRO_SERIES_GROUPS),
];

const STEP_MILLISECONDS = 650;
const AXIS_CHANGE_MILLISECONDS = 1800;

/**
 * 분류 만들기 데모 대본. 돌려주는 step 이 축 탭과 분류 목록에 그대로 쓰인다.
 */
const useCategoryDemo = (active: boolean): CategoryDemoStep => {
  const [step, setStep] = useState<CategoryDemoStep>(STEPS[0]);

  useDemoLoop(active, async (alive) => {
    for (let i = 0; i < STEPS.length; i++) {
      setStep(STEPS[i]);
      const axisChanges = i + 1 < STEPS.length && STEPS[i + 1].axis !== STEPS[i].axis;
      await wait(axisChanges || i + 1 === STEPS.length ? AXIS_CHANGE_MILLISECONDS : STEP_MILLISECONDS);
      if (!alive()) return;
    }
  });

  return step;
};

export default useCategoryDemo;
