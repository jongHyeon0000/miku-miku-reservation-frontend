import CloseIcon from '@mui/icons-material/Close';
import { FillImage } from '@/app/common/style/CommonMedia.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import type { PostCommentImageUploadResponseData } from '@/app/community/interface/PostCommentImageUploadResponseData';
import { PreviewFrame, PreviewRow, RemoveButton } from '@/app/community/style/PostComment.style';

interface PostCommentFormImagesProps {
  /** 올려 둔 이미지 (붙인 순서대로) */
  images: PostCommentImageUploadResponseData[];

  /** 요청 중이면 뺄 수 없다 */
  disabled: boolean;

  /** 이미지 칸의 × 를 눌렀을 때 (화면에서만 뺀다. 서버가 안 쓰인 이미지를 1일 뒤 지운다) */
  onRemove: (postCommentImageId: number) => void;
}

/**
 * 댓글 쓰기 상자 위에 붙는 이미지 미리보기 줄. 이미지가 없으면 아무것도 그리지 않는다.
 */
const PostCommentFormImages = ({ images, disabled, onRemove }: PostCommentFormImagesProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <PreviewRow>
      {images.map((image) => (
        <PreviewFrame key={image.postCommentImageId}>
          <FillImage src={imageUrl(image.url)} alt="" />
          <RemoveButton size="small" aria-label="이미지 빼기" disabled={disabled} onClick={() => onRemove(image.postCommentImageId)}>
            <CloseIcon fontSize="inherit" />
          </RemoveButton>
        </PreviewFrame>
      ))}
    </PreviewRow>
  );
};

export default PostCommentFormImages;
