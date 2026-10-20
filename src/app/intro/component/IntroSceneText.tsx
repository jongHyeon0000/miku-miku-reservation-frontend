import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cardEnterVariants } from '@/app/common/style/CommonMotion.style';
import { SceneEyebrow, SceneText, SceneTitle } from '@/app/common/style/CommonScene.style';

interface IntroSceneTextProps {
  /** 장면이 화면에 들어와 있는지. 들어오면 글이 차례로 떠오르고 나가면 숨는다 */
  active: boolean;

  /** 큰 제목 위의 작은 번호와 이름 (예: "01 · 용도") */
  eyebrow: string;

  /** 큰 제목 */
  title: ReactNode;

  /** 설명 글들 (SceneDesc) */
  children: ReactNode;
}

/**
 * 장면의 설명 영역. 작은 제목, 큰 제목, 설명 글이 위에서부터 차례로 떠오른다.
 */
const IntroSceneText = ({ active, eyebrow, title, children }: IntroSceneTextProps) => {
  const animate = active ? 'visible' : 'hidden';

  return (
    <SceneText>
      <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={0}>
        <SceneEyebrow variant="mono">{eyebrow}</SceneEyebrow>
      </motion.div>
      <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={1}>
        <SceneTitle variant="h3" component="h2">
          {title}
        </SceneTitle>
      </motion.div>
      <motion.div variants={cardEnterVariants} initial="hidden" animate={animate} custom={2}>
        <SceneText>{children}</SceneText>
      </motion.div>
    </SceneText>
  );
};

export default IntroSceneText;
