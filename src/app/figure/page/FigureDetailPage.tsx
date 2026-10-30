import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { TonalButton, TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { PageContainer, PageHeader, PageTitle } from '@/app/common/style/CommonPage.style';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import FigureDetailDescription from '@/app/figure/component/detail/FigureDetailDescription';
import FigureDetailInfo from '@/app/figure/component/detail/FigureDetailInfo';
import FigureDetailSchedule from '@/app/figure/component/detail/FigureDetailSchedule';
import FigureDetailThumbnail from '@/app/figure/component/detail/FigureDetailThumbnail';
import BudgetPaymentWarningModal from '@/app/budget/component/BudgetPaymentWarningModal';
import type { BudgetPaymentWarning } from '@/app/budget/interface/BudgetPaymentWarning';
import FigureStatusModal from '@/app/figure/component/common/FigureStatusModal';
import type { FigureTransition } from '@/app/figure/constant/figureTransition';
import type { FigureStatusFormValues } from '@/app/figure/interface/status/FigureStatusFormValues';
import useCheckBudgetPayment from '@/app/figure/hook/useCheckBudgetPayment';
import useDeleteFigure from '@/app/figure/service/detail/useDeleteFigure';
import useReadFigure from '@/app/figure/service/common/useReadFigure';
import useReadFigureFormOptions from '@/app/figure/service/common/useReadFigureFormOptions';
import useUpdateFigureStatus from '@/app/figure/service/detail/useUpdateFigureStatus';
import { findTransitions, getSingleConfirm, getTransitionLabel, toStatusRequestBody } from '@/app/figure/utils/FigureTransitionUtils';
import { getTotalPrice } from '@/app/figure/utils/FigureUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';
import { Row, SideColumn, SplitLayout } from '@/app/common/style/CommonLayout.style';
import { styled } from '@mui/material/styles';

/** 결제 초과 경고를 띄운 동안 보관하는 값: 경고 내용과, [그래도 진행]을 누르면 이어서 할 상태 변경 */
interface PendingPayment {
  warning: BudgetPaymentWarning;
  transition: FigureTransition;
  values: FigureStatusFormValues;
}

/**
 * 상품 상세 화면 (/figures/:figureId)
 * 상품과 분류 선택지(분류 썸네일용)를 같이 받아 와서, 둘 다 성공해야 그린다.
 */
const FigureDetailPage = () => {
  const navigate = useNavigate();
  const figureId = Number(useParams().figureId);
  const showResult = useUiStore((state) => state.showResult);

  const { figure, figureLoading, fetchReadFigure } = useReadFigure(figureId);
  const { formOptions, formOptionsLoading, fetchReadFigureFormOptions } = useReadFigureFormOptions();
  const { deleteFigureLoading, fetchDeleteFigure } = useDeleteFigure();
  const { updateFigureStatusLoading, fetchUpdateFigureStatus } = useUpdateFigureStatus();
  const { fetchCheckBudgetPayment } = useCheckBudgetPayment();
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(null);

  const fetchAll = () => {
    fetchReadFigure();
    fetchReadFigureFormOptions();
  };

  const failed = [figure, formOptions].find((res) => res !== undefined && res.code !== API_CODE.OK);
  const loaded = figure?.code === API_CODE.OK && formOptions?.code === API_CODE.OK;

  const handleFigureDelete = async (name: string) => {
    const confirmed = await showConfirmAlert({
      title: `'${name}'을(를) 삭제할까요?`,
      text: '삭제하면 되돌릴 수 없어요.',
      confirmText: '삭제',
      danger: true,
      focusCancel: true,
    });

    if (!confirmed) {
      return;
    }

    const res = await fetchDeleteFigure(figureId);
    showResult(res);

    if (res.code === API_CODE.OK) {
      navigate('/figures');
    }
  };

  const handleFigureStatusSave = async (transition: FigureTransition, values: FigureStatusFormValues) => {
    const confirmed = await showConfirmAlert(getSingleConfirm(transition, values));

    if (!confirmed) {
      return;
    }

    /* 결제하면 예산을 넘는지 먼저 확인한다. 넘으면 경고 모달을 띄우고, 진행을 누르면 handlePaymentWarningClose 가 이어서 바꾼다 */
    const target = figure === undefined ? null : figure.data;

    if (target === null) {
      return;
    }

    const check = await fetchCheckBudgetPayment({ transition, figures: [target], date: values.date, depositAmount: Number(values.depositAmount) });

    if (!check.proceed) {
      return;
    }

    if (check.warning !== null) {
      setPendingPayment({ warning: check.warning, transition: transition, values: values });
      return;
    }

    await saveStatus(transition, values);
  };

  const handlePaymentWarningClose = async (proceed: boolean) => {
    const pending = pendingPayment;

    setPendingPayment(null);

    if (!proceed || pending === null) {
      return;
    }

    await saveStatus(pending.transition, pending.values);
  };

  const saveStatus = async (transition: FigureTransition, values: FigureStatusFormValues) => {
    const res = await fetchUpdateFigureStatus(figureId, toStatusRequestBody(transition, values));
    showResult(res);

    if (res.code !== API_CODE.OK) {
      return;
    }

    setStatusModalOpen(false);
  };

  /* 이 상태에서 갈 수 있는 전이. 없으면(배송완료) 상태 변경 버튼을 숨긴다 */
  const transitions = loaded ? findTransitions(figure.data!.status) : [];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle variant="h4" component="h1">
          상품 상세
        </PageTitle>
        <Row>
          <Button variant="outlined" color="inherit" onClick={() => navigate('/figures')}>
            목록
          </Button>
          {loaded && (
            <>
              {transitions.length > 0 && <TonalButton onClick={() => setStatusModalOpen(true)}>상태 변경</TonalButton>}
              <TonalButton onClick={() => navigate(`/figures/${figureId}/edit`)}>수정</TonalButton>
              <TonalDangerButton onClick={() => handleFigureDelete(figure.data!.name)}>삭제</TonalDangerButton>
            </>
          )}
        </Row>
      </PageHeader>

      {failed && <ErrorView message={failed.message} onRetry={fetchAll} />}
      {loaded && (
        <>
          <Layout>
            <FigureDetailInfo figure={figure.data!} options={formOptions.data!} />
            <SideColumn>
              <FigureDetailThumbnail figure={figure.data!} />
              <FigureDetailSchedule figure={figure.data!} />
            </SideColumn>
          </Layout>
          <FigureDetailDescription figure={figure.data!} />
        </>
      )}

      {statusModalOpen && (
        <FigureStatusModal
          title={transitions.length === 1 ? getTransitionLabel(transitions[0]) : '상태 변경'}
          transitions={transitions}
          totalPrice={getTotalPrice(figure!.data!)}
          loading={updateFigureStatusLoading}
          onSubmit={handleFigureStatusSave}
          onClose={() => setStatusModalOpen(false)}
        />
      )}

      {pendingPayment !== null && <BudgetPaymentWarningModal warning={pendingPayment.warning} onClose={handlePaymentWarningClose} />}

      <LoadingOverlay open={figureLoading || formOptionsLoading || deleteFigureLoading} />
    </PageContainer>
  );
};

export default FigureDetailPage;

/** ───────── styles ───────── */

const Layout = styled(SplitLayout)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
