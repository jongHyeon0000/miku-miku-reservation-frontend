import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tab, Toolbar, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import useAuth from '@/app/auth/service/useAuth';
import { PROTECTED_CATEGORY_NAME } from '@/app/category/common/constant/categoryAxes';
import useReadShopList from '@/app/category/shop/service/useReadShopList';
import GnbShopPanel from '@/app/common/component/GnbShopPanel';
import mainIcon from '@/assets/common/main-icon.png';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { HoverTabs } from '@/app/common/style/CommonTabs.style';
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

/* 판매처 탭은 이동하는 주소가 없어서 라우트 표에 없다. 라우트 탭들 뒤에 붙인다 */
/* 탭에서 패널로 마우스가 건너가는 사이에 닫히지 않도록 닫기를 미루는 시간(ms) */
const SHOP_CLOSE_DELAY = 150;

/**
 * 상단 고정 메뉴바
 * 로그인하면 메뉴 탭과 프로필 메뉴가, 하지 않았으면 로그인 버튼이 보인다.
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
              {GNB_ROUTES.map((route) => (
                <Tab key={route.path} value={route.path} label={route.nameKr} component={Link} to={route.path} />
              ))}
              {shopGroups.length > 0 && (
                <Tab
                  key="shop"
                  value="shop"
                  label="판매처"
                  className={shopOpen ? 'shop-open' : undefined}
                  onMouseEnter={handleShopEnter}
                  onMouseLeave={handleShopLeave}
                />
              )}
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
            <Button color="primary" component={Link} to="/login">
              로그인
            </Button>
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

/* 상단 메뉴 탭 줄. 남는 폭을 차지하고 로고와 간격을 둔다 */
const NavTabs = styled(HoverTabs)(({ theme }) => ({
  flexGrow: 1,
  marginLeft: theme.spacing(3),
}));
