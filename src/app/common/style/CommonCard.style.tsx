import { Box, ButtonBase, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
* 화면을 구역으로 나누는 카드 (상세 화면의 썸네일, 정보, 일정, 설명 구역)
* */
const SectionCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.lineSubtle}`,
  borderRadius: theme.shape.cardRadius,
}));

/**
* 카드 안 구역 제목 (예: 설명)
* */
export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
})) as typeof Typography;

/**
* 안에 구역들을 세로로 쌓는 카드 (상품 정보, 설명 구역)
* */
export const ColumnCard = styled(SectionCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

/**
* 위는 내용, 아래는 끝에 붙는 내용을 양 끝에 두는 카드 (일정과 금액 구역)
* */
export const SpreadCard = styled(SectionCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));

/**
* 썸네일을 담는 카드 (폭이 좁아 안쪽 여백을 조금 줄인 구역)
* */
export const MediaCard = styled(SectionCard)(({ theme }) => ({
  padding: theme.spacing(2.5),
}));

/**
* 알약 모양 칸 (칩, 배지). 색과 안쪽 여백은 쓰는 쪽에서 정한다
* */
export const Pill = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: theme.shape.pillRadius,
}));

/**
* 사용 막대. 막대가 비율만큼 차고, 쓰는 쪽이 color 로 경고색(error)을 줄 수 있다 (예산 사용 비율)
* */
export const UsageBar = styled(LinearProgress)(({ theme }) => ({
  height: theme.spacing(1.25),
  borderRadius: theme.shape.pillRadius,
  backgroundColor: theme.palette.surfaceSunken,
  '& .MuiLinearProgress-bar': { borderRadius: theme.shape.pillRadius },
}));

/**
* 세로 덧셈의 합계 위에 긋는 가는 선 (예산의 총 예산 위). 줄 구분선과 같은 색이다
* */
export const TotalDivider = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
}));

/**
* 계산 내역을 묶는 어두운 상자 (카드 안에서 줄들을 세로로 쌓는다. 예산의 기본 예산, 증감, 총 예산, 지출, 남은 돈)
* */
export const ReceiptBox = styled(Box)(({ theme }) => ({
  lineHeight: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.surfaceSunken,
  borderRadius: theme.shape.borderRadius,
}));

/**
* 계산 줄 앞의 부호 칸 (+, −, =). 부호가 없는 줄도 같은 폭을 차지해서 글자의 세로선이 맞는다
* */
export const SignMark = styled('span')(({ theme }) => ({
  ...theme.typography.mono,
  display: 'inline-block',
  width: '1.25em',
  color: theme.palette.primary.main,
}));

/**
* 누르면 아래 내역이 열리는 줄 (줄 전체가 버튼이고 양 끝 정렬)
* */
export const ToggleRow = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  width: '100%',
  textAlign: 'left',
  font: 'inherit',
  color: 'inherit',
}));

/**
* 열린 내역을 담는 칸 (왼쪽으로 조금 들여쓰고, 줄들을 세로로 쌓는다)
* */
export const DetailList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginLeft: '0.625em',
  padding: theme.spacing(0.5, 0, 0.5, 1.5),
}));
