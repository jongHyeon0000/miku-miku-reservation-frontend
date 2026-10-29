import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField, ToggleButton, Typography } from '@mui/material';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { SectionTitle } from '@/app/common/style/CommonCard.style';
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import { DayOfMonthGrid, FormBody } from '@/app/common/style/CommonForm.style';
import { EndRow, GroupStack, Row, SpreadRow } from '@/app/common/style/CommonLayout.style';
import { Panel, PanelBody } from '@/app/common/style/CommonList.style';
import { LabelText, ValueText } from '@/app/common/style/CommonText.style';
import { formatPrice } from '@/app/common/utils/CommonUtils';
import { validateBudgetDefaultBudget } from '@/app/common/utils/ValidationUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { BUDGET_START_DAYS } from '@/app/budget/constant/budgetStartDay';
import type { BudgetSettingFormValues } from '@/app/budget/interface/BudgetSettingFormValues';
import useUpdateBudgetSetting from '@/app/budget/service/useUpdateBudgetSetting';
import { toBudgetSettingFormValues, toBudgetSettingRequestBody } from '@/app/budget/utils/BudgetUtils';
import { useUiStore } from '@/store/uiStore';

interface BudgetSettingCardProps {
  /** 기간 시작일 설정 (1~28) */
  startDay: number;

  /** 기본 예산 설정(원) */
  defaultBudget: number;
}

/**
 * 예산 설정 카드. 지금 설정(시작일, 기본 예산)을 값으로 보여 주고, [수정]을 누르면 값 자리가 입력으로 바뀐다.
 */
const BudgetSettingCard = ({ startDay, defaultBudget }: BudgetSettingCardProps) => {
  const [editing, setEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleClose = () => {
    setEditing(false);
  };

  return (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <SectionTitle variant="h6" component="h2">
            예산 설정
          </SectionTitle>
          {!editing && (
            <TonalButton size="small" onClick={handleEdit}>
              수정
            </TonalButton>
          )}
        </PanelHeader>
      </PanelTop>
      <PanelBody>
        {editing && <BudgetSettingForm startDay={startDay} defaultBudget={defaultBudget} onClose={handleClose} />}
        {!editing && (
          <GroupStack>
            <SpreadRow>
              <LabelText>기간 시작일</LabelText>
              <ValueText>매월 {startDay}일</ValueText>
            </SpreadRow>
            <SpreadRow>
              <LabelText>기본 예산</LabelText>
              <ValueText>{formatPrice(defaultBudget)}</ValueText>
            </SpreadRow>
          </GroupStack>
        )}
        <LabelText>
          <Typography variant="caption">바꾼 값은 다음 기간부터 적용돼요. 이번 기간은 그대로예요.</Typography>
        </LabelText>
      </PanelBody>
    </Panel>
  );
};

interface BudgetSettingFormProps {
  /** 기간 시작일 설정 (1~28) */
  startDay: number;

  /** 기본 예산 설정(원) */
  defaultBudget: number;

  /** 취소하거나 저장이 끝났을 때 입력을 닫는다 */
  onClose: () => void;
}

/**
 * 예산 설정 입력. 시작하기 화면과 같이 날짜 격자와 기본 예산 칸을 쓰고, 저장하면 설정 변경 훅을 부른다.
 */
const BudgetSettingForm = ({ startDay, defaultBudget, onClose }: BudgetSettingFormProps) => {
  const showResult = useUiStore((state) => state.showResult);
  const { updateBudgetSettingLoading, fetchUpdateBudgetSetting } = useUpdateBudgetSetting();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BudgetSettingFormValues>({
    mode: 'onTouched',
    defaultValues: toBudgetSettingFormValues(startDay, defaultBudget),
  });

  const handleValid = async (values: BudgetSettingFormValues) => {
    const res = await fetchUpdateBudgetSetting(toBudgetSettingRequestBody(values));
    showResult(res);

    if (res.code === API_CODE.OK) {
      onClose();
    }
  };

  return (
    <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
      <LabelText>기간 시작일 (매월)</LabelText>
      <Controller
        name="startDay"
        control={control}
        render={({ field }) => (
          <DayOfMonthGrid>
            {BUDGET_START_DAYS.map((day) => (
              <ToggleButton key={day} value={day} color="primary" selected={field.value === day} onChange={() => field.onChange(day)}>
                {day}
              </ToggleButton>
            ))}
          </DayOfMonthGrid>
        )}
      />
      <TextField
        label="기본 예산 (원)"
        error={!!errors.defaultBudget}
        helperText={errors.defaultBudget?.message}
        inputRef={register('defaultBudget', { validate: validateBudgetDefaultBudget }).ref}
        {...register('defaultBudget', { validate: validateBudgetDefaultBudget })}
      />
      <EndRow>
        <Row>
          <TonalButton onClick={onClose}>취소</TonalButton>
          <Button type="submit" variant="contained" disabled={updateBudgetSettingLoading}>
            저장
          </Button>
        </Row>
      </EndRow>
    </FormBody>
  );
};

export default BudgetSettingCard;
