import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

/*
* 소개 화면처럼 한 화면(장면)씩 넘기며 보는 화면의 틀
* */

/*
* 장면들이 세로로 쌓이는 스크롤 영역. 높이는 상단 메뉴 아래에 남는 높이(viewHeight)이고 쓰는 쪽이 재서 넘긴다.
* 마우스, 트랙패드는 훅이 장면 단위로 움직이고, 터치 화면은 브라우저 스냅에 맡긴다. 스크롤바는 숨긴다
* */
export const SceneScroller = styled(Box, { shouldForwardProp: (prop) => prop !== 'viewHeight' })<{ viewHeight: number }>(
  ({ viewHeight }) => ({
    height: viewHeight,
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
    '@media (pointer: coarse)': { scrollSnapType: 'y mandatory' },
  }),
);

/*
* 한 화면을 가득 채우는 장면 (내용은 세로 가운데, 오른쪽은 진행 점 자리를 비운다)
* */
export const Scene = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
  scrollSnapAlign: 'start',
  display: 'flex',
  alignItems: 'safe center',
  justifyContent: 'center',
  padding: theme.spacing(3, 8, 3, 3),
}));

/*
* 장면 안쪽 배치. 기본은 왼쪽 설명, 오른쪽 데모 두 열(좁은 화면에서는 한 열)이고,
* wide 이면 설명 아래에 데모를 놓는 한 열이다 (폭이 넓은 데모용)
* */
export const SceneInner = styled(Box, { shouldForwardProp: (prop) => prop !== 'wide' })<{ wide?: boolean }>(({ theme, wide }) => ({
  display: 'grid',
  width: '100%',
  maxWidth: '70rem',
  alignItems: 'center',
  gap: theme.spacing(wide ? 3 : 5),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: wide ? '1fr' : '1fr 1.25fr',
  },
}));

/*
* 장면의 설명 영역 (작은 제목, 큰 제목, 설명 글을 세로로 쌓는다)
* */
export const SceneText = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

/*
* 큰 제목 위의 작은 번호, 이름 글자 (포인트 색, 고정폭)
* */
export const SceneEyebrow = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  letterSpacing: '0.14em',
})) as typeof Typography;

/*
* 장면의 큰 제목 (화면 폭에 맞춰 커지고 줄어든다)
* */
export const SceneTitle = styled(Typography)({
  fontSize: 'clamp(1.75rem, 3.6vw, 2.875rem)',
  lineHeight: 1.2,
}) as typeof Typography;

/*
* 장면의 설명 글 (보조색, 한 줄이 너무 길어지지 않게 폭을 제한한다)
* */
export const SceneDesc = styled(Typography)(({ theme }) => ({
  maxWidth: '30rem',
  color: theme.palette.text.secondary,
}));

/*
* 실제 컴포넌트로 보여 주는 데모 영역. 눌러 볼 수 없게 하고(대본이 움직인다) 글자가 선택되지 않게 한다.
* contain 으로 기준 상자를 만들어, 안에 놓인 대화상자(embedded)가 화면 전체가 아니라 이 영역 안에만 그려지게 한다
* */
export const SceneDemo = styled(Box)({
  pointerEvents: 'none',
  userSelect: 'none',
  contain: 'layout paint',
});

/*
* 오른쪽 가장자리의 장면 진행 점 묶음 (화면에 고정)
* */
export const SceneDots = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  right: theme.spacing(2.5),
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  zIndex: 1,
}));

/*
* 진행 점 하나. 지금 보고 있는 장면의 점은 포인트 색으로 차오른다
* */
export const SceneDot = styled('button', { shouldForwardProp: (prop) => prop !== 'active' })<{ active: boolean }>(
  ({ theme, active }) => ({
    width: theme.spacing(1.25),
    height: theme.spacing(1.25),
    padding: 0,
    cursor: 'pointer',
    borderRadius: theme.shape.pillRadius,
    border: `1.5px solid ${active ? theme.palette.primary.main : theme.palette.text.secondary}`,
    backgroundColor: active ? theme.palette.primary.main : 'transparent',
    transform: active ? 'scale(1.35)' : 'none',
    transition: 'transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease',
  }),
);
