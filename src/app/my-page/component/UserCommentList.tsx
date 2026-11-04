import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { ClampText } from '@/app/common/style/CommonText.style';
import useReadUserCommentList from '@/app/community/service/useReadUserCommentList';
import { formatPostDate } from '@/app/community/utils/PostUtils';
import ActivityList from '@/app/my-page/component/ActivityList';
import { API_CODE } from '@/config/axios/constant/apiCode';

interface UserCommentListProps {
  /** 댓글을 보여 줄 사용자 id */
  userId: number;
}

/**
 * 프로필의 최근 댓글 탭. 탭이 열릴 때 읽고, 줄을 누르면 댓글이 달린 글로 간다.
 * 줄마다 댓글 내용(두 줄까지)과 "RE: 글 제목", 날짜를 보여 준다.
 */
const UserCommentList = ({ userId }: UserCommentListProps) => {
  const navigate = useNavigate();
  const { userCommentList, userCommentListLoading, fetchReadUserCommentList } = useReadUserCommentList(userId, true);

  if (userCommentListLoading) {
    return <LoadingOverlay open />;
  }

  if (userCommentList === undefined || userCommentList.code !== API_CODE.OK || userCommentList.data === null) {
    const message = userCommentList === undefined ? '댓글을 불러오지 못했어요' : userCommentList.message;
    return <ErrorView message={message} onRetry={fetchReadUserCommentList} />;
  }

  const comments = userCommentList.data;

  if (comments.length === 0) {
    return <EmptyView message="작성한 댓글이 없어요" />;
  }

  /* 댓글 줄은 글 번호가 아니라 댓글 번호로 가르고, 눌렀을 때 글로 가려고 글 번호를 찾아 쓴다. 이미지만 올린 댓글은 내용이 없어서 안내 글자를 흐리게 보여 준다 */
  const items = comments.map((comment) => ({
    id: comment.postCommentId,
    main:
      comment.content === undefined ? (
        <ClampText color="text.secondary">이미지만 있는 댓글이에요</ClampText>
      ) : (
        <ClampText>{comment.content}</ClampText>
      ),
    meta: (
      <Typography variant="body2" color="text.secondary" noWrap>
        <Typography component="span" variant="body2" color="secondary">
          RE:
        </Typography>{' '}
        {comment.postTitle} · {formatPostDate(comment.createdAt)}
      </Typography>
    ),
  }));

  const handleOpen = (postCommentId: number) => {
    const target = comments.find((comment) => comment.postCommentId === postCommentId);

    if (target !== undefined) {
      navigate(`/community/${target.postId}`);
    }
  };

  return <ActivityList items={items} onOpen={handleOpen} />;
};

export default UserCommentList;
