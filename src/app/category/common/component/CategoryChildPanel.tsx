import { Box, Tooltip, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Fragment, type ReactNode } from 'react';
import { PROTECTED_CATEGORY_NAME } from '@/app/category/common/constant/categoryAxes';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import PageNumbers from '@/app/common/component/PageNumbers';
import SelectBar from '@/app/common/component/SelectBar';
import useSelection from '@/app/common/hook/useSelection';
import { BulkDeleteButton, PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import { AddButton, AddRow, PagerRow, Panel } from '@/app/common/style/CommonList.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import { InfoIcon, TooltipText } from '@/app/common/style/CommonTooltip.style';
import { showConfirmAlert } from '@/app/common/utils/AlertUtils';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

/** 일괄 삭제 확인창 글자 */
const BULK_DELETE_ALERT = {
  title: (count: number) => `${count}개를 삭제할까요?`,
  text: "선택한 분류를 쓰는 상품은 '기타'로 옮겨져요. 삭제하면 되돌릴 수 없어요.",
  confirmText: '삭제',
};

/** 패널이 그릴 수 있는 분류의 최소 모양. 5개 축의 항목이 모두 이 필드를 가진다 */
interface CategoryPanelItem {
  id: number;
  name: string;
}

/** 하위 한 줄에 넘기는 선택 모드 값 (줄 앞 체크칸을 그릴 때 쓴다) */
export interface CategoryRowSelect {
  /** 선택 모드 여부 */
  selectMode: boolean;

  /** 이 줄이 체크돼 있는지 */
  checked: boolean;

  /** 체크칸을 눌렀을 때 */
  onToggle: () => void;
}

interface CategoryChildPanelProps<Item extends CategoryPanelItem> {
  /** 머리의 제목 (고른 상위 이름, 제조사는 "제조사 목록") */
  title: string;

  /** 제목 옆 (i) 툴팁에 보여 줄 설명 */
  description?: string;

  /** 머리 오른쪽 칸. 선택 모드 여부를 받아 그린다. 없으면 비어 있다 */
  renderHeaderActions?: (selectMode: boolean) => ReactNode;

  /** 아래 점선 칸(추가, 일괄 삭제)을 숨길지. 서버가 막아 둔 '기타' 상위일 때 켠다 */
  locked?: boolean;

  /** 이번 페이지 하위 항목 */
  childItems: Item[];

  /** 지금 보는 하위 목록 페이지 (1부터) */
  page: number;

  /** 하위 목록의 전체 페이지 수 */
  totalPages: number;

  /** 하위 한 줄을 그리는 함수. 줄 모양은 축마다 다르므로 축이 정한다 */
  renderRow: (item: Item, select: CategoryRowSelect) => ReactNode;

  /** 추가 버튼 이름 ("하위 추가", "제조사 추가") */
  addLabel: string;

  /** 추가 버튼을 눌렀을 때 */
  onAdd: () => void;

  /** 일괄 삭제 요청 중인지 (축의 useDeleteXxxList 값) */
  deleteListLoading: boolean;

  /** 고른 하위를 한 번에 지우는 요청 (축의 useDeleteXxxList 값) */
  fetchDeleteList: (ids: number[]) => Promise<ApiResponse<null>>;

  /** 페이지 번호를 눌렀을 때 */
  onChangePage: (page: number) => void;
}

/**
 * 분류 화면의 목록 단(판매처, 형태, 시리즈, 장르·캐릭터의 오른쪽 단, 제조사 목록). 머리, 하위 목록, 쪽 번호, 추가와 일괄 삭제를 맡는다.
 * 하위 한 줄의 모양과 머리 오른쪽 칸은 축이 정하고(renderRow, renderHeaderActions), 일괄 삭제의 선택 상태와 확인창은 이 컴포넌트가 들고 있다.
 * 상위나 쪽이 바뀌면 부모가 key 를 바꿔 새로 그리므로 선택 모드는 끝난다.
 */
const CategoryChildPanel = <Item extends CategoryPanelItem>({
  title,
  description,
  renderHeaderActions,
  locked = false,
  childItems,
  page,
  totalPages,
  renderRow,
  addLabel,
  onAdd,
  deleteListLoading,
  fetchDeleteList,
  onChangePage,
}: CategoryChildPanelProps<Item>) => {
  const showResult = useUiStore((state) => state.showResult);

  /* 일괄 삭제로 고를 수 있는 하위. 서버가 막아 둔 '기타'는 뺀다 */
  const selectableIds = childItems.filter((item) => item.name !== PROTECTED_CATEGORY_NAME).map((item) => item.id);
  const selection = useSelection<'DELETE'>(selectableIds);
  const selectMode = selection.mode !== null;

  /* 체크한 하위를 확인창을 거쳐 한 번에 지운다 */
  const handleBulkDelete = async () => {
    const checkedCount = selection.checkedIds.length;
    const confirmed = await showConfirmAlert({
      title: BULK_DELETE_ALERT.title(checkedCount),
      text: BULK_DELETE_ALERT.text,
      confirmText: BULK_DELETE_ALERT.confirmText,
      danger: true,
      focusCancel: true,
    });

    if (!confirmed) {
      return;
    }

    const res = await fetchDeleteList(selection.checkedIds);
    showResult(res);

    if (res.code !== API_CODE.OK) {
      return;
    }

    selection.exitMode();

    /* 이번 쪽 하위를 모두 지웠으면 그 쪽이 비므로 앞 쪽으로 돌아간다 */
    if (checkedCount === childItems.length && page > 1) {
      onChangePage(page - 1);
    }
  };

  return (
    <>
      <Panel>
        <PanelTop>
          <PanelHeader>
            <Typography variant="h6">
              {title}
              {description && (
                <Tooltip title={<TooltipText>{description}</TooltipText>} placement="right-start">
                  <InfoIcon fontSize="inherit" />
                </Tooltip>
              )}
            </Typography>
            {renderHeaderActions && renderHeaderActions(selectMode)}
          </PanelHeader>
        </PanelTop>
        <Box>
          {childItems.map((child) => (
            <Fragment key={child.id}>
              {renderRow(child, {
                selectMode: selectMode,
                checked: selection.checkedIds.includes(child.id),
                onToggle: () => selection.toggleId(child.id),
              })}
            </Fragment>
          ))}
        </Box>
        {totalPages > 1 && (
          <PagerRow>
            <PageNumbers page={page} totalPages={totalPages} onChange={onChangePage} />
          </PagerRow>
        )}
        {!locked && !selectMode && (
          <AddRow>
            <Row>
              <AddButton variant="outlined" size="small" startIcon={<AddOutlinedIcon />} onClick={onAdd}>
                {addLabel}
              </AddButton>
              <BulkDeleteButton
                variant="outlined"
                size="small"
                color="error"
                disabled={selectableIds.length === 0}
                onClick={() => selection.enterMode('DELETE')}
              >
                일괄 삭제
              </BulkDeleteButton>
            </Row>
          </AddRow>
        )}
        {!locked && selectMode && (
          <AddRow>
            <SelectBar
              danger
              checkedCount={selection.checkedIds.length}
              shownCount={selectableIds.length}
              actionLabel="삭제"
              onToggleAll={selection.toggleAllIds}
              onAction={handleBulkDelete}
              onCancel={selection.exitMode}
            />
          </AddRow>
        )}
      </Panel>

      <LoadingOverlay open={deleteListLoading} />
    </>
  );
};

export default CategoryChildPanel;
