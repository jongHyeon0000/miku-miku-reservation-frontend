import { Box } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';

/** 단계 하나의 모양: 완료, 지금, 대기 */
type StepState = 'done' | 'on' | 'todo';

/** 앞 단계는 완료, 지금 단계는 지금, 뒤 단계는 대기 */
const getStepState = (index: number, current: number): StepState => {
  if (index < current) {
    return 'done';
  }

  if (index === current) {
    return 'on';
  }

  return 'todo';
};

interface StepBarProps {
  /** 단계 이름 목록 (예: "① 이메일", "② 코드 확인", "③ 결과") */
  steps: string[];

  /** 지금 단계의 번호(0부터). 앞 단계는 완료, 뒤 단계는 대기로 보인다 */
  current: number;
}

/**
 * 단계 표시줄. 단계마다 위쪽 선과 이름이 있고, 완료는 초록, 지금은 포인트 색, 대기는 흐린 색이다.
 */
const StepBar = ({ steps, current }: StepBarProps) => {
  return (
    <Bar>
      {steps.map((label, index) => (
        <Step key={label} state={getStepState(index, current)}>
          {label}
        </Step>
      ))}
    </Bar>
  );
};

export default StepBar;

/** ───────── styles ───────── */

const Bar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

/** 완료는 초록, 지금은 포인트 색, 대기는 흐린 색 */
const getStepColor = (theme: Theme, state: StepState): string => {
  if (state === 'done') {
    return theme.palette.success.main;
  }

  if (state === 'on') {
    return theme.palette.primary.main;
  }

  return theme.palette.text.secondary;
};

const Step = styled('span', { shouldForwardProp: (prop) => prop !== 'state' })<{ state: StepState }>(
  ({ theme, state }) => {
    const color = getStepColor(theme, state);

    return {
      flex: 1,
      paddingTop: theme.spacing(0.75),
      borderTop: `0.1875rem solid ${state === 'todo' ? theme.palette.divider : color}`,
      fontSize: theme.typography.caption.fontSize,
      color,
    };
  },
);
