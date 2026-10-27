import { Tooltip, Typography } from '@mui/material';
import { BoldText } from '@/app/common/style/CommonText.style';
import { Dot, EditedMark, NameLine } from '@/app/community/style/PostMeta.style';
import { formatPostDate } from '@/app/community/utils/PostUtils';

interface PostAuthorLineProps {
  /** 작성자 이름 */
  name: string;

  /** 작성일 */
  createdAt: string;

  /** 수정일 (작성일과 다르면 "수정됨"을 보여 준다) */
  updatedAt: string;
}

/**
 * 작성자 이름, 날짜, 고친 글이면 "· 수정됨"(마우스를 올리면 수정일)을 한 줄로 보여 준다. 글 카드와 댓글이 같이 쓴다.
 */
const PostAuthorLine = ({ name, createdAt, updatedAt }: PostAuthorLineProps) => {
  const isEdited = updatedAt !== createdAt;

  return (
    <NameLine>
      <BoldText>{name}</BoldText>
      <Typography variant="body2" color="text.secondary">
        {formatPostDate(createdAt)}
        {isEdited && (
          <>
            <Dot>·</Dot>
            <Tooltip title={`수정일 ${formatPostDate(updatedAt)}`}>
              <EditedMark>수정됨</EditedMark>
            </Tooltip>
          </>
        )}
      </Typography>
    </NameLine>
  );
};

export default PostAuthorLine;
