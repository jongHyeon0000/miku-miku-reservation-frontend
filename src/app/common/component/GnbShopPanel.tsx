import { Fragment } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import type { ShopGroup } from '@/app/category/shop/interface/ShopGroup';
import { validateShopUrl } from '@/app/category/shop/utils/ShopUtils';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import { styled } from '@mui/material/styles';

interface GnbShopPanelProps {
  /** 하위가 있는 상위 판매처 목록 */
  groups: ShopGroup[];

  /** 패널이 열려 있는지 */
  open: boolean;

  /** 패널에 마우스가 들어왔을 때 (탭에서 건너온 마우스가 닫히지 않게 한다) */
  onMouseEnter: () => void;

  /** 패널에서 마우스가 나갔을 때 */
  onMouseLeave: () => void;
}

/**
 * 상단 메뉴 아래로 펼쳐지는 판매처 패널
 * 왼쪽에 상위 그룹 이름, 오른쪽에 그 그룹의 판매처(썸네일과 이름)를 모든 그룹 줄로 펼쳐 보여 주고, 판매처를 누르면 저장된 주소가 새 탭에서 열린다.
 * 주소가 없거나 http, https 가 아닌 판매처는 흐리게 보이고 눌러도 아무 일도 없다.
 */
const GnbShopPanel = ({ groups, open, onMouseEnter, onMouseLeave }: GnbShopPanelProps) => {
  if (!open) {
    return null;
  }

  return (
    <PanelRoot onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {groups.map((group) => (
        <Fragment key={group.id}>
          <GroupName>{group.name}</GroupName>
          <Shops>
            {group.children.map((shop) => {
              const linkable = shop.url !== undefined && validateShopUrl(shop.url) === undefined;
              return (
                <ShopLink key={shop.id} href={linkable ? shop.url : undefined} target="_blank" rel="noopener noreferrer">
                  <ThumbAvatar size="sm" variant="rounded" src={imageUrl(shop.thumbnailUrl)}>
                    <ImageOutlinedIcon fontSize="small" />
                  </ThumbAvatar>
                  {shop.name}
                  {linkable && <OpenInNewOutlinedIcon fontSize="inherit" />}
                </ShopLink>
              );
            })}
          </Shops>
        </Fragment>
      ))}
    </PanelRoot>
  );
};

export default GnbShopPanel;

/** ───────── styles ───────── */

/** 상단 메뉴 바로 아래에 전체 폭으로 붙는 패널. 위치는 상단 메뉴(sticky)가 기준이다. 왼쪽 칸은 가장 긴 그룹 이름에 맞춰진다 */
const PanelRoot = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  alignItems: 'center',
  columnGap: theme.spacing(2),
  rowGap: theme.spacing(1),
  padding: theme.spacing(1.5, 6, 2),
  backgroundColor: theme.palette.menuSurface,
  borderBottom: `1px solid ${theme.palette.menuLine}`,
  boxShadow: theme.shadows[8],
}));

const GroupName = styled('div')(({ theme }) => ({
  padding: theme.spacing(0.75, 1.5, 0.75, 0),
  color: theme.palette.primary.main,
  fontWeight: 700,
  whiteSpace: 'nowrap',
}));

const Shops = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5, 2),
}));

const ShopLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  padding: theme.spacing(0.5, 1),
  color: theme.palette.text.primary,
  textDecoration: 'none',
  borderRadius: theme.shape.borderRadius,
  '&[href]:hover': { backgroundColor: theme.palette.menuHover },
  /* 주소가 없으면 href 가 없어서 눌러도 이동하지 않는다 */
  '&:not([href])': { opacity: theme.palette.action.disabledOpacity, cursor: 'default' },
}));
