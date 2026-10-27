import { Divider, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import HtmlView from '@/app/common/component/HtmlView';
import { ColumnCard } from '@/app/common/style/CommonCard.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { PageTitle } from '@/app/common/style/CommonPage.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import PostAuthorLine from '@/app/community/component/common/PostAuthorLine';
import type { PostDetail } from '@/app/community/interface/PostDetail';
import { Dot } from '@/app/community/style/PostMeta.style';
import { styled } from '@mui/material/styles';

interface PostDetailCardProps {
  /** 보여 줄 글 */
  post: PostDetail;
}

/**
 * 글 한 장. 제목, 작성자 줄(사진, 닉네임, 날짜, 고친 글이면 수정됨), 본문, 맨 아래 조회와 댓글 수를 보여 준다.
 */
const PostDetailCard = ({ post }: PostDetailCardProps) => {
  return (
    <ColumnCard>
      <PageTitle variant="h5" component="h1">
        {post.title}
      </PageTitle>

      <Row>
        <ThumbAvatar size="sm" src={imageUrl(post.authorThumbnailUrl)} />
        <PostAuthorLine name={post.authorName} createdAt={post.createdAt} updatedAt={post.updatedAt} />
      </Row>

      <Divider />
      <HtmlView html={post.content} />
      <Divider />

      <StatLine variant="body2" component="div">
        <StatIcon as={VisibilityOutlinedIcon} fontSize="inherit" />
        조회 {post.viewCount}
        <Dot>•</Dot>
        <StatIcon as={ChatBubbleOutlineIcon} fontSize="inherit" />
        댓글 {post.commentCount}
      </StatLine>
    </ColumnCard>
  );
};

/** 조회와 댓글 한 줄. 아이콘을 글자 줄 안에 글자처럼 넣는다 */
const StatLine = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
})) as typeof Typography;

/**
 * 글자 앞의 작은 아이콘. 글자 기준선에 맞추는 값(verticalAlign)이라 글꼴이 달라도 따로 위치를 보정하지 않는다.
 * 분류의 (i) 아이콘(InfoIcon)과 같은 방식이다.
 */
const StatIcon = styled('svg')(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  verticalAlign: '-0.125em',
}));

export default PostDetailCard;
