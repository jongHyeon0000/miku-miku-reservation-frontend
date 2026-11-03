export interface UserInfo {
  /** 계정 id */
  userId: number;

  /** 로그인 아이디 (영문, 숫자 4~30자) */
  loginId: string;

  /** 이메일 */
  email: string;

  /** 닉네임 (1~20자) */
  name: string;

  /** 프로필 이미지 주소 ('/uploads/...'). 없으면 필드가 오지 않는다 */
  thumbnailUrl?: string;

  /** 자기소개 (300자 이하). 비어 있으면 필드가 오지 않는다 */
  biography?: string;

  /** 쓴 글 수 (삭제, 탈퇴 처리된 글은 세지 않는다). 0이어도 필드는 항상 온다 */
  postCount: number;

  /** 쓴 답변(댓글과 답글) 수 (삭제, 탈퇴 처리된 것과 삭제된 글에 단 것은 세지 않는다). 0이어도 필드는 항상 온다 */
  commentCount: number;

  /** 가입 일시 */
  createdAt: string;

  /** 수정 일시 */
  updatedAt: string;
}
