import type { ReactNode } from 'react';
import { Tooltip } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Description, RowBox, TextBox } from '@/app/category/common/style/CategoryRow.style';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { BoldText } from '@/app/common/style/CommonText.style';
import { InfoIcon, TooltipText } from '@/app/common/style/CommonTooltip.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';

interface TemplateRowProps {
  /** 이름 */
  name: string;

  /** 설명. 없으면 이름만 보여 준다 */
  description?: string;

  /** 썸네일 주소. 없으면 이미지 아이콘 */
  thumbnailUrl?: string;

  /** 줄 오른쪽에 둘 것 (개수, 버튼). 줄이 세로 가운데 정렬과 간격을 맡는다. 없으면 오른쪽이 비어 있다 */
  actions?: ReactNode;
}

/**
 * 템플릿 한 줄. 분류 목록 줄에 썸네일을 앞에 둔 모양이다. 템플릿 목록과 가져오기 때 제외되는 항목 목록이 같이 쓴다.
 */
const TemplateRow = ({ name, description, thumbnailUrl, actions }: TemplateRowProps) => {
  return (
    <RowBox>
      <ThumbAvatar size="md" variant="rounded" src={imageUrl(thumbnailUrl)}>
        <ImageOutlinedIcon />
      </ThumbAvatar>
      <TextBox>
        <BoldText>
          {name}
          {description && (
            <Tooltip title={<TooltipText>{description}</TooltipText>} placement="right-start">
              <InfoIcon fontSize="inherit" />
            </Tooltip>
          )}
        </BoldText>
        {description && (
          <Description variant="caption" color="text.secondary">
            {description}
          </Description>
        )}
      </TextBox>
      {actions}
    </RowBox>
  );
};

export default TemplateRow;
