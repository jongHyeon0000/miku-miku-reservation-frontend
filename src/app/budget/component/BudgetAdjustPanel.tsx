import { Fragment, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import { AddButton, AddRow, Panel, RowBox } from '@/app/common/style/CommonList.style';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import BudgetAdjustForm from '@/app/budget/component/BudgetAdjustForm';
import BudgetAdjustRow from '@/app/budget/component/BudgetAdjustRow';
import type { BudgetAdjust } from '@/app/budget/interface/BudgetAdjust';
import useDeleteBudgetAdjust from '@/app/budget/service/useDeleteBudgetAdjust';
import { formatSignedPrice } from '@/app/budget/utils/BudgetUtils';
import { useUiStore } from '@/store/uiStore';

/** 증감 삭제 확인창 글자 */
const DELETE_ALERT = {
  title: '이 증감을 삭제할까요?',
  text: (adjust: BudgetAdjust) => `${formatSignedPrice(adjust.amount)} 증감이 사라지고 남은 돈이 다시 계산돼요. 삭제하면 되돌릴 수 없어요.`,
  confirmText: '삭제',
};

interface BudgetAdjustPanelProps {
  /** 이번 기간 증감 목록 (최근 순) */
  adjusts: BudgetAdjust[];
}

/**
 * 증감 내역 패널. 이번 기간의 증감 줄 목록과 맨 아래 "+ 증감 추가" 칸을 보여 준다. 없으면 안내 문구가 한 줄 나온다.
 * 입력 줄은 한 번에 하나만 열린다: [수정]을 누르면 그 줄 바로 아래, "+ 증감 추가"를 누르면 맨 아래 칸 자리에 열린다.
 * [삭제]는 확인창을 거쳐 삭제 훅을 부른다.
 */
const BudgetAdjustPanel = ({ adjusts }: BudgetAdjustPanelProps) => {
  const showResult = useUiStore((state) => state.showResult);
  const { fetchDeleteBudgetAdjust } = useDeleteBudgetAdjust();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAdd = () => {
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (adjust: BudgetAdjust) => {
    setIsAdding(false);
    setEditingId(adjust.budgetAdjustId);
  };

  const handleClose = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = async (adjust: BudgetAdjust) => {
    const confirmed = await showConfirmAlert({
      title: DELETE_ALERT.title,
      text: DELETE_ALERT.text(adjust),
      confirmText: DELETE_ALERT.confirmText,
      danger: true,
      focusCancel: true,
    });

    if (!confirmed) {
      return;
    }

    const res = await fetchDeleteBudgetAdjust(adjust.budgetAdjustId);
    showResult(res);

    if (res.code === API_CODE.OK) {
      handleClose();
    }
  };

  return (
    <Panel>
      <PanelTop>
        <PanelHeader>
          <Typography variant="h6" component="h2">
            증감 내역
          </Typography>
        </PanelHeader>
      </PanelTop>
      <Box>
        {adjusts.length === 0 && (
          <RowBox>
            <Typography color="text.secondary">증감 내역이 없어요.</Typography>
          </RowBox>
        )}
        {adjusts.map((adjust) => (
          <Fragment key={adjust.budgetAdjustId}>
            <BudgetAdjustRow adjust={adjust} onEdit={handleEdit} onDelete={handleDelete} />
            {editingId === adjust.budgetAdjustId && <BudgetAdjustForm mode="edit" adjust={adjust} onClose={handleClose} />}
          </Fragment>
        ))}
      </Box>
      {isAdding && <BudgetAdjustForm mode="insert" adjust={null} onClose={handleClose} />}
      {!isAdding && (
        <AddRow>
          <AddButton variant="outlined" size="small" startIcon={<AddOutlinedIcon />} onClick={handleAdd}>
            증감 추가
          </AddButton>
        </AddRow>
      )}
    </Panel>
  );
};

export default BudgetAdjustPanel;
