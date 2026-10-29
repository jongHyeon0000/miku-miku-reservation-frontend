import { Typography } from '@mui/material';
import { PageContainer } from '@/app/common/style/CommonPage.style';
import { StateStack } from '@/app/common/style/CommonState.style';

/**
 * 패치내역 화면 (/patch-notes). 아직 만드는 중이라 안내 문구만 보여 준다.
 */
const PatchNotePage = () => {
  return (
    <PageContainer>
      <StateStack>
        <Typography color="text.secondary">개발중이에요~</Typography>
      </StateStack>
    </PageContainer>
  );
};

export default PatchNotePage;
