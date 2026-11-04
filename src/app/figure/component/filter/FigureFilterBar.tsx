import FigureCategoryFilter from '@/app/figure/component/filter/FigureCategoryFilter';
import CommonFlatFilter from '@/app/common/component/CommonFlatFilter';
import { FIGURE_SORT_OPTIONS, type FigureSortKey } from '@/app/figure/constant/figureSortOptions';
import type { FigureFilterOptions, FigureFilterValue, FigureFilterKey, FigureFilters } from '@/app/figure/interface/FigureFilter';
import { formatDeliveryMonth } from '@/app/figure/utils/FigureUtils';
import { Row, SpreadRow } from '@/app/common/style/CommonLayout.style';
import type { ReactNode } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FigureFilterBarProps {
  /** 지금 탭의 상품에 쓰인 분류만 모은 선택지 */
  options: FigureFilterOptions;

  /** 고른 분류 필터 */
  filters: FigureFilters;

  /** 고른 배송월 ("YYYY-MM"). 없으면 null */
  month: string | null;

  /** 고른 정렬 */
  sort: FigureSortKey;

  /** 분류 필터를 골랐을 때 */
  onFilterChange: (key: FigureFilterKey, value: FigureFilterValue | null) => void;

  /** 배송월을 골랐을 때 */
  onMonthChange: (month: string | null) => void;

  /** 정렬을 골랐을 때 */
  onSortChange: (sort: FigureSortKey) => void;

  /** 필터 초기화 */
  onReset: () => void;

  /** 오른쪽 묶음 맨 앞(배송월 앞)에 놓을 목록 작업 버튼들 (상품 삭제, 상태 변경 등) */
  actions?: ReactNode;
}

const SORT_OPTIONS = FIGURE_SORT_OPTIONS.map((option) => ({ value: option.key, label: option.label }));

/**
 * 필터 줄 (한 줄 고정). 왼쪽에 분류 필터, 오른쪽에 목록 작업 버튼(actions), 배송월과 정렬, 맨 오른쪽에 필터 초기화.
 */
const FigureFilterBar = ({
  options,
  filters,
  month,
  sort,
  onFilterChange,
  onMonthChange,
  onSortChange,
  onReset,
  actions,
}: FigureFilterBarProps) => {
  return (
    <SpreadRow>
      <Row>
        <FigureCategoryFilter
          label="형태"
          groups={options.figureType}
          value={filters.figureType}
          onChange={(value) => onFilterChange('figureType', value)}
        />
        <FigureCategoryFilter
          label="판매처"
          groups={options.shop}
          value={filters.shop}
          onChange={(value) => onFilterChange('shop', value)}
        />
        <FigureCategoryFilter
          label="제조사"
          items={options.maker}
          value={filters.maker}
          onChange={(value) => onFilterChange('maker', value)}
        />
        <FigureCategoryFilter
          label="시리즈"
          groups={options.series}
          value={filters.series}
          onChange={(value) => onFilterChange('series', value)}
        />
        <FigureCategoryFilter
          label="장르·캐릭터"
          groups={options.character}
          value={filters.character}
          onChange={(value) => onFilterChange('character', value)}
        />
      </Row>

      <RightSide>
        {actions}
        <CommonFlatFilter
          allLabel="배송월 전체"
          options={options.months.map((option) => ({ value: option, label: formatDeliveryMonth(option) }))}
          value={month}
          onChange={onMonthChange}
        />
        <CommonFlatFilter
          options={SORT_OPTIONS}
          value={sort}
          onChange={(value) => onSortChange(value as FigureSortKey)}
        />
        <ResetButton variant="outlined" color="inherit" onClick={onReset}>
          필터 초기화
        </ResetButton>
      </RightSide>
    </SpreadRow>
  );
};

export default FigureFilterBar;

/** ───────── styles ───────── */

const RightSide = styled(Row)({
  marginLeft: 'auto',
  flexShrink: 0,
});

const ResetButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  fontWeight: 400,
  color: theme.palette.text.secondary,
  borderColor: theme.palette.divider,
  '&:hover': { color: theme.palette.primary.main, borderColor: theme.palette.primary.main },
}));
