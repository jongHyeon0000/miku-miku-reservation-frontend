import { useState, type SyntheticEvent } from 'react';
import { Dialog, DialogContent, DialogTitle, Tab, Typography } from '@mui/material';
import { CATEGORY_AXIS_NAMES } from '@/app/category/common/constant/categoryAxes';
import { Panel } from '@/app/category/common/style/CategoryPanel.style';
import TemplateImportConfirmDialog from '@/app/category/template/component/TemplateImportConfirmDialog';
import TemplateRow from '@/app/category/template/component/TemplateRow';
import { TEMPLATE_TYPE_AXES, TEMPLATE_TYPES, type TemplateType } from '@/app/category/template/constant/templateType';
import type { Template } from '@/app/category/template/interface/Template';
import type { TemplateImportPreview } from '@/app/category/template/interface/TemplateImportPreview';
import useImportTemplate from '@/app/category/template/service/useImportTemplate';
import useReadTemplateImportPreview from '@/app/category/template/service/useReadTemplateImportPreview';
import useReadTemplateList from '@/app/category/template/service/useReadTemplateList';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FormActions } from '@/app/common/style/CommonForm.style';
import { UnderlineTabs } from '@/app/common/style/CommonTabs.style';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useUiStore } from '@/store/uiStore';

interface TemplateImportDialogProps {
  /** 닫기 */
  onClose: () => void;
}

/** 확인 창에 띄울 것. 미리보기까지 읽은 템플릿 */
interface ConfirmState {
  template: Template;
  preview: TemplateImportPreview;
}

/**
 * 템플릿 목록 창. 종류 탭으로 나눠 보고, 템플릿마다 개수와 가져오기 버튼이 있다.
 * 탭 이름은 그 종류가 채우는 분류 축의 이름(판매처, 시리즈 등)을 쓴다.
 * 창이 열릴 때 목록을 읽는다. 가져오기를 누르면 미리보기를 읽어 확인 창을 띄우고, 확인하면 가져온다.
 */
const TemplateImportDialog = ({ onClose }: TemplateImportDialogProps) => {
  const { templateList, templateListLoading, fetchReadTemplateList } = useReadTemplateList();
  const { templateImportPreviewLoading, fetchReadTemplateImportPreview } = useReadTemplateImportPreview();
  const { importTemplateLoading, fetchImportTemplate } = useImportTemplate();
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const showResult = useUiStore((state) => state.showResult);

  const [tab, setTab] = useState<TemplateType>(TEMPLATE_TYPES[0]);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);

  const allTemplates = templateList?.data ?? [];

  /* 고른 탭의 종류만 남긴다 */
  const templates = allTemplates.filter((template) => template.templateType === tab);

  const handleTabChange = (_event: SyntheticEvent, value: TemplateType) => setTab(value);

  const handleImportClick = async (template: Template) => {
    const res = await fetchReadTemplateImportPreview(template.templateId);
    if (res.code !== API_CODE.OK) {
      showResult(res);
      return;
    }
    setConfirm({ template: template, preview: res.data! });
  };

  /* 성공하면 확인 창만 닫는다. 목록 창은 열어 두어 이어서 다른 템플릿을 가져올 수 있다 */
  const handleConfirm = async () => {
    if (confirm === null) return;

    const res = await fetchImportTemplate(confirm.template.templateId, confirm.template.templateType);
    if (res.code !== API_CODE.OK) {
      showResult(res);
      return;
    }
    showSnackbar(`${res.data!.addedCount}개를 가져왔어요.`, 'success');
    setConfirm(null);
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>템플릿 가져오기</DialogTitle>
      <DialogContent>
        <UnderlineTabs value={tab} onChange={handleTabChange}>
          {TEMPLATE_TYPES.map((type) => (
            <Tab key={type} value={type} label={CATEGORY_AXIS_NAMES[TEMPLATE_TYPE_AXES[type]]} />
          ))}
        </UnderlineTabs>

        {templateList && templateList.code !== API_CODE.OK && (
          <ErrorView message={templateList.message} onRetry={fetchReadTemplateList} />
        )}
        {templateList?.code === API_CODE.OK && templates.length === 0 && <EmptyView message="가져올 수 있는 템플릿이 없어요" />}
        {templates.length > 0 && (
          <Panel>
            {templates.map((template) => (
              <TemplateRow
                key={template.templateId}
                name={template.name}
                description={template.description}
                thumbnailUrl={template.thumbnailUrl}
                actions={
                  <>
                    <Typography variant="mono" color="text.secondary" noWrap>
                      {template.itemCount}개
                    </Typography>
                    <TonalButton size="small" onClick={() => handleImportClick(template)}>
                      가져오기
                    </TonalButton>
                  </>
                }
              />
            ))}
          </Panel>
        )}
      </DialogContent>
      <FormActions>
        <TonalButton onClick={onClose}>닫기</TonalButton>
      </FormActions>
      {confirm && (
        <TemplateImportConfirmDialog
          template={confirm.template}
          preview={confirm.preview}
          loading={importTemplateLoading}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      <LoadingOverlay open={templateListLoading || templateImportPreviewLoading || importTemplateLoading} />
    </Dialog>
  );
};

export default TemplateImportDialog;
