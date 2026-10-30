import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { DetailList, ReceiptBox, ToggleRow, TotalDivider } from '@/app/common/style/CommonCard.style';
import { DialogFieldStack } from '@/app/common/style/CommonForm.style';
import { Row, SpreadRow } from '@/app/common/style/CommonLayout.style';
import { BoldText, LabelText, ValueText } from '@/app/common/style/CommonText.style';
import { formatPrice } from '@/app/common/utils/CommonUtils';
import FigureListComponent from '@/app/figure/component/list/FigureListComponent';
import BudgetSpendingLine from '@/app/budget/component/BudgetSpendingLine';
import type { BudgetPaymentWarning } from '@/app/budget/interface/BudgetPaymentWarning';
import { formatSignedPrice } from '@/app/budget/utils/BudgetUtils';

interface BudgetPaymentWarningModalProps {
  /** 보여 줄 경고 내용 */
  warning: BudgetPaymentWarning;

  /** 닫을 때. 진행이면 true(그래도 진행), 취소나 바깥 클릭이면 false */
  onClose: (proceed: boolean) => void;
}

/**
 * 결제 초과 경고 모달. 상태를 구매완료나 예약완료로 바꾸면 예산을 넘을 때 뜬다. 막지 않는 경고라서 진행과 취소를 고른다.
 * 위에 결제하는 상품 카드(표시 전용), 아래에 영수증(현재 남은 돈, 이번 결제, 결제 후 남은 돈)을 둔다.
 * "이번 결제"를 누르면 상품별 결제 내역이 펼쳐진다.
 */
const BudgetPaymentWarningModal = ({ warning, onClose }: BudgetPaymentWarningModalProps) => {
  const [paymentsOpen, setPaymentsOpen] = useState<boolean>(false);
  const hasPayments = warning.payments.length > 0;

  const handleTogglePayments = () => {
    setPaymentsOpen((isOpen) => !isOpen);
  };

  return (
    <Dialog open onClose={() => onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        <Row>
          <WarningAmberIcon color="error" />
          <Typography variant="h6" component="span" color="error">
            이번 달 쓸수 있는 예산을 초과해요!!!
          </Typography>
        </Row>
        <BoldText color="text.secondary">{warning.subtitle}</BoldText>
      </DialogTitle>
      <DialogContent>
        <DialogFieldStack>
          <FigureListComponent figures={warning.figures} blinkUrgent={false} />

          <ReceiptBox>
            <SpreadRow>
              <LabelText>현재 남은 예산</LabelText>
              <ValueText>{formatPrice(warning.remaining)}</ValueText>
            </SpreadRow>

            {hasPayments && (
              <ToggleRow aria-expanded={paymentsOpen} onClick={handleTogglePayments}>
                <Row>
                  <LabelText>이번 결제</LabelText>
                  {paymentsOpen ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
                </Row>
                <ValueText negative>{formatSignedPrice(-warning.payAmount)}</ValueText>
              </ToggleRow>
            )}
            {!hasPayments && (
              <SpreadRow>
                <LabelText>이번 결제</LabelText>
                <ValueText negative>{formatSignedPrice(-warning.payAmount)}</ValueText>
              </SpreadRow>
            )}
            {hasPayments && paymentsOpen && (
              <DetailList>
                {warning.payments.map((payment) => (
                  <BudgetSpendingLine key={`${payment.figureId}-${payment.kind}`} spending={payment} />
                ))}
              </DetailList>
            )}

            <TotalDivider />
            <SpreadRow>
              <BoldText>결제 후 남는 예산</BoldText>
              <BoldText color="error">{formatPrice(warning.remainingAfter)}</BoldText>
            </SpreadRow>
          </ReceiptBox>
        </DialogFieldStack>
      </DialogContent>
      <DialogActions>
        <TonalButton onClick={() => onClose(false)}>취소</TonalButton>
        <TonalDangerButton onClick={() => onClose(true)}>그래도 살래..</TonalDangerButton>
      </DialogActions>
    </Dialog>
  );
};

export default BudgetPaymentWarningModal;
