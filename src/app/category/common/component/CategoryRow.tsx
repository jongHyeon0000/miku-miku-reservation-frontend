import type { ReactNode } from 'react';
import { Tooltip } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Description, RowBox, TextBox } from '@/app/category/common/style/CategoryRow.style';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { BoldText } from '@/app/common/style/CommonText.style';
import { InfoIcon, TooltipText } from '@/app/common/style/CommonTooltip.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';

interface CategoryRowProps {
  /** 이름 */
  name: string;

  /** 설명. 없으면 이름만 보여 준다 */
  description?: string;

  /** 썸네일 주소. 없으면 이미지 아이콘 */
  thumbnailUrl?: string;

  /** 줄 오른쪽에 둘 것 (수정, 삭제 버튼, 기본 항목 칩, 개수와 가져오기 버튼 등). 줄이 세로 가운데 정렬과 간격을 맡는다. 없으면 오른쪽이 비어 있다 */
  actions?: ReactNode;
}

/**
 * 분류 한 줄. 썸네일, 이름, 설명(이름 옆 (i) 툴팁과 아래 한 줄)을 보여 주고 오른쪽 칸은 부르는 쪽이 정한다.
 * 5개 분류 축의 목록 줄과 템플릿 목록, 가져오기 때 제외되는 항목 목록이 같이 쓴다.
 */
const CategoryRow = ({ name, description, thumbnailUrl, actions }: CategoryRowProps) => {
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

export default CategoryRow;
