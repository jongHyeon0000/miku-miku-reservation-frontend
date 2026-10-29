import { Box, Typography } from '@mui/material';
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import { Panel, RowBox } from '@/app/common/style/CommonList.style';
import { LabelText } from '@/app/common/style/CommonText.style';
import BudgetAdjustRow from '@/app/budget/component/BudgetAdjustRow';
import type { BudgetAdjust } from '@/app/budget/interface/BudgetAdjust';

interface BudgetAdjustPanelProps {
  /** 이번 기간 증감 목록 (최근 순) */
  adjusts: BudgetAdjust[];
}

/**
 * 증감 내역 패널. 이번 기간의 증감 건수와 줄 목록을 보여 준다. 없으면 안내 문구가 한 줄 나온다.
 */
const BudgetAdjustPanel = ({ adjusts }: BudgetAdjustPanelProps) => {
  return (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <Typography variant="h6" component="h2">
            증감 내역
          </Typography>
          <LabelText>{adjusts.length}건</LabelText>
        </PanelHeader>
      </PanelTop>
      <Box>
        {adjusts.length === 0 && (
          <RowBox>
            <Typography color="text.secondary">증감 내역이 없어요.</Typography>
          </RowBox>
        )}
        {adjusts.map((adjust) => (
          <BudgetAdjustRow key={adjust.budgetAdjustId} adjust={adjust} />
        ))}
      </Box>
    </Panel>
  );
};

export default BudgetAdjustPanel;
