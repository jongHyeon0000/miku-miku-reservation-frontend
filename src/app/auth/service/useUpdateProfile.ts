import { useState } from 'react';
import { api } from '@/config/axios/AxiosConfig';
import { API_CODE } from '@/config/axios/constant/apiCode';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import { useAuthStore } from '@/store/authStore';
import type { UpdateProfileRequestBody } from '@/app/auth/interface/UpdateProfileRequestBody';
import type { UserInfo } from '@/app/auth/interface/UserInfo';

/**
 * 프로필(닉네임, 자기소개) 수정 훅 (PATCH /api/auth/profile, 로그인한 상태)
 * 두 값을 통째로 교체하고 한 번에 저장된다(한쪽이 400이면 둘 다 저장되지 않는다).
 * 응답이 바뀐 내 정보(`/me`와 같은 모양)라서 성공하면 authStore 의 user 를 이 값으로 바꾼다(내 정보를 다시 읽지 않는다).
 */
const useUpdateProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser);

  const fetchUpdateProfile = async (body: UpdateProfileRequestBody): Promise<ApiResponse<UserInfo | null>> => {
    setLoading(true);
    try {
      const res = await api.patch<ApiResponse<UserInfo>>('/api/auth/profile', body);

      if (res.data.code === API_CODE.OK) {
        setUser(res.data.data);
      }

      return res.data;
    } catch (err) {
      return toApiResponse<UserInfo>(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfileLoading: loading, fetchUpdateProfile };
};

export default useUpdateProfile;
