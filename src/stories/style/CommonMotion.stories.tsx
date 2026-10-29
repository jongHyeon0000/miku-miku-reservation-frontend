import type { Meta, StoryObj } from '@storybook/react-vite'
import { motion } from 'motion/react'
import { ColumnCard } from '@/app/common/style/CommonCard.style'
import { Row } from '@/app/common/style/CommonLayout.style'
import { LabelText, LabelValueGrid, LabelValueRow } from '@/app/common/style/CommonText.style'
import { SceneTitle } from '@/app/common/style/CommonScene.style'
import { blinkAnimate, blinkTransition, cardEnterVariants, getRollTransition, rollAnimate } from '@/app/common/style/CommonMotion.style'
import imageA from '@/assets/intro/figures/002.jpg'
import imageB from '@/assets/intro/figures/005.jpg'
import imageC from '@/assets/intro/figures/006.jpg'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 움직임 값을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/움직임 [CommonMotion.style.ts]',
}

export default meta

type Story = StoryObj

/** 상품 목록(figure/component/list/FigureListComponent.tsx)의 카드 진입. 줄 순서(index)대로 조금씩 늦게 아래에서 떠오른다. 화면을 새로고침하면 다시 보인다 */
export const CardEnter: Story = {
  name: '상품 목록 > 카드 > 진입',
  render: () => (
    <>
      {[0, 1, 2].map((index) => (
        <motion.div key={index} variants={cardEnterVariants} initial="hidden" animate="visible" custom={index}>
          <ColumnCard>샘플 카드 {index + 1}</ColumnCard>
        </motion.div>
      ))}
    </>
  ),
}

/** 소개 화면 장면 글(common/component/CommonSceneTextBlock.tsx, WelcomeIntroHero.tsx, WelcomeIntroStartScene.tsx)의 진입. 줄마다 custom 번호로 차례로 떠오른다 */
export const SceneTextEnter: Story = {
  name: '소개 > 장면 > 글 진입',
  render: () => (
    <>
      <motion.div variants={cardEnterVariants} initial="hidden" animate="visible" custom={0}>
        <SceneTitle variant="h3" component="h2">
          첫 번째 줄
        </SceneTitle>
      </motion.div>
      <motion.div variants={cardEnterVariants} initial="hidden" animate="visible" custom={1}>
        <SceneTitle variant="h3" component="h2">
          두 번째 줄
        </SceneTitle>
      </motion.div>
    </>
  ),
}

/** 상품 목록 카드와 상세의 마감일(figure/component/common/FigureDeadlineText.tsx). 마감이 임박하면 날짜가 깜빡인다 */
export const DeadlineBlink: Story = {
  name: '상품 목록 > 카드 > 마감일 깜빡임',
  render: () => (
    <LabelValueGrid>
      <LabelValueRow>
        <LabelText>예약마감일</LabelText>
        <motion.span animate={blinkAnimate} transition={blinkTransition}>
          2026.12.15
        </motion.span>
      </LabelValueRow>
    </LabelValueGrid>
  ),
}

/** 소개 화면 맨 위(welcome-intro/component/WelcomeIntroHero.tsx)의 이미지 롤링. 같은 목록을 두 번 이어 붙인 줄이 왼쪽으로 끊김 없이 흐른다. 앱에서는 틀이 넘친 부분을 잘라 보이지 않게 한다 */
export const ImageRolling: Story = {
  name: '소개 > 맨 위 > 이미지 롤링',
  render: () => {
    const images = [imageA, imageB, imageC]
    return (
      <motion.div animate={rollAnimate} transition={getRollTransition(images.length)}>
        <Row>
          {[...images, ...images].map((src, index) => (
            <img key={index} src={src} alt="" width="20%" />
          ))}
        </Row>
      </motion.div>
    )
  },
}
