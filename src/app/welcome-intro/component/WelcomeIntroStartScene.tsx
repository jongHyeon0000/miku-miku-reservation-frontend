import { Link as RouterLink, useNavigate, type Location } from 'react-router-dom';
import { Button, Link, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { TonalButton } from '@/app/common/style/CommonButton.style';
import { Row } from '@/app/common/style/CommonLayout.style';
import { cardEnterVariants } from '@/app/common/style/CommonMotion.style';
import { Scene, SceneDesc, SceneEyebrow, SceneTitle } from '@/app/common/style/CommonScene.style';
import { StateStack } from '@/app/common/style/CommonState.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import useSceneActive from '@/app/common/hook/useSceneActive';

interface WelcomeIntroStartSceneProps {
  /** 가려던 주소(RequireAuth 가 넘긴 것). 로그인 화면으로 이어서 넘긴다 */
  from?: Location;
}

/**
 * 마지막 장면. 로그인, 회원가입으로 가는 길과 아이디 찾기, 비밀번호 재설정 링크.
 */
const WelcomeIntroStartScene = ({ from }: WelcomeIntroStartSceneProps) => {
  const { sceneRef, active } = useSceneActive();
  const navigate = useNavigate();
  const animate = active ? 'visible' : 'hidden';

  const handleSignup = () => navigate('/signup');

  return (
    <Scene ref={sceneRef}>
      <StateStack>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={0}>
          <SceneEyebrow variant="mono" align="center">
            START
          </SceneEyebrow>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={1}>
          <SceneTitle variant="h3" component="h2" align="center">
            지금 <Highlight>시작해 볼까요?</Highlight>
          </SceneTitle>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={2}>
          <SceneDesc align="center">
            계정이 있으시면 로그인하고,
            <br />
            처음이시라면 이메일 인증으로 가입해 주세요.
          </SceneDesc>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={3}>
          <Row>
            <Button variant="contained" size="large" component={RouterLink} to="/login" state={{ from }}>
              로그인
            </Button>
            <TonalButton size="large" onClick={handleSignup}>
              회원가입
            </TonalButton>
          </Row>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={4}>
          <Typography color="text.secondary">
            <Link component={RouterLink} to="/find-id">
              아이디 찾기
            </Link>
            {' · '}
            <Link component={RouterLink} to="/reset-password">
              비밀번호 재설정
            </Link>
          </Typography>
        </motion.div>
      </StateStack>
    </Scene>
  );
};

export default WelcomeIntroStartScene;
