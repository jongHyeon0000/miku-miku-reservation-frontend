import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Typography } from '@mui/material'
import { TonalButton } from '@/app/common/style/CommonButton.style'
import { FieldStack } from '@/app/common/style/CommonForm.style'
import { Row } from '@/app/common/style/CommonLayout.style'
import {
  Scene,
  SceneDemo,
  SceneDesc,
  SceneDot,
  SceneDots,
  SceneEyebrow,
  SceneInner,
  SceneScroller,
  SceneText,
  SceneTitle,
} from '@/app/common/style/CommonScene.style'
import { StateStack } from '@/app/common/style/CommonState.style'
import { Highlight } from '@/app/common/style/CommonText.style'

/** 견본 이름은 실제로 쓰이는 곳(화면 > 위치 > 요소)이다. 소개 장면 틀을 새로 쓰거나 쓰는 곳이 바뀌면 여기도 같이 고친다 */
const meta: Meta = {
  title: '공통 스타일/소개 장면 [CommonScene.style.tsx]',
}

export default meta

type Story = StoryObj

/**
 * 소개 화면 설명 영역(src/app/intro/component/IntroSceneText.tsx)과 장면 두 열(IntroCategoryScene 등)의 모양.
 * 왼쪽에 작은 제목, 큰 제목, 설명 글이 쌓이고 오른쪽에 데모가 온다. 좁은 화면에서는 한 열이 된다
 */
export const IntroTwoColumnScene: Story = {
  name: '소개 화면 > 장면 > 설명과 데모 두 열',
  render: () => (
    <Scene>
      <SceneInner>
        <SceneText>
          <SceneEyebrow variant="mono">01 · 분류</SceneEyebrow>
          <SceneTitle variant="h3" component="h2">
            분류를 <Highlight>내 방식대로</Highlight> 정리해요
          </SceneTitle>
          <SceneDesc>판매처, 형태, 시리즈를 따로 관리할 수 있어요.</SceneDesc>
          <SceneDesc>
            <Highlight>자주 쓰는 템플릿</Highlight>으로 한 번에 등록해요.
          </SceneDesc>
        </SceneText>
        <SceneDemo>
          <FieldStack>
            <Typography variant="h6">샘플 데모 영역</Typography>
            <TonalButton size="small">눌러 볼 수 없어요</TonalButton>
          </FieldStack>
        </SceneDemo>
      </SceneInner>
    </Scene>
  ),
}

/** 소개 화면 상태 전이 장면(src/app/intro/component/IntroStatusScene.tsx). 폭이 넓은 데모라서 설명 아래에 데모를 놓는 한 열(wide) */
export const IntroWideScene: Story = {
  name: '소개 화면 > 장면 > 설명 아래 데모 한 열',
  render: () => (
    <Scene>
      <SceneInner wide>
        <SceneText>
          <SceneEyebrow variant="mono">04 · 상태 전이</SceneEyebrow>
          <SceneTitle variant="h3" component="h2">
            등록한 상품을 <Highlight>자유롭게</Highlight> 관리해요
          </SceneTitle>
          <SceneDesc>
            <Highlight>장바구니 → 미구매 → 예약완료 → 구매완료 → 배송완료</Highlight>
          </SceneDesc>
        </SceneText>
        <SceneDemo>
          <FieldStack>
            <Typography variant="h6">샘플 넓은 데모 영역</Typography>
            <Typography color="text.secondary">탭과 버튼 줄처럼 폭이 넓은 데모가 들어가요.</Typography>
          </FieldStack>
        </SceneDemo>
      </SceneInner>
    </Scene>
  ),
}

/**
 * 소개 화면 마지막 장면(src/app/intro/component/IntroStartScene.tsx)과 첫 장면(IntroHero.tsx)의 가운데 정렬 모양.
 * 설명 틀(SceneInner) 없이 장면 안에 제목과 글을 가운데로 쌓는다
 */
export const IntroCenterScene: Story = {
  name: '소개 화면 > 마지막 장면 > 가운데 정렬',
  render: () => (
    <Scene>
      <StateStack>
        <SceneEyebrow variant="mono" align="center">
          시작
        </SceneEyebrow>
        <SceneTitle variant="h3" component="h2" align="center">
          지금 <Highlight>시작해 볼까요?</Highlight>
        </SceneTitle>
        <SceneDesc align="center">
          계정이 있으시면 로그인하고,
          <br />
          처음이시라면 이메일 인증으로 가입해 주세요.
        </SceneDesc>
        <Row>
          <Button variant="contained" size="large">
            로그인
          </Button>
          <TonalButton size="large">회원가입</TonalButton>
        </Row>
      </StateStack>
    </Scene>
  ),
}

/**
 * 소개 화면(src/app/intro/page/IntroPage.tsx)의 스크롤 영역. 장면들이 세로로 쌓이고 한 장면이 영역 높이를 가득 채운다.
 * 높이(viewHeight)는 쓰는 쪽이 재서 넘기며, 여기서는 견본용 숫자를 넘긴다. 스크롤바는 숨겨져 있어 휠로 넘겨 본다
 */
export const IntroScroller: Story = {
  name: '소개 화면 > 전체 > 장면 스크롤 영역',
  render: () => (
    <SceneScroller viewHeight={window.innerHeight}>
      <Scene>
        <SceneTitle variant="h3" component="h2" align="center">
          첫 번째 장면
        </SceneTitle>
      </Scene>
      <Scene>
        <SceneTitle variant="h3" component="h2" align="center">
          두 번째 장면
        </SceneTitle>
      </Scene>
    </SceneScroller>
  ),
}

/**
 * 소개 화면(src/app/intro/page/IntroPage.tsx)의 오른쪽 장면 진행 점.
 * 묶음은 화면 오른쪽 가장자리에 고정되므로 이 견본에서도 미리보기 창 오른쪽 끝에 붙는다. 첫 점이 지금 장면(포인트 색)이다
 */
export const IntroDots: Story = {
  name: '소개 화면 > 오른쪽 > 진행 점',
  render: () => (
    <SceneDots>
      <SceneDot type="button" active title="첫 화면" aria-label="첫 화면" />
      <SceneDot type="button" active={false} title="분류" aria-label="분류" />
      <SceneDot type="button" active={false} title="등록" aria-label="등록" />
      <SceneDot type="button" active={false} title="검색" aria-label="검색" />
    </SceneDots>
  ),
}
