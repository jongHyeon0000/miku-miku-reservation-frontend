import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import FindIdPage from '@/app/auth/page/FindIdPage';
import LoginPage from '@/app/auth/page/LoginPage';
import ResetPasswordPage from '@/app/auth/page/ResetPasswordPage';
import SignupPage from '@/app/auth/page/SignupPage';
import CategoryPage from '@/app/category/common/page/CategoryPage';
import PostDetailPage from '@/app/community/page/PostDetailPage';
import PostFormPage from '@/app/community/page/PostFormPage';
import PostListPage from '@/app/community/page/PostListPage';
import FigureDetailPage from '@/app/figure/page/FigureDetailPage';
import FigureFormPage from '@/app/figure/page/FigureFormPage';
import FigureListPage from '@/app/figure/page/FigureListPage';
import MyPagePage from '@/app/my-page/page/MyPagePage';
import IntroPage from '@/app/intro/page/IntroPage';
import NotFoundPage from '@/app/common/page/NotFoundPage';

/** 라우트 종류. gnb 는 상단 메뉴에 나오는 라우트 */
type RouteKind = 'root' | 'gnb' | 'intro' | 'login' | 'signup' | 'find-id' | 'reset-password' | 'figure' | 'community-post' | 'my-page' | 'not-found';

type RouteType = {
  path: string;
  nameKr: string;
  element: ReactNode;
  type: RouteKind;
  /** true 면 로그인한 사용자만 들어갈 수 있다 */
  requireAuth: boolean;
};

/*
* 상단 메뉴(GNB)와 로그인 검사가 이 표 하나를 같이 쓴다.
* 마이페이지는 탭을 화면 상태로 바꾸므로 서브 라우트가 없다.
* */
export const APP_ROUTES: readonly RouteType[] = [
  { path: '/', nameKr: '홈', element: <Navigate to="/figures" replace />, type: 'root', requireAuth: false },

  { path: '/login', nameKr: '로그인', element: <LoginPage />, type: 'login', requireAuth: false },
  { path: '/signup', nameKr: '회원가입', element: <SignupPage />, type: 'signup', requireAuth: false },
  { path: '/find-id', nameKr: '아이디 찾기', element: <FindIdPage />, type: 'find-id', requireAuth: false },
  { path: '/reset-password', nameKr: '비밀번호 재설정', element: <ResetPasswordPage />, type: 'reset-password', requireAuth: false },

  { path: '/figures', nameKr: '상품', element: <FigureListPage />, type: 'gnb', requireAuth: true },
  { path: '/figures/new', nameKr: '상품 등록', element: <FigureFormPage mode="insert" />, type: 'figure', requireAuth: true },
  { path: '/figures/:figureId', nameKr: '상품 상세', element: <FigureDetailPage />, type: 'figure', requireAuth: true },
  { path: '/figures/:figureId/edit', nameKr: '상품 수정', element: <FigureFormPage mode="edit" />, type: 'figure', requireAuth: true },

  { path: '/categories', nameKr: '카테고리', element: <CategoryPage />, type: 'gnb', requireAuth: true },
  { path: '/community', nameKr: '커뮤니티', element: <PostListPage />, type: 'gnb', requireAuth: true },
  { path: '/community/new', nameKr: '글 쓰기', element: <PostFormPage mode="insert" />, type: 'community-post', requireAuth: true },
  { path: '/community/:postId', nameKr: '게시글 상세', element: <PostDetailPage />, type: 'community-post', requireAuth: true },
  { path: '/community/:postId/edit', nameKr: '글 수정', element: <PostFormPage mode="edit" />, type: 'community-post', requireAuth: true },

  { path: '/intro', nameKr: '소개', element: <IntroPage />, type: 'intro', requireAuth: false },

  { path: '/my-page', nameKr: '마이페이지', element: <MyPagePage />, type: 'my-page', requireAuth: true },

  { path: '*', nameKr: '찾을 수 없음', element: <NotFoundPage />, type: 'not-found', requireAuth: false },
] as const;
