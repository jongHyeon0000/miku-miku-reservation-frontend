import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

/** 사진(ThumbAvatar sm)의 한 변과 줄 사이 간격(theme.spacing 칸 수). 답글 선의 위치와 높이가 이 둘에서 정해진다 */
const AVATAR_SPACING = 4;
const THREAD_GAP_SPACING = 2;

/** 선 굵기(px) */
const LINE_WIDTH = 2;

/** 가지가 꺾이는 둥글기와 가지 길이(theme.spacing 칸 수) */
const BRANCH_RADIUS_SPACING = 1;
const BRANCH_WIDTH_SPACING = 2;

/** 사진 가운데에서 선 굵기의 절반을 뺀 값. 줄기와 가지의 왼쪽 선이 사진 가운데에 오게 한다 */
const lineOffset = (theme: Theme): string => {
  return `calc(${theme.spacing(AVATAR_SPACING / 2)} - ${LINE_WIDTH / 2}px)`;
};

/**
 * 댓글 묶음을 세로로 쌓는 칸 (댓글 한 묶음과 그 답글들, 묶음과 묶음 사이)
 */
export const CommentStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(THREAD_GAP_SPACING),
}));

/**
 * 댓글 한 줄 (왼쪽은 사진 칸, 오른쪽은 내용). 위쪽 맞춤이라 내용이 길어도 사진은 맨 위에 있다
 */
export const CommentRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  gap: theme.spacing(1),
}));

/**
 * 사진과 그 아래 줄기를 세로로 두는 칸. 줄기는 댓글 줄 높이만큼 늘어난다
 */
export const AvatarColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexShrink: 0,
});

/**
 * 부모 댓글의 사진 아래에서 시작하는 줄기
 */
export const Rail = styled('span')(({ theme }) => ({
  flex: 1,
  width: LINE_WIDTH,
  backgroundColor: theme.palette.divider,
}));

/**
 * 댓글 내용 칸 (이름 줄, 이미지, 글을 세로로 쌓는다)
 */
export const CommentBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  flex: 1,
  minWidth: 0,
}));

/**
 * 답글 목록. 줄기가 서 있는 자리(부모 사진 가운데)로 왼쪽을 맞춘다
 */
export const ReplyList = styled(CommentStack)(({ theme }) => ({
  marginLeft: lineOffset(theme),
}));

/**
 * 답글 한 줄 둘레. 왼쪽에 ㄴ 모양 가지를 그리고, 다음 답글이 있으면 줄기를 그 아래까지 잇는다
 */
export const ReplyItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(3),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: `-${theme.spacing(THREAD_GAP_SPACING)}`,
    width: theme.spacing(BRANCH_WIDTH_SPACING),
    height: theme.spacing(THREAD_GAP_SPACING + AVATAR_SPACING / 2),
    borderLeft: `${LINE_WIDTH}px solid ${theme.palette.divider}`,
    borderBottom: `${LINE_WIDTH}px solid ${theme.palette.divider}`,
    borderBottomLeftRadius: theme.spacing(BRANCH_RADIUS_SPACING),
  },
  '&:not(:last-child)::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: theme.spacing(BRANCH_RADIUS_SPACING),
    bottom: `-${theme.spacing(THREAD_GAP_SPACING)}`,
    borderLeft: `${LINE_WIDTH}px solid ${theme.palette.divider}`,
  },
}));

/**
 * 댓글 이미지 묶음 (틈 없이 붙고 바깥 모서리만 둥글다)
 */
export const CommentImages = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignSelf: 'flex-start',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  '& > img': {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

/**
 * 댓글 글자 (줄바꿈을 살리고 긴 글은 칸 안에서 줄을 바꾼다)
 */
export const CommentText = styled(Typography)({
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});

/**
 * 삭제, 탈퇴 자리 표시 글자
 */
export const HiddenText = styled(CommentText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
}));

/**
 * 답글 대상(@이름) 글자
 */
export const MentionText = styled('span')(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  color: theme.palette.secondary.main,
  fontWeight: 700,
}));
