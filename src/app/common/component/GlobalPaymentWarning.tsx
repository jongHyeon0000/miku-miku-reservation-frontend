import BudgetPaymentWarningModal from '@/app/budget/component/BudgetPaymentWarningModal';
import { useUiStore } from '@/store/uiStore';

/**
 * 루트에 하나만 둔다. uiStore 의 showPaymentWarning 으로 띄운 결제 초과 경고 모달을 그린다.
 */
const GlobalPaymentWarning = () => {
  const warning = useUiStore((state) => state.paymentWarning);
  const closePaymentWarning = useUiStore((state) => state.closePaymentWarning);

  if (warning === null) {
    return null;
  }

  return <BudgetPaymentWarningModal warning={warning} onClose={closePaymentWarning} />;
};

export default GlobalPaymentWarning;
