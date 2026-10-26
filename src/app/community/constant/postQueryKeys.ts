/** 커뮤니티 보관 키. all 은 전부, page 는 글 목록 한 쪽, pageAll 은 글 목록 모든 쪽, detail 은 글 상세 한 건, commentList 는 그 글의 댓글 전체 */
export const postKeys = {
  all: ['post'] as const,
  page: (page: number) => [...postKeys.pageAll(), page] as const,
  pageAll: () => [...postKeys.all, 'list'] as const,
  detail: (postId: number) => [...postKeys.all, 'detail', postId] as const,
  commentList: (postId: number) => [...postKeys.all, 'comment-list', postId] as const,
};
