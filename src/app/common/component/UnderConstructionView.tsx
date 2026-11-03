import { Typography } from '@mui/material';
import underConstructionImage from '@/assets/common/under-construction.png';
import { StateStack } from '@/app/common/style/CommonState.style';

/**
 * 아직 만드는 중인 화면에 보여 주는 임시 간판 ("개발중" 글자와 이미지). 임시라 이미지 크기는 직접 적었다.
 */
const UnderConstructionView = () => {
  return (
    <StateStack>
      <Typography variant="h2" component="p">
        개발중
      </Typography>
      <img src={underConstructionImage} alt="개발중" style={{ width: '100%', maxWidth: '36rem' }} />
    </StateStack>
  );
};

export default UnderConstructionView;
