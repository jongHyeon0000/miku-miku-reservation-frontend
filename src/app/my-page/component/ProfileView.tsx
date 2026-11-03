import dayjs from 'dayjs';
import { Button, Typography } from '@mui/material';
import ThumbnailUploader from '@/app/common/component/ThumbnailUploader';
import type { ThumbnailChange } from '@/app/common/interface/ThumbnailChange';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { ColumnCard, MediaCard, SectionTitle } from '@/app/common/style/CommonCard.style';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { EndRow, SideColumn, SplitLayout } from '@/app/common/style/CommonLayout.style';
import { LabelText, LabelValueGrid, LabelValueRow, ValueText } from '@/app/common/style/CommonText.style';
import type { UserInfo } from '@/app/auth/interface/UserInfo';
import { styled } from '@mui/material/styles';

interface ProfileViewProps {
  /** 보여 줄 내 정보 */
  user: UserInfo;

  /** 지금 고른 프로필 이미지 변경 사항 */
  thumbnail: ThumbnailChange;

  /** 프로필 이미지 변경 사항이 바뀌었을 때 */
  onThumbnailChange: (change: ThumbnailChange) => void;

  /** 저장 요청 중이면 막는다 */
  loading: boolean;

  /** 저장 버튼 (서버 요청은 페이지가 한다) */
  onSave: () => void;

  /** 프로필 수정 버튼 (창 열기는 페이지가 한다) */
  onEditProfile: () => void;

  /** 비밀번호 변경 버튼 (창 열기는 페이지가 한다) */
  onChangePassword: () => void;
}

/**
 * 내 정보 탭. 왼쪽은 프로필 카드(닉네임, 자기소개)와 계정 카드(아이디, 이메일, 가입일, 비밀번호), 오른쪽은 프로필 이미지 카드(고르면 저장 버튼으로 올린다).
 * 상품 상세와 같은 2:1 배치이고, 프로필 수정, 비밀번호 변경 버튼은 각 카드의 맨 아래 오른쪽, 저장 버튼은 이미지 카드의 맨 아래 오른쪽이다.
 */
const ProfileView = ({ user, thumbnail, onThumbnailChange, loading, onSave, onEditProfile, onChangePassword }: ProfileViewProps) => {
  return (
    <SplitLayout>
      <SideColumn>
        <ColumnCard>
          <SectionTitle variant="h6" component="h3">
            프로필
          </SectionTitle>
          <Info>
            <LabelValueRow>
              <LabelText>닉네임</LabelText>
              <ValueText>{user.name}</ValueText>
            </LabelValueRow>
            <LabelValueRow>
              <LabelText>자기소개</LabelText>
              <Typography component="span">{user.biography}</Typography>
            </LabelValueRow>
          </Info>
          <ButtonRow>
            <TonalButton onClick={onEditProfile}>프로필 수정</TonalButton>
          </ButtonRow>
        </ColumnCard>
        <ColumnCard>
          <SectionTitle variant="h6" component="h3">
            계정
          </SectionTitle>
          <Info>
            <LabelValueRow>
              <LabelText>아이디</LabelText>
              <ValueText>{user.loginId}</ValueText>
            </LabelValueRow>
            <LabelValueRow>
              <LabelText>이메일</LabelText>
              <ValueText>{user.email}</ValueText>
            </LabelValueRow>
            <LabelValueRow>
              <LabelText>가입일</LabelText>
              <ValueText>{dayjs(user.createdAt).format('YYYY.MM.DD')}</ValueText>
            </LabelValueRow>
            <LabelValueRow>
              <LabelText>비밀번호</LabelText>
              <ValueText>••••••••</ValueText>
            </LabelValueRow>
          </Info>
          <ButtonRow>
            <TonalButton onClick={onChangePassword}>비밀번호 변경</TonalButton>
          </ButtonRow>
        </ColumnCard>
      </SideColumn>
      <MediaCard>
        <FieldStack>
          <ThumbnailUploader currentUrl={user.thumbnailUrl} value={thumbnail} onChange={onThumbnailChange} disabled={loading} />
          <EndRow>
            <Button variant="contained" disabled={loading || thumbnail.type === 'none'} onClick={onSave}>
              저장
            </Button>
          </EndRow>
        </FieldStack>
      </MediaCard>
    </SplitLayout>
  );
};

export default ProfileView;

/** ───────── styles ───────── */

/** 정보 줄 사이를 넉넉히 띄운다 */
const Info = styled(LabelValueGrid)(({ theme }) => ({
  rowGap: theme.spacing(2),
}));

/** 카드가 길어져도 변경 버튼 줄은 맨 아래 오른쪽에 붙고, 버튼 사이는 창 아래 버튼 줄(`FormActions`)과 같은 간격을 둔다 */
const ButtonRow = styled(EndRow)(({ theme }) => ({
  gap: theme.spacing(1),
  marginTop: 'auto',
}));
