import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AppBar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import useAuth from '@/app/auth/service/useAuth';
import { PROTECTED_CATEGORY_NAME } from '@/app/category/common/constant/categoryAxes';
import useReadShopList from '@/app/category/shop/service/useReadShopList';
import GnbShopPanel from '@/app/common/component/GnbShopPanel';
import mainIcon from '@/assets/common/main-icon.png';
import { Row } from '@/app/common/style/CommonLayout.style';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { nudgeAnimate, nudgeTransition } from '@/app/common/style/CommonMotion.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { APP_ROUTES } from '@/config/route/RoutesConfig';
import { useUiStore } from '@/store/uiStore';
import { styled } from '@mui/material/styles';

/* 화면에 보이는 앱 이름. index.html 의 <title> 은 코드가 아니라서 같은 글자를 따로 적는다 */
const APP_NAME = '미쿠미쿠예약시스템';

/*
* 상단 메뉴에 나올 라우트 (APP_ROUTES 에서 type 이 gnb 인 것)
* */
const GNB_ROUTES = APP_ROUTES.filter((route) => route.type === 'gnb');

/* 판매처 탭은 이동하는 주소가 없어서 라우트 표에 없다. 이 경로의 탭 바로 앞(분류와 소개 사이)에 끼운다 */
const SHOP_TAB_BEFORE = '/intro';

/* 탭에서 패널로 마우스가 건너가는 사이에 닫히지 않도록 닫기를 미루는 시간(ms) */
const SHOP_CLOSE_DELAY = 150;

/*
* 로그인 안내 문구를 숨기는 경로 (로그인, 회원가입, 아이디 찾기, 비밀번호 재설정: 이미 인증 화면이다)
* */
const AUTH_PATHS = APP_ROUTES.filter((route) => ['login', 'signup', 'find-id', 'reset-password'].includes(route.type)).map(
  (route) => route.path,
);

/**
 * 상단 고정 메뉴바
 * 로그인하면 메뉴 탭과 프로필 메뉴가, 하지 않았으면 로그인 버튼과 그 왼쪽의 안내 문구(화살표가 흔들린다)가 보인다.
 * 로그인, 회원가입, 아이디 찾기, 비밀번호 재설정 화면에서는 안내 문구를 숨긴다.
 */
const GNB = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { shopList } = useReadShopList(isAuthenticated);
  const [shopOpen, setShopOpen] = useState<boolean>(false);
  const shopCloseTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(shopCloseTimer.current), []);

  /* 기본 분류 '기타'와, 빠진 뒤 하위가 하나도 없는 상위는 패널에 보이지 않는다 */
  const shopGroups =
    shopList?.code === API_CODE.OK
      ? (shopList.data ?? [])
          .filter((group) => group.name !== PROTECTED_CATEGORY_NAME)
          .map((group) => ({ ...group, children: group.children.filter((shop) => shop.name !== PROTECTED_CATEGORY_NAME) }))
          .filter((group) => group.children.length > 0)
      : [];

  /* 현재 주소가 속한 메뉴 탭 (상품 상세 같은 하위 주소도 '상품' 탭으로 본다) */
  const activeRoute = GNB_ROUTES.find((route) => pathname === route.path || pathname.startsWith(`${route.path}/`));

  const handleShopEnter = () => {
    window.clearTimeout(shopCloseTimer.current);
    setShopOpen(true);
  };

  const handleShopLeave = () => {
    window.clearTimeout(shopCloseTimer.current);
    shopCloseTimer.current = window.setTimeout(() => setShopOpen(false), SHOP_CLOSE_DELAY);
  };

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleMyPage = () => {
    handleCloseMenu();
    navigate('/my-page');
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout();
    navigate('/intro', { replace: true });
    showSnackbar('로그아웃되었습니다.', 'success');
  };

  return (
    <GnbBar position="sticky" elevation={0}>
      <Toolbar>
        <Brand variant="h6" component={Link} to="/">
          <BrandIcon src={mainIcon} alt="" />
          {APP_NAME}
        </Brand>

        {isAuthenticated ? (
          <>
            <NavTabs value={activeRoute?.path ?? false}>
              {GNB_ROUTES.map((route) => [
                route.path === SHOP_TAB_BEFORE && shopGroups.length > 0 && (
                  <Tab
                    key="shop"
                    value="shop"
                    label="판매처"
                    className={shopOpen ? 'shop-open' : undefined}
                    onMouseEnter={handleShopEnter}
                    onMouseLeave={handleShopLeave}
                  />
                ),
                <Tab key={route.path} value={route.path} label={route.nameKr} component={Link} to={route.path} />,
              ])}
            </NavTabs>

            <IconButton aria-label="프로필 메뉴" onClick={handleOpenMenu}>
              {user!.thumbnailUrl ? (
                <ThumbAvatar size="sm" src={imageUrl(user!.thumbnailUrl)} />
              ) : (
                <AccountCircleOutlinedIcon />
              )}
            </IconButton>
            <Menu anchorEl={anchorEl} open={anchorEl !== null} onClose={handleCloseMenu}>
              <MenuName variant="subtitle2">{user!.name}</MenuName>
              <Divider />
              <MenuItem onClick={handleMyPage}>
                <ListItemIcon>
                  <PersonOutlinedIcon fontSize="small" />
                </ListItemIcon>
                마이페이지
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutOutlinedIcon fontSize="small" />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Spacer />
            <Row>
              {!AUTH_PATHS.includes(pathname) && (
                <>
                  <HintText variant="body2">로그인 후 바로 시작하기</HintText>
                  <HintArrow animate={nudgeAnimate} transition={nudgeTransition}>
                    <ArrowForwardIcon fontSize="small" />
                  </HintArrow>
                </>
              )}
              <Button color="primary" component={Link} to="/login">
                로그인
              </Button>
            </Row>
          </>
        )}
      </Toolbar>
      {isAuthenticated && (
        <GnbShopPanel groups={shopGroups} open={shopOpen} onMouseEnter={handleShopEnter} onMouseLeave={handleShopLeave} />
      )}
    </GnbBar>
  );
};

export default GNB;

/* ───────── styles ───────── */

const GnbBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Brand = styled(Typography)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  textDecoration: 'none',
})) as typeof Typography;

/* 글자 높이에 가깝게 rem 으로 정한다 */
const BrandIcon = styled('img')(({ theme }) => ({
  height: '2rem',
  borderRadius: theme.shape.borderRadius,
}));

const MenuName = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2),
})) as typeof Typography;

const Spacer = styled('div')({ flexGrow: 1 });

/*
* 탭에 마우스를 올리면 글자가 밝아지고 밑줄이 가운데서 양옆으로 퍼진다(판매처는 패널이 열려 있는 동안 같은 모양).
* 선택된 탭은 Tabs 의 금색 밑줄이 있으므로 퍼지는 밑줄을 그리지 않는다.
* */
const NavTabs = styled(Tabs)(({ theme }) => ({
  flexGrow: 1,
  marginLeft: theme.spacing(3),
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

/* 로그인 버튼 왼쪽의 안내 문구. 좁은 화면에서는 버튼만 남기고 숨긴다 */
const HintText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('sm')]: { display: 'none' },
})) as typeof Typography;

/* 문구 뒤의 화살표. 로그인 버튼 쪽을 가리키며 흔들린다 */
const HintArrow = styled(motion.span)(({ theme }) => ({
  display: 'inline-flex',
  color: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: { display: 'none' },
}));
