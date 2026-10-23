import type { SyntheticEvent } from 'react';
import { Tab } from '@mui/material';
import { CATEGORY_AXIS_NAMES, isCategoryAxisKey, type CategoryAxisKey } from '@/app/category/common/constant/categoryAxes';
import { EndTab, UnderlineTabs } from '@/app/common/style/CommonTabs.style';

interface CategoryAxisTabsProps {
  /** 지금 보고 있는 축 */
  axis: CategoryAxisKey;

  /** 다른 축의 탭을 눌렀을 때 */
  onChange: (axis: CategoryAxisKey) => void;
}

/**
 * 분류 축 탭 (판매처, 형태, 시리즈, 장르·캐릭터, 제조사)와 오른쪽 끝의 템플릿 가져오기 탭
 */
const CategoryAxisTabs = ({ axis, onChange }: CategoryAxisTabsProps) => {
  const handleAxisChange = (_event: SyntheticEvent, value: string) => {
    if (isCategoryAxisKey(value)) onChange(value);
  };

  return (
    <UnderlineTabs value={axis} onChange={handleAxisChange}>
      {Object.entries(CATEGORY_AXIS_NAMES).map(([key, name]) => (
        <Tab key={key} value={key} label={name} />
      ))}
      <EndTab value="template" label="템플릿 가져오기" />
    </UnderlineTabs>
  );
};

export default CategoryAxisTabs;
