import { Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import type { UserInfo } from '@/app/auth/interface/UserInfo';
import EmptyView from '@/app/common/component/EmptyView';
import ErrorView from '@/app/common/component/ErrorView';
import LoadingOverlay from '@/app/common/component/loading/LoadingOverlay';
import { EndRow } from '@/app/common/style/CommonLayout.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import useReadUserPostList from '@/app/community/service/useReadUserPostList';
import { formatPostDate, toPostListSearchParams } from '@/app/community/utils/PostUtils';
import { DEFAULT_POST_SEARCH_TYPE } from '@/app/community/constant/postSearchTypes';
import ActivityList from '@/app/my-page/component/ActivityList';
import { API_CODE } from '@/config/axios/constant/apiCode';

interface UserPostListProps {
  /** 글을 보여 줄 사용자 (id 로 읽고, 이름과 글 수는 글 전체 보기에 쓴다) */
  user: UserInfo;
}

/**
 * 프로필의 최근 글 탭. 탭이 열릴 때 읽고, 줄을 누르면 그 글로 간다.
 * 목록 맨 아래 오른쪽에 글 전체 보기가 있고, 누르면 커뮤니티에서 이 사용자의 글만 본다.
 */
const UserPostList = ({ user }: UserPostListProps) => {
  const navigate = useNavigate();
  const { userPostList, userPostListLoading, fetchReadUserPostList } = useReadUserPostList(user.userId, true);

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

  /* 커뮤니티 목록 주소는 커뮤니티가 쓰는 변환 함수로 만든다(검색 없이 1쪽, 작성자 조건만) */
  const handleOpenAll = () => {
    const searchParams = toPostListSearchParams({
      page: 1,
      searchType: DEFAULT_POST_SEARCH_TYPE,
      keyword: '',
      authorId: user.userId,
      authorName: user.name,
    });
    navigate(`/community?${new URLSearchParams(searchParams).toString()}`);
  };

  const footer = (
    <EndRow>
      <Button endIcon={<ArrowForwardIcon />} onClick={handleOpenAll}>
        글 전체 보기 ({user.postCount})
      </Button>
    </EndRow>
  );

  return <ActivityList items={items} onOpen={(postId) => navigate(`/community/${postId}`)} footer={footer} />;
};

export default UserPostList;
