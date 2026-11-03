export interface UpdateProfileRequestBody {
  /** 닉네임 (앞뒤 공백을 뺀 1~20자) */
  name: string;

  /** 자기소개 (앞뒤 공백을 뺀 300자 이하). 비우면 지워진다 */
  biography: string;
}
