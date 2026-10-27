import { motion } from 'motion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { cardEnterVariants, getRollTransition, rollAnimate } from '@/app/common/style/CommonMotion.style';
import { FillImage, ThumbFrame } from '@/app/common/style/CommonMedia.style';
import { Scene, SceneDesc, SceneTitle } from '@/app/common/style/CommonScene.style';
import { Highlight } from '@/app/common/style/CommonText.style';
import { INTRO_IMAGES } from '@/app/intro/constant/introImages';
import useSceneActive from '@/app/intro/hook/useSceneActive';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * 첫 장면. 제목과 한 줄 소개가 떠오르고, 아래에서 이미지가 오른쪽에서 왼쪽으로 끊김 없이 흐른다.
 */
const IntroHero = () => {
  const { sceneRef, active } = useSceneActive();
  const animate = active ? 'visible' : 'hidden';

  return (
    <HeroScene ref={sceneRef}>
      <Head>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={0}>
          <SceneTitle variant="h2" component="h1" align="center">
            여기저기 흩어진 장바구니,
            <br />
            <Highlight>이제 한곳에서 관리해요</Highlight>
          </SceneTitle>
        </motion.div>
        <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={1}>
          <SceneDesc align="center">예약 구매와 배송 일정을 보기쉽게 등록/관리하는 장부 시스템 이에요.</SceneDesc>
        </motion.div>
      </Head>

      <RollWindow>
        <RollTrack animate={rollAnimate} transition={getRollTransition(INTRO_IMAGES.length)}>
          {[...INTRO_IMAGES, ...INTRO_IMAGES].map((src, index) => (
            <RollTile key={index}>{src ? <FillImage src={src} alt="" /> : <ImageOutlinedIcon color="disabled" fontSize="large" />}</RollTile>
          ))}
        </RollTrack>
      </RollWindow>

      <Hint animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
        아래로 스크롤
        <ExpandMoreIcon fontSize="small" />
      </Hint>
    </HeroScene>
  );
};

export default IntroHero;

/** ───────── styles ───────── */

/** 제목, 이미지 줄을 세로로 쌓고 이미지 줄은 화면 가로를 가득 쓴다 */
const HeroScene = styled(Scene)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(5),
  paddingLeft: 0,
  paddingRight: 0,
}));

const Head = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0, 3),
}));

/** 양쪽 끝으로 갈수록 이미지가 옅어진다 */
const RollWindow = styled(Box)({
  width: '100%',
  overflow: 'hidden',
  maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
});

const RollTrack = styled(motion.div)({
  display: 'flex',
  width: 'max-content',
});

/** 사이 간격은 gap 이 아니라 오른쪽 여백으로 둔다 (같은 목록 두 벌의 길이가 정확히 절반이 되어 끊기지 않는다) */
const RollTile = styled(ThumbFrame)(({ theme }) => ({
  flex: 'none',
  width: 'clamp(9rem, 18vw, 14rem)',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.cardRadius,
}));

const Hint = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2.5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));
