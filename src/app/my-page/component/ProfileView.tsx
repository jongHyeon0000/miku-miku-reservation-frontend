import dayjs from 'dayjs';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { ColumnCard, SectionTitle } from '@/app/common/style/CommonCard.style';
import { LabelText, ValueText } from '@/app/common/style/CommonText.style';
import type { UserInfo } from '@/app/auth/interface/UserInfo';
import { styled } from '@mui/material/styles';

interface ProfileViewProps {
  /** 보여 줄 내 정보 */
  user: UserInfo;

  /** 비밀번호 변경 버튼 (창 열기는 페이지가 한다) */
  onChangePassword: () => void;
}

/**
 * 내 정보 탭. 계정 카드: 아이디, 이메일, 가입일, 비밀번호(표시 전용, 오른쪽 끝에 변경 버튼).
 * 닉네임, 자기소개, 프로필 이미지는 위의 프로필 머리가 보여 준다.
 */
const ProfileView = ({ user, onChangePassword }: ProfileViewProps) => {
  return (
    <ColumnCard>
      <SectionTitle variant="h6" component="h3">
        계정
      </SectionTitle>
      <div>
        <AccountRow>
          <LabelText>아이디</LabelText>
          <ValueText>{user.loginId}</ValueText>
        </AccountRow>
        <AccountRow>
          <LabelText>이메일</LabelText>
          <ValueText>{user.email}</ValueText>
        </AccountRow>
        <AccountRow>
          <LabelText>가입일</LabelText>
          <ValueText>{dayjs(user.createdAt).format('YYYY.MM.DD')}</ValueText>
        </AccountRow>
        <AccountRow>
          <LabelText>비밀번호</LabelText>
          <ValueText>••••••••</ValueText>
          <TonalButton onClick={onChangePassword}>변경</TonalButton>
        </AccountRow>
      </div>
    </ColumnCard>
  );
};

export default ProfileView;

/** ───────── styles ───────── */

/** 이름표, 값, 오른쪽 끝 버튼을 한 줄에 두고 줄 사이에 가는 선을 긋는다 (첫 줄은 선 없음) */
const AccountRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '6rem 1fr auto',
  alignItems: 'center',
  columnGap: theme.spacing(2),
  padding: theme.spacing(1.5, 0),
  borderTop: `1px solid ${theme.palette.lineSubtle}`,
  '&:first-of-type': {
    paddingTop: 0,
    borderTop: 0,
  },
}));
