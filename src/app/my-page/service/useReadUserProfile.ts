import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios/AxiosConfig';
import type { ApiResponse } from '@/config/axios/interface/ApiResponse';
import { toApiResponse } from '@/config/axios/utils/toApiResponse';
import type { UserProfile } from '@/app/auth/interface/UserProfile';
import { userProfileKeys } from '@/app/my-page/constant/userProfileQueryKeys';

/**
 * 타인 프로필 조회 훅 (GET /api/user/{userId})
 * 사용자마다 결과가 따로 보관된다. 없거나 탈퇴한 사용자면 404 가 온다. enabled 가 false 면 읽지 않는다(내 프로필이라 마이페이지로 보낼 때).
 */
const useReadUserProfile = (userId: number, enabled: boolean) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: userProfileKeys.detail(userId),
    enabled: enabled,
    queryFn: async (): Promise<ApiResponse<UserProfile | null>> => {
      try {
        const res = await api.get<ApiResponse<UserProfile | null>>(`/api/user/${userId}`);
        return res.data;
      } catch (err) {
        return toApiResponse<UserProfile>(err);
      }
    },
  });

  const fetchReadUserProfile = async (): Promise<void> => {
    await refetch();
  };

  return { userProfile: data, userProfileLoading: isLoading, fetchReadUserProfile };
};

export default useReadUserProfile;
