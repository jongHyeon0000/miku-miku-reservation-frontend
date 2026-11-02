import { Typography } from '@mui/material';
import underConstructionImage from '@/assets/stats/under-construction.png';
import { PageContainer } from '@/app/common/style/CommonPage.style';
import { StateStack } from '@/app/common/style/CommonState.style';

/**
 * 통계 화면 (/statistics). 아직 만드는 중이라 임시 간판(이미지와 "개발중" 글자)만 보여 준다. 임시라 이미지 크기는 직접 적었다.
 */
const StatsPage = () => {
  return (
    <PageContainer>
      <StateStack>
        <Typography variant="h2" component="p">
          개발중
        </Typography>
        <img src={underConstructionImage} alt="개발중" style={{ width: '100%', maxWidth: '36rem' }} />
      </StateStack>
    </PageContainer>
  );
};

export default StatsPage;
