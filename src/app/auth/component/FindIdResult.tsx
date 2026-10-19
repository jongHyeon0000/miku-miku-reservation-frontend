import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { FieldStack } from '@/app/common/style/CommonForm.style';
import { Highlight, LabelText } from '@/app/common/style/CommonText.style';

interface FindIdResultProps {
  /** 찾은 로그인 아이디 */
  loginId: string;
}

/**
 * 아이디 찾기 마지막 단계. 찾은 아이디를 보여 주고 로그인 화면으로 보낸다.
 */
const FindIdResult = ({ loginId }: FindIdResultProps) => {
  return (
    <FieldStack>
      <Typography align="center">
        <LabelText>가입된 아이디는</LabelText>
        <br />
        <Highlight>{loginId}</Highlight>
      </Typography>
      <Button component={RouterLink} to="/login" variant="contained" size="large">
        로그인하러 가기
      </Button>
    </FieldStack>
  );
};

export default FindIdResult;
