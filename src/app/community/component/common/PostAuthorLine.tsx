import type { MouseEvent } from 'react';
import { ButtonBase, Tooltip, Typography } from '@mui/material';
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

  /** 이름을 눌렀을 때 (누른 자리에 프로필 팝오버를 띄운다) */
  onOpenProfile: (e: MouseEvent<HTMLElement>) => void;

  /** 프로필 팝오버가 열려 있는지 (열려 있는 동안 이름이 금색) */
  profileOpen: boolean;
}

/**
 * 작성자 이름, 날짜, 고친 글이면 "· 수정됨"(마우스를 올리면 수정일)을 한 줄로 보여 준다. 글 카드와 댓글이 같이 쓴다.
 * 이름을 누르면 프로필 팝오버가 뜨고, 열려 있는 동안 이름이 금색이다.
 */
const PostAuthorLine = ({ name, createdAt, updatedAt, onOpenProfile, profileOpen }: PostAuthorLineProps) => {
  const isEdited = updatedAt !== createdAt;

  return (
    <NameLine>
      <ButtonBase onClick={onOpenProfile}>
        <BoldText color={profileOpen ? 'primary' : undefined}>{name}</BoldText>
      </ButtonBase>
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
