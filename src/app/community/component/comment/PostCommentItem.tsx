import { Typography } from '@mui/material';
import { FillImage, ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import PostAuthorLine from '@/app/community/component/common/PostAuthorLine';
import type { PostComment } from '@/app/community/interface/PostComment';
import type { PostHiddenStatus } from '@/app/community/interface/PostStatus';
import {
  AvatarColumn,
  CommentBody,
  CommentImages,
  CommentRow,
  CommentText,
  HiddenText,
  MentionText,
  Rail,
} from '@/app/community/style/PostComment.style';
import { formatPostDate } from '@/app/community/utils/PostUtils';

/** 삭제나 탈퇴로 가려진 댓글 자리에 보여 줄 글자 */
const HIDDEN_TEXT: Record<PostHiddenStatus, string> = {
  DELETED: '삭제된 댓글입니다.',
  WITHDRAWN: '탈퇴한 사용자의 댓글입니다.',
};

interface PostCommentItemProps {
  /** 보여 줄 댓글(또는 답글) */
  comment: PostComment;

  /** 이 댓글에 답글이 달려 있는지 (사진 아래에 답글로 이어지는 줄기를 그린다) */
  hasReplies: boolean;
}

/**
 * 댓글 한 줄. 사진, 이름과 날짜, 이미지(글 위), 글을 보여 준다. 답글이면 글 앞에 @이름이 붙는다.
 * 삭제나 탈퇴로 가려진 댓글은 내용 없이 날짜와 안내 글자만 보여 준다.
 */
const PostCommentItem = ({ comment, hasReplies }: PostCommentItemProps) => {
  if (comment.status !== 'NORMAL') {
    return (
      <CommentRow>
        <AvatarColumn>
          <ThumbAvatar size="sm" />
          {hasReplies && <Rail />}
        </AvatarColumn>
        <CommentBody>
          <Typography variant="body2" color="text.secondary">
            {formatPostDate(comment.createdAt)}
          </Typography>
          <HiddenText>{HIDDEN_TEXT[comment.status]}</HiddenText>
        </CommentBody>
      </CommentRow>
    );
  }

  const hasImages = comment.images.length > 0;
  const hasMention = comment.mentionUserName !== undefined;

  return (
    <CommentRow>
      <AvatarColumn>
        <ThumbAvatar size="sm" src={imageUrl(comment.authorThumbnailUrl)} />
        {hasReplies && <Rail />}
      </AvatarColumn>
      <CommentBody>
        <PostAuthorLine name={comment.authorName} createdAt={comment.createdAt} updatedAt={comment.updatedAt} />
        {hasImages && (
          <CommentImages>
            {comment.images.map((image) => (
              <FillImage key={image.postCommentImageId} src={imageUrl(image.url)} alt="" />
            ))}
          </CommentImages>
        )}
        <CommentText>
          {hasMention && <MentionText>@{comment.mentionUserName}</MentionText>}
          {comment.content}
        </CommentText>
      </CommentBody>
    </CommentRow>
  );
};

export default PostCommentItem;
