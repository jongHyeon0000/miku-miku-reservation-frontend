import type { KeyboardEvent } from 'react';
import { Box, Typography } from '@mui/material';
import PageNumbers from '@/app/common/component/PageNumbers';
import { PagerRow, Panel, RowBox } from '@/app/common/style/CommonList.style';
import { ThumbAvatar } from '@/app/common/style/CommonMedia.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { imageUrl } from '@/app/common/utils/CommonUtils';
import type { PostListItem } from '@/app/community/interface/PostListItem';
import { styled } from '@mui/material/styles';

interface PostListTableProps {
  /** 이번 쪽의 글 (삭제, 탈퇴한 글 포함) */
  items: PostListItem[];

  /** 지금 보는 쪽 (1부터) */
  page: number;

  /** 전체 쪽 수 */
  totalPages: number;

  /** 정상 글을 눌렀을 때 */
  onOpen: (postId: number) => void;

  /** 쪽 번호를 눌렀을 때 */
  onChangePage: (page: number) => void;
}

/* 삭제, 탈퇴한 글 자리에 보여 줄 문구 */
const HIDDEN_TEXT = {
  DELETED: '[삭제된 게시글입니다.]',
  WITHDRAWN: '[탈퇴 처리된 사용자의 게시물입니다.]',
};

/* 작성일을 '2026.10.26' 모양으로 */
const formatPostDate = (createdAt: string): string => {
  const dateOnly = createdAt.slice(0, 10);
  return dateOnly.replace(/-/g, '.');
};

/**
 * 게시판 목록. 작성자 사진, 제목, 닉네임, 조회, 날짜 칸을 모든 줄이 같이 써서 세로로 맞는다.
 * 삭제, 탈퇴한 글은 문구와 날짜만 보이고 누를 수 없다.
 */
const PostListTable = ({ items, page, totalPages, onOpen, onChangePage }: PostListTableProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, postId: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onOpen(postId);
  };

  return (
    <Panel>
      <PostGrid>
        {items.map((item) => {
          if (item.status !== 'NORMAL') {
            return (
              <HiddenRow key={item.postId}>
                <TitleCell color="text.secondary">{HIDDEN_TEXT[item.status]}</TitleCell>
                <DateCell variant="body2" color="text.secondary">
                  {formatPostDate(item.createdAt)}
                </DateCell>
              </HiddenRow>
            );
          }

          return (
            <PostRow
              key={item.postId}
              role="button"
              tabIndex={0}
              onClick={() => onOpen(item.postId)}
              onKeyDown={(event) => handleKeyDown(event, item.postId)}
            >
              <AuthorAvatar size="sm" src={imageUrl(item.authorThumbnailUrl)} />
              <TitleCell>
                {item.title}
                <CommentCount>[{item.commentCount}]</CommentCount>
              </TitleCell>
              <Typography variant="body2" color="text.secondary">
                {item.authorName}
              </Typography>
              <ViewCell variant="body2" color="text.secondary">
                조회 {item.viewCount}
              </ViewCell>
              <DateCell variant="body2" color="text.secondary">
                {formatPostDate(item.createdAt)}
              </DateCell>
            </PostRow>
          );
        })}
      </PostGrid>
      {totalPages > 1 && (
        <PagerRow>
          <PageNumbers page={page} totalPages={totalPages} onChange={onChangePage} />
        </PagerRow>
      )}
    </Panel>
  );
};

/* 칸 5개(사진, 제목, 닉네임, 조회, 날짜)를 정한다. 사진, 닉네임, 조회, 날짜 칸 폭은 그 쪽에서 가장 긴 내용에 맞춰진다 */
const PostGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto auto auto',
});

/* 한 줄이 PostGrid 의 칸을 그대로 쓰게 한다 */
const PostRow = styled(RowBox)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '1 / -1',
  columnGap: theme.spacing(2),
  cursor: 'pointer',
}));

/* 눌리지 않는 줄. 마우스를 올려도 줄무늬 색이 그대로다 */
const HiddenRow = styled(PostRow)(({ theme }) => ({
  cursor: 'default',
  '&:nth-of-type(odd):hover': { backgroundColor: theme.palette.rowStripe },
  '&:nth-of-type(even):hover': { backgroundColor: theme.palette.rowStripeAlt },
}));

/* 작성자 사진. 줄 가장자리와 제목에 조금 더 붙인다(줄 안쪽 여백과 칸 간격을 같은 값만큼 줄임. -1 은 너무 붙고 0 은 너무 멀어서 중간) */
const AuthorAvatar = styled(ThumbAvatar)(({ theme }) => ({
  marginInline: theme.spacing(-0.5),
}));

/* 제목은 두 번째 칸이다(삭제, 탈퇴한 줄은 사진 칸이 비어 있다). 한 줄로 보여 주고, 길면 …로 줄인다 */
const TitleCell = styled(Typography)({
  gridColumn: 2,
  minWidth: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}) as typeof Typography;

const CommentCount = styled(Highlight)(({ theme }) => ({
  marginLeft: theme.spacing(0.75),
  fontSize: '0.8125rem',
}));

const ViewCell = styled(Typography)({
  textAlign: 'right',
}) as typeof Typography;

/* 날짜는 항상 다섯 번째 칸이다(삭제, 탈퇴한 줄은 닉네임과 조회 칸이 비어 있다) */
const DateCell = styled(Typography)({
  gridColumn: 5,
}) as typeof Typography;

export default PostListTable;
