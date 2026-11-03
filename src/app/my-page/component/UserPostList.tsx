import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { Highlight } from '@/app/common/style/CommonText.style';
import useReadUserPostList from '@/app/community/service/useReadUserPostList';
import { formatPostDate } from '@/app/community/utils/PostUtils';
import ActivityList from '@/app/my-page/component/ActivityList';
import { API_CODE } from '@/config/axios/constant/apiCode';

interface UserPostListProps {
  /** 글을 보여 줄 사용자 id */
  userId: number;
}

/**
 * 프로필의 최근 글 탭. 탭이 열릴 때 읽고, 줄을 누르면 그 글로 간다.
 */
const UserPostList = ({ userId }: UserPostListProps) => {
  const navigate = useNavigate();
  const { userPostList, userPostListLoading, fetchReadUserPostList } = useReadUserPostList(userId, true);

  if (userPostListLoading) {
    return <LoadingOverlay open />;
  }

  if (userPostList === undefined || userPostList.code !== API_CODE.OK || userPostList.data === null) {
    const message = userPostList === undefined ? '글을 불러오지 못했어요' : userPostList.message;
    return <ErrorView message={message} onRetry={fetchReadUserPostList} />;
  }

  const posts = userPostList.data;

  if (posts.length === 0) {
    return <EmptyView message="작성한 글이 없어요" />;
  }

  const items = posts.map((post) => ({
    id: post.postId,
    main: <Typography noWrap>{post.title}</Typography>,
    meta: (
      <Typography variant="body2" color="text.secondary" noWrap>
        조회 {post.viewCount} · 댓글 <Highlight>{post.commentCount}</Highlight> · {formatPostDate(post.createdAt)}
      </Typography>
    ),
  }));

  return <ActivityList items={items} onOpen={(postId) => navigate(`/community/${postId}`)} />;
};

export default UserPostList;
