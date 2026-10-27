import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button, FormHelperText, InputBase, Typography } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { THUMBNAIL_ACCEPT } from '@/app/common/constant/thumbnailFile';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { FormBody } from '@/app/common/style/CommonForm.style';
import { EndRow, SpreadRow } from '@/app/common/style/CommonLayout.style';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import PostCommentFormImages from '@/app/community/component/comment/PostCommentFormImages';
import type { PostCommentNormal } from '@/app/community/interface/PostComment';
import type { PostCommentImageUploadResponseData } from '@/app/community/interface/PostCommentImageUploadResponseData';
import type { PostCommentReplyTarget } from '@/app/community/interface/PostCommentReplyTarget';
import type { PostCommentSaveRequestBody } from '@/app/community/interface/PostCommentSaveRequestBody';
import useCreatePostComment from '@/app/community/service/useCreatePostComment';
import useUpdatePostComment from '@/app/community/service/useUpdatePostComment';
import useUploadCommentImage from '@/app/community/service/useUploadCommentImage';
import { AvatarColumn, CommentBody, CommentFormBox, CommentInputLine, CommentRow, MentionText, Rail } from '@/app/community/style/PostComment.style';
import { validateCommentImageFile, validatePostComment } from '@/app/community/utils/PostUtils';
import { API_CODE } from '@/config/axios/constant/apiCode';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

/** 댓글 하나에 붙일 수 있는 이미지 수 */
const MAX_IMAGES = 2;

/** 상자 아래 오른쪽에 늘 보여 주는 이미지 안내 글자 */
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

  /** 수정하는 댓글. 있으면 수정 상자다(글과 이미지가 채워져 시작하고 저장하면 수정한다) */
  editTarget?: PostCommentNormal;

  /** 수정하는 댓글 아래에 답글이 있는지 (있으면 사진 아래에 답글로 이어지는 줄기를 그린다) */
  hasReplies?: boolean;

  /** 답글, 수정 상자를 닫는다 (취소를 눌렀거나 저장이 끝났을 때) */
  onClose?: () => void;
}

/**
 * 댓글 쓰기 상자 (새 댓글, 답글, 수정이 같은 모양). 이미지 줄(글 칸 위)과 입력 줄(글, 이미지 n/2, 등록 또는 저장)이 한 테두리 안에 있다.
 * 이미지는 고르는 즉시 올려서 id 를 모아 두고, 등록 때 한 번에 보낸다. 수정이면 기존 이미지가 처음부터 모여 있고, 저장할 때 남은 목록이 최종 목록이 된다.
 * 성공하면 비우고 답글, 수정 상자는 닫는다.
 */
const PostCommentForm = ({ postId, replyTarget, editTarget, hasReplies = false, onClose }: PostCommentFormProps) => {
  const showResult = useUiStore((state) => state.showResult);
  const showSnackbar = useUiStore((state) => state.showSnackbar);
  const user = useAuthStore((state) => state.user);
  const { uploadCommentImageLoading, fetchUploadCommentImage } = useUploadCommentImage();
  const { createPostCommentLoading, fetchCreatePostComment } = useCreatePostComment(postId);
  const { updatePostCommentLoading, fetchUpdatePostComment } = useUpdatePostComment(postId);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialImages = editTarget !== undefined ? editTarget.images : [];
  const initialContent = editTarget !== undefined ? editTarget.content : '';
  const [images, setImages] = useState<PostCommentImageUploadResponseData[]>(initialImages);

  const { register, handleSubmit, control, reset, formState } = useForm<PostCommentFormValues>({
    mode: 'onTouched',
    defaultValues: { content: initialContent },
  });
  const { errors } = formState;

  const busy = uploadCommentImageLoading || createPostCommentLoading || updatePostCommentLoading;
  const content = useWatch({ control, name: 'content' });
  const isEmpty = content.trim() === '';
  const isImageFull = images.length >= MAX_IMAGES;
  const avatarUrl = user !== null ? user.thumbnailUrl : undefined;
  const isReply = replyTarget !== undefined;
  const isEdit = editTarget !== undefined;

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

    const res = editTarget !== undefined ? await fetchUpdatePostComment(editTarget.postCommentId, body) : await fetchCreatePostComment(body);
    showResult(res);

    if (res.code !== API_CODE.OK) {
      return;
    }

    reset({ content: '' });
    setImages([]);

    if (onClose !== undefined) {
      onClose();
    }
  };

  /* Enter 는 등록, Shift+Enter 는 줄바꿈(기본 동작). 한글 조합 중의 Enter(글자 확정)는 무시한다 */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) {
      return;
    }

    e.preventDefault();

    if (busy || isEmpty) {
      return;
    }

    handleSubmit(handleValid)();
  };

  return (
    <FormBody noValidate onSubmit={handleSubmit(handleValid)}>
      <CommentRow>
        <AvatarColumn>
          <ThumbAvatar size="sm" src={imageUrl(avatarUrl)} />
          {hasReplies && <Rail />}
        </AvatarColumn>
        <CommentBody>
          {(isReply || isEdit) && (
            <SpreadRow>
              <Typography variant="body2" color="text.secondary">
                {isEdit && '댓글 수정 중'}
                {isReply && replyTarget.mentionUserName !== undefined && <MentionText>@{replyTarget.mentionUserName}</MentionText>}
                {isReply && '에게 답글'}
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
                autoFocus={isReply || isEdit}
                disabled={busy}
                placeholder={isReply ? '답글을 입력해 주세요' : '댓글을 입력해 주세요'}
                onKeyDown={handleKeyDown}
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
              <TonalButton type="submit" disabled={busy || isEmpty}>
                {isEdit ? '저장' : '등록'}
              </TonalButton>
            </CommentInputLine>
          </CommentFormBox>
          <EndRow>
            <FormHelperText>{IMAGE_TIP}</FormHelperText>
          </EndRow>
          {errors.content && <FormHelperText error>{errors.content.message}</FormHelperText>}
          <input ref={fileInputRef} type="file" accept={THUMBNAIL_ACCEPT} multiple hidden onChange={handleFileChange} />
        </CommentBody>
      </CommentRow>
    </FormBody>
  );
};

export default PostCommentForm;
