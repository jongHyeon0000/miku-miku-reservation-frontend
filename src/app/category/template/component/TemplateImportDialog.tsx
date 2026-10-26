import { useState, type SyntheticEvent } from 'react';
import { Dialog, DialogContent, DialogTitle, Tab, Typography } from '@mui/material';
import { CATEGORY_AXIS_NAMES } from '@/app/category/common/constant/categoryAxes';
import { Panel } from '@/app/category/common/style/CategoryPanel.style';
import TemplateRow from '@/app/category/template/component/TemplateRow';
import { TEMPLATE_TYPE_AXES, TEMPLATE_TYPES, type TemplateType } from '@/app/category/template/constant/templateType';
import useReadTemplateList from '@/app/category/template/service/useReadTemplateList';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FormActions } from '@/app/common/style/CommonForm.style';
import { UnderlineTabs } from '@/app/common/style/CommonTabs.style';
import { API_CODE } from '@/config/axios/constant/apiCode';

interface TemplateImportDialogProps {
  /** 닫기 */
  onClose: () => void;
}

/**
 * 템플릿 목록 창. 종류 탭으로 나눠 보고, 템플릿마다 개수와 가져오기 버튼이 있다.
 * 탭 이름은 그 종류가 채우는 분류 축의 이름(판매처, 시리즈 등)을 쓴다.
 * 창이 열릴 때 목록을 읽는다.
 */
const TemplateImportDialog = ({ onClose }: TemplateImportDialogProps) => {
  const { templateList, templateListLoading, fetchReadTemplateList } = useReadTemplateList();
  const [tab, setTab] = useState<TemplateType>(TEMPLATE_TYPES[0]);

  const allTemplates = templateList?.data ?? [];

  /* 고른 탭의 종류만 남긴다 */
  const templates = allTemplates.filter((template) => template.templateType === tab);

  const handleTabChange = (_event: SyntheticEvent, value: TemplateType) => setTab(value);

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
                    <TonalButton size="small">가져오기</TonalButton>
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
      <LoadingOverlay open={templateListLoading} />
    </Dialog>
  );
};

export default TemplateImportDialog;
