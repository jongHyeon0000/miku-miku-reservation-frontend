import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import CategoryRow from '@/app/category/common/component/CategoryRow';
import { CATEGORY_AXIS_NAMES } from '@/app/category/common/constant/categoryAxes';
import { PanelHeader, PanelTop } from '@/app/category/common/style/CategoryPanel.style';
import { Panel } from '@/app/common/style/CommonList.style';
import { TEMPLATE_TYPE_AXES } from '@/app/category/template/constant/templateType';
import type { Template } from '@/app/category/template/interface/Template';
import type { TemplateImportPreview } from '@/app/category/template/interface/TemplateImportPreview';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { DialogFieldStack, FormActions } from '@/app/common/style/CommonForm.style';

interface TemplateImportConfirmDialogProps {
  /** 가져올 템플릿 */
  template: Template;

  /** 미리보기 결과 (추가될 수와 제외될 항목) */
  preview: TemplateImportPreview;

  /** 가져오기 요청 중이면 버튼을 막는다 */
  loading: boolean;

  /** 가져오기를 눌렀을 때 */
  onConfirm: () => void;

  /** 취소 */
  onCancel: () => void;
}

/**
 * 템플릿 가져오기 확인 창. 몇 개가 추가되는지와, 이미 있어서 제외되는 항목을 상위 그룹별로 보여 준다.
 * 제외 항목이 많아도 창 안에서 스크롤된다. 제조사처럼 상위 그룹이 없는 템플릿은 그룹 머리말 없이 줄만 보인다.
 */
const TemplateImportConfirmDialog = ({ template, preview, loading, onConfirm, onCancel }: TemplateImportConfirmDialogProps) => {
  const axisName = CATEGORY_AXIS_NAMES[TEMPLATE_TYPE_AXES[template.templateType]];

  return (
    <Dialog open onClose={onCancel} fullWidth maxWidth="md">
      <DialogTitle>'{template.name}'을(를) 가져올까요?</DialogTitle>
      <DialogContent>
        <DialogFieldStack>
          <Typography>
            {axisName} 분류에 {preview.addCount}개가 추가돼요.
          </Typography>
          {preview.skippedCount > 0 && (
            <Typography color="text.secondary">이미 등록돼 있어서 제외되는 항목이 {preview.skippedCount}개 있어요.</Typography>
          )}

          {preview.skipped.map((group, groupIndex) => (
            <Panel key={groupIndex}>
              {group.groupName && (
                <PanelTop>
                  <PanelHeader>
                    <Typography variant="h6">{group.groupName}</Typography>
                  </PanelHeader>
                </PanelTop>
              )}
              {group.items.map((item) => (
                <CategoryRow key={item.name} name={item.name} description={item.description} thumbnailUrl={item.thumbnailUrl} />
              ))}
            </Panel>
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

export default TemplateImportConfirmDialog;
