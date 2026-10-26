/** 글과 댓글의 상태. NORMAL 이 아니면 서버가 내용을 보내지 않고 자리만 남긴다 */
export type PostStatus = 'NORMAL' | 'DELETED' | 'WITHDRAWN';

/** 내용을 가린 상태(작성자가 삭제했거나 탈퇴함) */
export type PostHiddenStatus = Exclude<PostStatus, 'NORMAL'>;
