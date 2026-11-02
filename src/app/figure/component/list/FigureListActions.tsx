import { Button } from '@mui/material';
import SelectBar from '@/app/common/component/SelectBar';
import type { SelectMode } from '@/app/figure/constant/figureSelect';
import { Row } from '@/app/common/style/CommonLayout.style';

interface FigureListActionsProps {
  /** 켜진 선택 모드. 평소는 null */
  mode: SelectMode | null;

  /** 상품이 하나라도 있는지 (없으면 상품 삭제를 막는다) */
  hasFigures: boolean;

  /** 이 탭에서 상태 변경을 쓸 수 있는지 (전체, 배송완료 탭은 쓸 수 없어 버튼을 숨긴다) */
  canChangeStatus: boolean;

  /** 선택 도구줄에 보여 줄 값들 */
  checkedCount: number;
  shownCount: number;
  actionLabel: string;

  /** 모드 버튼을 눌렀을 때 (켜져 있던 모드는 꺼지고 그 모드로 넘어간다) */
  onEnterMode: (mode: SelectMode) => void;

  /** 나가기 */
  onExitMode: () => void;

  /** 도구줄의 동작 버튼 */
  onAction: () => void;

}

/**
 * 상품 목록의 목록 작업 버튼들(표시 전용, 필터 줄 오른쪽 맨 앞에 놓인다). 평소는 [상품 삭제] [상태 변경]이고,
 * 선택 모드 중에는 [나가기] [동작] 둘만 남는다(전체 선택은 목록 위 체크칸 줄이 맡는다).
 */
const FigureListActions = ({
  mode,
  hasFigures,
  canChangeStatus,
  checkedCount,
  shownCount,
  actionLabel,
  onEnterMode,
  onExitMode,
  onAction,
}: FigureListActionsProps) => {
  if (mode !== null) {
    return (
      <SelectBar
        danger={mode === 'MANAGE'}
        checkedCount={checkedCount}
        shownCount={shownCount}
        actionLabel={actionLabel}
        onAction={onAction}
        onCancel={onExitMode}
      />
    );
  }

  return (
    <Row>
      <Button variant="outlined" color="inherit" disabled={!hasFigures} onClick={() => onEnterMode('MANAGE')}>
        상품 삭제
      </Button>
      {canChangeStatus && (
        <Button variant="outlined" color="inherit" disabled={!hasFigures} onClick={() => onEnterMode('STATUS')}>
          상태 변경
        </Button>
      )}
    </Row>
  );
};

export default FigureListActions;
