import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { EndRow, Row } from '@/app/common/style/CommonLayout.style';
import { AddRow } from '@/app/common/style/CommonList.style';
import { validateBudgetAdjustAmount, validateBudgetAdjustMemo } from '@/app/common/utils/ValidationUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { BudgetAdjust } from '@/app/budget/interface/BudgetAdjust';
import type { BudgetAdjustRequestBody } from '@/app/budget/interface/BudgetAdjustRequestBody';
import type { BudgetAdjustFormValues } from '@/app/budget/interface/BudgetAdjustFormValues';
import useCreateBudgetAdjust from '@/app/budget/service/useCreateBudgetAdjust';
import useUpdateBudgetAdjust from '@/app/budget/service/useUpdateBudgetAdjust';
import { toBudgetAdjustFormValues, toBudgetAdjustRequestBody } from '@/app/budget/utils/BudgetUtils';
import { useUiStore } from '@/store/uiStore';

interface BudgetAdjustFormProps {
  /** insert 는 새 증감 추가, edit 는 누른 줄 수정 */
  mode: 'insert' | 'edit';

  /** 수정할 줄 (추가면 null) */
  adjust: BudgetAdjust | null;

  /** 취소하거나 저장이 끝났을 때 입력 줄을 닫는다 */
  onClose: () => void;
}

/**
 * 증감 입력 줄. 금액과 메모 두 칸과 [취소], [저장] 버튼이 한 줄 칸에 들어 있고, 추가와 수정이 같이 쓴다.
 * 증감 줄들 사이에 끼어도 줄무늬가 뒤바뀌지 않게 form 요소로 그린다(줄은 div 만 센다).
 */
const BudgetAdjustForm = ({ mode, adjust, onClose }: BudgetAdjustFormProps) => {
  const showResult = useUiStore((state) => state.showResult);
  const { createBudgetAdjustLoading, fetchCreateBudgetAdjust } = useCreateBudgetAdjust();
  const { updateBudgetAdjustLoading, fetchUpdateBudgetAdjust } = useUpdateBudgetAdjust();
  const saving = createBudgetAdjustLoading || updateBudgetAdjustLoading;
  const submitLabel = mode === 'insert' ? '추가' : '저장';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetAdjustFormValues>({
    mode: 'onTouched',
    defaultValues: toBudgetAdjustFormValues(adjust),
  });

  const saveAdjust = async (body: BudgetAdjustRequestBody) => {
    if (mode === 'edit' && adjust !== null) {
      return fetchUpdateBudgetAdjust(adjust.budgetAdjustId, body);
    }

    return fetchCreateBudgetAdjust(body);
  };

  const handleValid = async (values: BudgetAdjustFormValues) => {
    const body = toBudgetAdjustRequestBody(values);
    const res = await saveAdjust(body);
    showResult(res);

    if (res.code === API_CODE.OK) {
      onClose();
    }
  };

  return (
    <AddRow component="form" noValidate onSubmit={handleSubmit(handleValid)}>
      <FieldStack>
        <Row>
          <TextField
            fullWidth
            autoFocus
            label="금액 (빼려면 앞에 - 를 붙여요)"
            error={!!errors.amount}
            helperText={errors.amount?.message}
            inputRef={register('amount', { validate: validateBudgetAdjustAmount }).ref}
            {...register('amount', { validate: validateBudgetAdjustAmount })}
          />
          <TextField
            fullWidth
            label="메모 (선택)"
            error={!!errors.memo}
            helperText={errors.memo?.message}
            inputRef={register('memo', { validate: validateBudgetAdjustMemo }).ref}
            {...register('memo', { validate: validateBudgetAdjustMemo })}
          />
        </Row>
        <EndRow>
          <Row>
            <TonalButton onClick={onClose}>취소</TonalButton>
            <Button type="submit" variant="contained" disabled={saving}>
              {submitLabel}
            </Button>
          </Row>
        </EndRow>
      </FieldStack>
    </AddRow>
  );
};

export default BudgetAdjustForm;
