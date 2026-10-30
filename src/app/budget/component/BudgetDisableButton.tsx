import { TonalDangerButton } from '@/app/common/style/CommonButton.style';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import useUpdateBudgetEnabled from '@/app/budget/service/useUpdateBudgetEnabled';
import { useUiStore } from '@/store/uiStore';

/** 예산관리 기능 끄기 확인창 글자 */
const DISABLE_ALERT = {
  title: '예산관리 기능을 끌까요?',
  html:
      '· 예산 현황 화면을 볼 수 없어요.<br>' +
      '· 기능이 꺼져 있는 동안은 관련 설정을 바꿀 수 없어요.<br>' +
      '· 이번 기간의 예산관리 기록은 지워지지 않고 남아요.<br>' +
      '· 기간이 지나면 예산관리 시작일과 기본 예산을 다시 정해요.<br>' +
      '· <b>지정한 기간이 끝나기 전에 다시 켜면 복구돼요.</b>',
  confirmText: '끄기',
};

/**
 * 예산관리 기능 끄기 버튼. 확인창을 거쳐 끄기 훅을 부른다.
 * 성공하면 현황이 다시 읽혀 꺼짐 화면(시작하기 또는 다시 켜기)으로 바뀐다.
 */
const BudgetDisableButton = () => {
  const showResult = useUiStore((state) => state.showResult);
  const { updateBudgetEnabledLoading, fetchUpdateBudgetEnabled } = useUpdateBudgetEnabled();

  const handleDisable = async () => {
    const confirmed = await showConfirmAlert({
      title: DISABLE_ALERT.title,
      html: DISABLE_ALERT.html,
      confirmText: DISABLE_ALERT.confirmText,
      danger: true,
      focusCancel: true,
    });

    if (!confirmed) {
      return;
    }

    const res = await fetchUpdateBudgetEnabled(false);
    showResult(res);
  };

  return (
    <TonalDangerButton disabled={updateBudgetEnabledLoading} onClick={handleDisable}>
      예산관리 기능끄기
    </TonalDangerButton>
  );
};

export default BudgetDisableButton;
