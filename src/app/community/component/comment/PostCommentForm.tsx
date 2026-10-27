import { useRef, useState, type ChangeEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button, FormHelperText, InputBase, Tooltip, Typography } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { THUMBNAIL_ACCEPT } from '@/app/common/constant/thumbnailFile';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FormBody } from '@/app/common/style/CommonForm.style';
import { SpreadRow } from '@/app/common/style/CommonLayout.style';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { InfoIcon } from '@/app/common/style/CommonTooltip.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import PostCommentFormImages from '@/app/community/component/comment/PostCommentFormImages';
import type { PostCommentImageUploadResponseData } from '@/app/community/interface/PostCommentImageUploadResponseData';
import type { PostCommentReplyTarget } from '@/app/community/interface/PostCommentReplyTarget';
import type { PostCommentSaveRequestBody } from '@/app/community/interface/PostCommentSaveRequestBody';
import useCreatePostComment from '@/app/community/service/useCreatePostComment';
import useUploadCommentImage from '@/app/community/service/useUploadCommentImage';
import { CommentBody, CommentFormBox, CommentInputLine, CommentRow, MentionText } from '@/app/community/style/PostComment.style';
import { validateCommentImageFile, validatePostComment } from '@/app/community/utils/PostUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

/** 댓글 하나에 붙일 수 있는 이미지 수 */
const MAX_IMAGES = 2;

/** 이미지 버튼 옆 (i) 안내 글자 */
const IMAGE_TIP = '이미지는 400x400 이하를 권장합니다. ~콘 처럼 사용하는 곳이에요!';

interface PostCommentFormValues {
  /** 댓글 내용 */
  content: string;
}

interface PostCommentFormProps {
  /** 댓글을 쓰는 글 */
  postId: number;

  /** 답글을 쓰는 대상. 없으면 새 댓글 상자다 */
  replyTarget?: PostCommentReplyTarget;

  /** 답글 상자를 닫는다 (취소를 눌렀거나 등록이 끝났을 때) */
  onClose?: () => void;
}

/**
 * 댓글 쓰기 상자 (새 댓글과 답글이 같은 모양). 이미지 줄(글 칸 위)과 입력 줄(글, 이미지 n/2, 안내, 등록)이 한 테두리 안에 있다.
 * 이미지는 고르는 즉시 올려서 id 를 모아 두고, 등록 때 한 번에 보낸다. 등록에 성공하면 비우고 답글 상자는 닫는다.
 */
const PostCommentForm = ({ postId, replyTarget, onClose }: PostCommentFormProps) => {
  const showResult = useUiStore((state) => state.showResult);
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const user = useAuthStore((state) => state.user);
  const { uploadCommentImageLoading, fetchUploadCommentImage } = useUploadCommentImage();
  const { createPostCommentLoading, fetchCreatePostComment } = useCreatePostComment(postId);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PostCommentImageUploadResponseData[]>([]);

  const { register, handleSubmit, control, reset, formState } = useForm<PostCommentFormValues>({
    mode: 'onTouched',
    defaultValues: { content: '' },
  });
  const { errors } = formState;

  const busy = uploadCommentImageLoading || createPostCommentLoading;
  const content = useWatch({ control, name: 'content' });
  const isEmpty = content.trim() === '';
  const isImageFull = images.length >= MAX_IMAGES;
  const avatarUrl = user !== null ? user.thumbnailUrl : undefined;
  const isReply = replyTarget !== undefined;

  /* 고른 파일을 차례로 검사하고 올린다. 남은 칸보다 많이 골랐으면 앞에서부터 남은 칸만큼만 쓴다 */
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';

    const room = MAX_IMAGES - images.length;

    if (files.length > room) {
      showSnackbar(`이미지는 ${MAX_IMAGES}장까지 붙일 수 있어요.`, 'warning');
    }

    const uploaded: PostCommentImageUploadResponseData[] = [];

    for (const file of files.slice(0, room)) {
      const message = validateCommentImageFile(file);

      if (message !== undefined) {
        showSnackbar(message, 'warning');
        continue;
      }

      const res = await fetchUploadCommentImage(file);

      if (res.code !== API_CODE.OK || res.data === null) {
        showResult(res);
        continue;
      }

      uploaded.push(res.data);
    }

    setImages((current) => [...current, ...uploaded]);
  };

  const handleRemoveImage = (postCommentImageId: number) => {
    setImages((current) => current.filter((image) => image.postCommentImageId !== postCommentImageId));
  };

  const handleValid = async ({ content }: PostCommentFormValues) => {
    const body: PostCommentSaveRequestBody = {
      content: content.trim(),
      postCommentImageIds: images.map((image) => image.postCommentImageId),
    };

    if (replyTarget !== undefined) {
      body.parentPostCommentId = replyTarget.parentPostCommentId;
      body.mentionUserId = replyTarget.mentionUserId;
    }

    const res = await fetchCreatePostComment(body);
    showResult(res);

    if (res.code !== API_CODE.OK) {
      return;
    }

    reset();
    setImages([]);

    if (onClose !== undefined) {
      onClose();
    }
  };

  return (
    <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
      <CommentRow>
        <ThumbAvatar size="sm" src={imageUrl(avatarUrl)} />
        <CommentBody>
          {isReply && (
            <SpreadRow>
              <Typography variant="body2" color="text.secondary">
                {replyTarget.mentionUserName !== undefined && <MentionText>@{replyTarget.mentionUserName}</MentionText>}
                에게 답글
              </Typography>
              <Button type="button" size="small" color="inherit" onClick={onClose}>
                취소
              </Button>
            </SpreadRow>
          )}

          <CommentFormBox>
            <PostCommentFormImages images={images} disabled={busy} onRemove={handleRemoveImage} />
            <CommentInputLine>
              <InputBase
                multiline
                fullWidth
                autoFocus={isReply}
                disabled={busy}
                placeholder={isReply ? '답글을 입력해 주세요' : '댓글을 입력해 주세요'}
                inputRef={register('content', { validate: validatePostComment }).ref}
                {...register('content', { validate: validatePostComment })}
              />
              <Button
                type="button"
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<ImageOutlinedIcon />}
                disabled={busy || isImageFull}
                onClick={() => fileInputRef.current?.click()}
              >
                {images.length}/{MAX_IMAGES}
              </Button>
              <Tooltip title={IMAGE_TIP} placement="top">
                <InfoIcon fontSize="inherit" />
              </Tooltip>
              <TonalButton type="submit" disabled={busy || isEmpty}>
                등록
              </TonalButton>
            </CommentInputLine>
          </CommentFormBox>
          {errors.content && <FormHelperText error>{errors.content.message}</FormHelperText>}
          <input ref={fileInputRef} type="file" accept={THUMBNAIL_ACCEPT} multiple hidden onChange={handleFileChange} />
        </CommentBody>
      </CommentRow>
    </FormBody>
  );
};

export default PostCommentForm;
