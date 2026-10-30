import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button, TextField, ToggleButton } from '@mui/material';
import { motion } from 'motion/react';
import { ColumnCard } from '@/app/common/style/CommonCard.style';
import { DayOfMonthGrid, FormBody } from '@/app/common/style/CommonForm.style';
import { cardEnterVariants } from '@/app/common/style/CommonMotion.style';
import { Scene, SceneDesc, SceneEyebrow, SceneTitle } from '@/app/common/style/CommonScene.style';
import { StateStack } from '@/app/common/style/CommonState.style';
import { Highlight, LabelText } from '@/app/common/style/CommonText.style';
import { validateBudgetDefaultBudget } from '@/app/common/utils/ValidationUtils';
import useSceneActive from '@/app/common/hook/useSceneActive';
import { BUDGET_START_DAYS } from '@/app/budget/constant/budgetStartDay';
import type { BudgetSettingFormValues } from '@/app/budget/interface/BudgetSettingFormValues';
import useStartBudget from '@/app/budget/service/useStartBudget';
import { getBudgetPeriodLabel, toBudgetSettingRequestBody, toBudgetSettingFormValues } from '@/app/budget/utils/BudgetUtils';
import { useUiStore } from '@/store/uiStore';

interface BudgetIntroStartSceneProps {
  /** 서버가 준 마지막 시작일 설정 (처음이면 1) */
  startDay: number;

  /** 서버가 준 마지막 기본 예산 설정 (처음이면 0) */
  defaultBudget: number;
}

/**
 * 예산 소개의 마지막 장면(시작하기). 처음 쓰거나, 껐다가 기간이 바뀌어 기록이 없을 때 나온다.
 * 시작일과 기본 예산을 받아 예산을 켠다. 성공하면 현황이 다시 읽혀 화면이 바뀐다.
 */
const BudgetIntroStartScene = ({ startDay, defaultBudget }: BudgetIntroStartSceneProps) => {
  const { sceneRef, active } = useSceneActive();
  const showResult = useUiStore((state) => state.showResult);
  const { startBudgetLoading, fetchStartBudget } = useStartBudget();
  const animate = active ? 'visible' : 'hidden';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BudgetSettingFormValues>({
    mode: 'onTouched',
    defaultValues: toBudgetSettingFormValues(startDay, defaultBudget),
  });

  const selectedDay = useWatch({ control: control, name: 'startDay' });

  const handleValid = async (values: BudgetSettingFormValues) => {
    const res = await fetchStartBudget(toBudgetSettingRequestBody(values));
    showResult(res);
  };

  return (
    <Scene ref={sceneRef}>
      <StateStack>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={0}>
          <SceneEyebrow variant="mono" align="center">
            START
          </SceneEyebrow>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={1}>
          <SceneTitle variant="h3" component="h2" align="center">
            이번 달 남은 돈을 적어보세요!
          </SceneTitle>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={2}>
          <SceneDesc align="center">
            한 달에 취미에 쓸 돈을 정해 두면,
            <br />
            남은 돈과 얼마나 썼는지 알려 드려요.
          </SceneDesc>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={3}>
          <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
            <ColumnCard>
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
              <SceneDesc align="center">
                시작일부터 다음 달 시작일 전날까지가 한 기간이에요.
                <br />
                오늘은 {getBudgetPeriodLabel(selectedDay)} 기간이 돼요.
              </SceneDesc>
            </ColumnCard>
            <Button type="submit" variant="contained" size="large" disabled={startBudgetLoading}>
              시작!
            </Button>
          </FormBody>
        </motion.div>
      </StateStack>
    </Scene>
  );
};

export default BudgetIntroStartScene;
