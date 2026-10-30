import type { Dayjs } from 'dayjs';
import { todayString } from '@/app/common/utils/CommonUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { FigureTransition } from '@/app/figure/constant/figureTransition';
import type { FigureSummary } from '@/app/figure/interface/common/FigureSummary';
import { isPaymentTransition, toBudgetPaymentWarning, toPaymentCheckRequestBody } from '@/app/figure/utils/FigureTransitionUtils';
import type { BudgetPaymentWarning } from '@/app/budget/interface/BudgetPaymentWarning';
import useReadBudgetPaymentCheck from '@/app/budget/service/useReadBudgetPaymentCheck';
import { useUiStore } from '@/store/uiStore';

/** 결제 확인 요청이 이 코드로 실패하면(연결 안 됨, 서버 오류) 막지 않는 경고라서 경고 없이 진행한다 */
const SKIP_CHECK_CODES: string[] = [API_CODE.NETWORK_ERROR, API_CODE.INTERNAL_ERROR];

/** 결제 확인에 필요한 값 */
interface BudgetPaymentRequest {
  /** 바꾸려는 전이 */
  transition: FigureTransition;

  /** 바꿀 상품 */
  figures: FigureSummary[];

  /** 결제일 (예약금 결제일, 전액 결제일, 잔금 결제일 중 그 전이의 하나) */
  date: Dayjs | null;

  /** 예약금(원). 예약완료로 바꿀 때만 쓴다 */
  depositAmount: number;
}

/** 결제 확인 결과. proceed 가 false 면 중단(알림은 이미 띄웠다), warning 이 있으면 경고 모달을 띄운 뒤 진행 여부를 묻고, 둘 다 아니면 바로 진행한다 */
interface BudgetPaymentCheckResult {
  proceed: boolean;
  warning: BudgetPaymentWarning | null;
}

/**
 * 결제로 넘기기 전 예산 확인 훅. 상태를 바꾸는 핸들러가 변경 요청 직전에 부른다.
 * 모달은 부른 화면이 직접 띄운다. 돈을 내지 않는 전이, 예산이 꺼진 경우, 연결과 서버 오류는 경고 없이 진행이고,
 * 요청 오류(400, 404)는 알림을 띄우고 중단이다.
 */
const useCheckBudgetPayment = () => {
  const showResult = useUiStore((state) => state.showResult);
  const { fetchReadBudgetPaymentCheck } = useReadBudgetPaymentCheck();

  const fetchCheckBudgetPayment = async ({ transition, figures, date, depositAmount }: BudgetPaymentRequest): Promise<BudgetPaymentCheckResult> => {
    if (!isPaymentTransition(transition)) {
      return { proceed: true, warning: null };
    }

    const paidAt = date === null ? todayString() : date.format('YYYY-MM-DD');
    const figureIds = figures.map((figure) => figure.figureId);
    const res = await fetchReadBudgetPaymentCheck(toPaymentCheckRequestBody(transition, figureIds, paidAt, depositAmount));

    if (SKIP_CHECK_CODES.includes(res.code)) {
      return { proceed: true, warning: null };
    }

    if (res.code !== API_CODE.OK) {
      showResult(res);
      return { proceed: false, warning: null };
    }

    const check = res.data;

    if (check === null || !check.exceeded) {
      return { proceed: true, warning: null };
    }

    const { payAmount, remaining, remainingAfter } = check;

    if (payAmount === null || remaining === null || remainingAfter === null) {
      return { proceed: true, warning: null };
    }

    const warning = toBudgetPaymentWarning(transition, figures, paidAt, depositAmount, payAmount, remaining, remainingAfter);
    return { proceed: true, warning: warning };
  };

  return { fetchCheckBudgetPayment };
};

export default useCheckBudgetPayment;
