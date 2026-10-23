import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

/*
* 탭에 마우스를 올리면 글자가 밝아지고 밑줄이 가운데서 양옆으로 퍼진다(상단 메뉴의 판매처는 패널이 열려 있는 동안 같은 모양).
* 선택된 탭은 Tabs 의 금색 밑줄이 있으므로 퍼지는 밑줄을 그리지 않는다. 모든 탭 줄이 이것을 바탕으로 쓴다.
* */
export const HoverTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    transition: theme.transitions.create('color'),
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '50%',
      right: '50%',
      bottom: 0,
      height: 2,
      backgroundColor: theme.palette.text.secondary,
      transition: theme.transitions.create(['left', 'right']),
    },
    '&:hover:not(.Mui-selected), &.shop-open': { color: theme.palette.text.primary },
    '&:hover::before, &.shop-open::before': { left: 0, right: 0 },
    '&.Mui-selected::before': { display: 'none' },
  },
}));

/*
* 아래에 선이 있는 탭 줄 (분류 축 탭, 마이페이지 탭)
* */
export const UnderlineTabs = styled(HoverTabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/* 탭 줄의 오른쪽 끝에 붙는 탭 (카테고리의 템플릿 가져오기) */
export const EndTab = styled(Tab)({
  marginLeft: 'auto',
});
