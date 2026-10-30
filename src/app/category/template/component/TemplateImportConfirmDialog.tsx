import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import CategoryRow from '@/app/category/common/component/CategoryRow';
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import type { Template } from '@/app/category/template/interface/Template';
import type { TemplateImportGroup, TemplateImportItem, TemplateImportPreview } from '@/app/category/template/interface/TemplateImportPreview';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { SelectableCard } from '@/app/common/style/CommonCard.style';
import { DialogFieldStack, FormActions } from '@/app/common/style/CommonForm.style';
import { TripleGrid } from '@/app/common/style/CommonLayout.style';
import { Panel } from '@/app/common/style/CommonList.style';
import { LabelText } from '@/app/common/style/CommonText.style';

/** 확인 창이 보여 주는 목록 (전체는 한 그룹 안에서 추가 항목 뒤에 제외 항목이 이어진다) */
type ImportView = 'all' | 'added' | 'skipped';

/** 보여 줄 항목 한 건 */
interface ImportRow {
  /** 템플릿에 있는 항목 값 */
  item: TemplateImportItem;

  /** true 면 줄에 취소선을 긋는다 (전체 보기에서 이미 있어서 제외되는 항목) */
  struck: boolean;
}

/** 상위 그룹 하나와 그 안에 보여 줄 항목들 (추가 항목과 제외 항목이 한 묶음에 섞인다) */
interface ImportRowGroup {
  /** 상위 그룹 이름. 제조사 템플릿은 없다 */
  groupName?: string;

  /** 그룹 안의 항목 */
  rows: ImportRow[];
}

/** 보기에 맞춰 추가 항목과 제외 항목을 상위 그룹 이름별로 한 묶음에 합친다 */
const toRowGroups = (preview: TemplateImportPreview, view: ImportView): ImportRowGroup[] => {
  const rowGroups: ImportRowGroup[] = [];

  const appendGroups = (sources: TemplateImportGroup[], struck: boolean) => {
    for (const source of sources) {
      const found = rowGroups.find((rowGroup) => rowGroup.groupName === source.groupName);
      const target: ImportRowGroup = found ?? { groupName: source.groupName, rows: [] };

      if (!found) {
        rowGroups.push(target);
      }
      for (const item of source.items) {
        target.rows.push({ item: item, struck: struck });
      }
    }
  };

  if (view !== 'skipped') {
    appendGroups(preview.added, false);
  }
  if (view !== 'added') {
    appendGroups(preview.skipped, view === 'all');
  }

  return rowGroups;
};

interface TemplateImportConfirmDialogProps {
  /** 가져올 템플릿 */
  template: Template;

  /** 미리보기 결과 (추가될 항목과 제외될 항목) */
  preview: TemplateImportPreview;

  /** 가져오기 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 가져오기를 눌렀을 때 */
  onConfirm: () => void;

  /** 취소 */
  onCancel: () => void;
}

/**
 * 템플릿 가져오기 확인 창. 전체, 추가 항목, 제외 항목 개수를 카드 세 칸으로 보여 주고, 카드를 누르면 아래 목록이 그 항목만 걸러진다.
 * 개수가 0인 칸은 막힌다. 항목이 많아도 창 안에서 스크롤된다. 제조사처럼 상위 그룹이 없는 템플릿은 그룹 머리말 없이 줄만 보인다.
 */
const TemplateImportConfirmDialog = ({ template, preview, loading, onConfirm, onCancel }: TemplateImportConfirmDialogProps) => {
  const [view, setView] = useState<ImportView>('all');
  const totalCount = preview.addCount + preview.skippedCount;
  const rowGroups = toRowGroups(preview, view);

  return (
    <Dialog open onClose={onCancel} fullWidth maxWidth="md">
      <DialogTitle>'{template.name}'을(를) 가져올까요?</DialogTitle>
      <DialogContent>
        <DialogFieldStack>
          <TripleGrid>
            <SelectableCard selected={view === 'all'} onClick={() => setView('all')}>
              <LabelText>전체</LabelText>
              <Typography variant="h5">{totalCount}개</Typography>
            </SelectableCard>
            <SelectableCard selected={view === 'added'} disabled={preview.addCount === 0} onClick={() => setView('added')}>
              <LabelText>추가 항목</LabelText>
              <Typography variant="h5" color="primary">
                {preview.addCount}개
              </Typography>
            </SelectableCard>
            <SelectableCard selected={view === 'skipped'} disabled={preview.skippedCount === 0} onClick={() => setView('skipped')}>
              <LabelText>제외 항목</LabelText>
              <Typography variant="h5">{preview.skippedCount}개</Typography>
            </SelectableCard>
          </TripleGrid>

          {rowGroups.map((rowGroup, groupIndex) => (
            <ImportGroupPanel key={groupIndex} rowGroup={rowGroup} />
          ))}
        </DialogFieldStack>
      </DialogContent>
      <FormActions>
        <TonalButton onClick={onCancel}>취소</TonalButton>
        <Button variant="contained" disabled={loading} onClick={onConfirm}>
          가져오기
        </Button>
      </FormActions>
    </Dialog>
  );
};

interface ImportGroupPanelProps {
  /** 그릴 그룹 */
  rowGroup: ImportRowGroup;
}

/** 상위 그룹 하나를 패널 하나로, 항목 줄을 그린다. 그룹 이름이 없으면 머리말 없이 줄만 그린다 */
const ImportGroupPanel = ({ rowGroup }: ImportGroupPanelProps) => {
  return (
    <Panel>
      {rowGroup.groupName && (
        <PanelTop>
          <PanelHeader>
            <Typography variant="h6">{rowGroup.groupName}</Typography>
          </PanelHeader>
        </PanelTop>
      )}
      {rowGroup.rows.map((row) => (
        <CategoryRow
          key={row.item.name}
          name={row.item.name}
          description={row.item.description}
          thumbnailUrl={row.item.thumbnailUrl}
          struck={row.struck}
        />
      ))}
    </Panel>
  );
};

export default TemplateImportConfirmDialog;
