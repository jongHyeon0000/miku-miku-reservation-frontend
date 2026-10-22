# miku-miku-reservation-frontend

개인용 소규모 피규어 예약 구매 장부의 프론트엔드. 백엔드는 별도 저장소(`miku-miku-reservation-backend`, Spring Boot REST)이며 두 프로젝트는 서로 독립적이다. **백엔드는 개발이 끝났다.**

전체 설계(폴더 구조 전체 트리, 페이지/컴포넌트/훅 개수, 라우트, 토큰 흐름, API↔훅 매핑)는 [`doc/frontend-architecture.md`](doc/frontend-architecture.md)가 기준이다. 구현 전에 먼저 읽는다.

## 절대 원칙: 디자인/퍼블리싱 기조(컨벤션)를 유지한다

**이를 위한 1원칙: 모든 신규 디자인/퍼블리싱 작업물은 오직 공통 모듈만을 사용해야 한다. 공통 모듈이 수정/추가/삭제되어야 할 경우는 무조건 허락을 맡는다.**

- 공통 모듈 = `config/theme/theme.ts`와 `app/common/style/Common*.style.tsx`, `app/common/component/`. (전체 디자인 시스템 적용은 2026-10-15 사용자 요청으로 전체 롤백했다. 시안 `doc/mockup-design-system.html`만 남아 있고 코드에는 적용되지 않았다.)
- 새 화면을 짜기 전에 위 파일을 먼저 읽고, 있는 것을 그대로 쓴다. 화면 파일에 색, 모서리, 선, 그림자, 투명도, 글자 스타일을 새로 정의하지 않는다(hex 직접 작성 금지).
- 리팩토링은 2026-10-15에 끝났다(디자인 디버깅은 새 페이지를 만들 때마다 다시 한다). 그 결과로 만든 모듈(`showResult`, `API_CODE`, `HttpStatusCode`, 공통 style, `common/component` 등)은 새 코드에서 **반드시** 쓴다. 같은 일을 하는 것을 따로 만들거나 새 방식을 들여와 컨벤션을 깨지 않는다.
- 필요한 모양이 공통 모듈에 없으면 **직접 만들지 말고 멈추고**, 무엇이 왜 필요한지 설명해 허락을 받은 뒤 공통 모듈에 추가한다. 공통 모듈의 수정과 삭제도 같다.

## 절대 원칙: 코드는 무조건 돌려쓴다. 모듈화가 핵심이다

- 새 코드를 쓰기 전에 같은 일을 하는 컴포넌트, 훅, 스타일, 유틸, 상수가 이미 있는지 **먼저 찾아서** 그것을 쓴다. 찾지 않고 새로 만들지 않는다.
- 같은 모양의 코드를 파일마다 복사해 두지 않는다. 두 번째 복사가 생기는 순간 한 곳으로 모은다(공통 모듈에 넣는 것은 허락을 받는다). 예: 같은 모양의 `FormActions` 스타일을 모달마다 따로 만들지 않는다.
- 페이지는 상태, 훅 호출, 핸들러만 맡는다. 화면은 컴포넌트로, 상태 로직은 훅으로, 계산과 변환은 유틸로, 값(상태, 전이, 탭 같은 목록)은 `constant/`의 한 곳으로 나눈다. 한 컴포넌트에 로직이 쌓이면 모듈로 뺀다.
- 기존 모달, 폼, 목록과 같은 종류의 화면을 만들 때는 그 구조(`DialogTitle`/`DialogContent`/`DialogActions`, `FormBody` 등)를 그대로 따라 한다. 새 방식을 들여오지 않는다.
- 작업이 끝나면 같은 코드가 중복되어 있지 않은지, 이미 있는 모듈을 놔두고 새로 만든 것이 없는지 스스로 점검하고 보고한다.
- **아주 작은 컴포넌트, 아주 작은 퍼블리싱이라도 모듈화되지 않은 것은 절대 금물이다.** 화면 파일 안에 그 화면만 쓰는 모양(`styled()`로 만든 버튼 줄, 간격, 토글, 경고 글 등)을 새로 만들어 두지 않는다. 필요한 모양이 공통에 없으면 직접 만들지 말고 멈추고, 무엇이 왜 필요한지 설명해 허락을 받은 뒤 공통 모듈로 추가한다.
- **자체 디자인 금지.** 색, 모서리, 선, 간격, 글자 크기, 버튼과 입력칸의 모양을 내 판단으로 새로 만들지 않는다. 기존 화면과 공통 모듈이 가진 모양만 쓰고, 기존에 없는 모양(MUI 기본 컴포넌트를 테마 설정 없이 그대로 가져다 쓰는 것 포함)이 필요하면 시안으로 보여 주고 허락을 받는다.
- 분류(category) 5개 축은 같은 것을 복사한 것이 아니라 **서로 다른 엔티티**다. 백엔드가 처음부터 테이블을 나눠 자유롭게 확장하도록 설계했는데(비즈니스 의도), 프론트가 공통 `category` 하나로 뭉갠 것이 날림 구현이었고 그 부채를 2026-10-22에 갚았다. 그래서 축마다 독립 모듈로 둔다. 만들기 전에 이미 있는지 먼저 확인하는 원칙은 그대로다. 한 축에 전용 필드가 생기면 그 축 폴더 안에서만 고친다(`hasXxx` 깃발, 공용 코드 안의 축 이름 분기, 여러 축의 필드가 섞인 만능 타입은 쓰지 않는다).

## 작업 규칙

- 조회(읽기, 검색, 상태 확인)는 자유롭게 한다.
- 파일 생성/수정/삭제, 설치, git 작업, 푸시 등 상태를 바꾸는 작업은 사용자의 명시적인 실행 지시("해줘", "진행해") 없이 실행하지 않는다. 설명 요청에는 설명만 한다.
- **안 쓰는 코드는 바로 삭제하고, 코드는 항상 적게 쓴다.** 작업으로 안 쓰게 된 컴포넌트, 함수, 상수, 속성은 같은 작업에서 지운다. "나중에 쓸 것 같아서" 미리 만들거나 남겨 두지 않는다(필요해지면 그때 만든다). 작업이 끝나면 안 쓰는 export가 남았는지 확인한다.
- 응답은 한국어로 한다.
- 디자인/퍼블리싱은 사용자가 맡기는 영역이다. 기존 디자인 기조를 유지하면서 세부 레이아웃, 색, 간격, 컴포넌트 선택은 알아서 판단한다.
- 설계 선택지는 한 번에 하나씩, 표(A/B/C)로 묻는다. **시안 HTML의 안 이름도 무조건 A, B, C…**이고 가/나/다나 1/2/3을 쓰지 않는다(시안 안에서 묶음이 둘이면 A~F로 이어 붙인다). 시안 안은 4개 이하로 준다. 새 페이지는 코드 전에 시안부터 받는다. 시안의 글자 크기는 앱의 현재 크기를 기준으로 하고, 키울 때도 소폭(약 10~20%)으로 한다. 권장안은 근거와 한계를 정직하게 밝힌다. 사용자는 코드를 직접 읽고 최종 확정한다.
- **한 번 결정을 요청했으면 절대 잊지 않는다.** 사용자가 답하기 전에 "결정할 게 없다", "내가 정했다"로 말을 바꾸거나 요청을 슬쩍 거두지 않는다. 답을 받을 때까지 그 결정은 열려 있는 것이다. 처음부터 컨벤션으로 답이 나오는 것이면 묻지 말고 정해서 알리고, 일단 물었으면 끝까지 받는다.
- **결정을 요청할 때는 한 번에 결정할 수 있게 쓴다.** 안마다 영향받는 **파일 위치와 해당하는 모든 코드 뭉치**를 **as-is(지금)와 to-be(바뀐 뒤)로 나눠** 그대로 보여 준다. 말로 요약하지 않는다. 여러 파일이 의존성으로 얽혀 있으면 **무조건 전부 노출**한다(하나라도 빼지 않는다). **양식은 고정이다**: `## 안 N: 이름` 제목 → `**파일: 경로**` → 글자로 쓴 `현재`와 `바뀐 뒤` 라벨 바로 아래에 각각 코드 블록 하나씩. **코드 블록 안에 `as-is`, `to-be` 같은 주석을 넣지 않는다**(코드처럼 보여 눈에 안 들어온다). 바뀌지 않는 파일은 `바뀌지 않아요`로 한 줄 적고, 마지막에 안별 한 줄 비교와 권장안을 적는다.

## 스택

- React 19 + TypeScript + Vite
- UI: MUI(`@mui/material`, `@mui/icons-material`) + emotion
- 라우팅 `react-router-dom`, HTTP `axios`, 전역 상태 `zustand`, 쿠키 `js-cookie`
- 날짜 선택 `@mui/x-date-pickers` + `dayjs`(`main.tsx`의 `LocalizationProvider`, 한국어), 알림 `sweetalert2`, 애니메이션 `motion`(`motion/react`), 에디터 Tiptap(이미지 포함), HTML 정화 `dompurify`
- **`msw`는 쓰지 않는다.** 백엔드가 완성돼 있어 실서버를 붙인다(의존성 제거 대상).

## 백엔드 연결

- 환경은 **local과 prod 두 가지뿐**이다. dev/development라는 이름과 표현은 쓰지 않는다(`npm run dev`, 빌드 스크립트는 그대로 둔다).
- **local**: `npm run dev`로 뜬 Vite 서버의 프록시가 `/api`, `/uploads`를 `http://localhost:8080`으로 전달한다(브라우저는 5173만 호출). 이 주소는 `vite.config.ts`의 프록시 설정에 직접 적는다(local용 환경 파일은 없다).
- **prod**: axios `baseURL`은 `import.meta.env.VITE_PROD_API_BASE_URL` 하나만 읽는다. 값은 `.env.production`에 넣고(파일 이름은 `npm run build`를 건드리지 않는 한 Vite가 정한 이름), 빌드할 때 JS 안에 박힌다. local에서는 이 변수가 비어 있어서 같은 출처(프록시)로 호출된다. `MODE` 같은 값으로 local/prod를 나누는 분기 코드는 쓰지 않는다.
- 포트는 5173으로 고정한다(`strictPort`). 백엔드 local CORS가 5173만 허용한다.
- 운영 호스팅은 미정이다. `.env.production`에 비밀값을 적지 않는다.
- 업로드 이미지는 서버가 `/uploads/...` 상대 경로로 다룬다. 화면에 그릴 때는 `imageUrl()`로 보정한다. **Tiptap에서 저장되는 HTML의 `src`는 `/uploads/...` 상대 경로를 그대로 유지한다**(절대 경로로 저장하면 서버가 상품에 연결하지 못해 1일 뒤 이미지를 지운다).
- API 계약의 기준은 백엔드 저장소의 `doc/document/api-spec.md`와 백엔드 VO 소스다(이 저장소에는 swagger JSON 사본을 두지 않는다). 레거시 디자인 원본은 같은 저장소의 `doc/document/figure-collection.html`(실제 구매 내역이 들어 있으므로 이 저장소에 복사하지 않는다).
- 설치된 버전이 mycocktail보다 높다(MUI 9.4, TypeScript 6, Vite 8, `motion` 14). mycocktail 패턴(특히 MUI props)은 설치된 버전 기준으로 타입체크와 빌드로 확인하며 따른다.

## 폴더 구조와 컨벤션

직전 프로젝트 `mycocktail-front`의 컨벤션을 따르되, 1000줄급 무거운 컴포넌트와 퍼블리싱 코드는 가져오지 않는다. 관리자/사용자 구분이 없으므로 `app/user/` 단계는 없다.

```
src/
  app/{auth,figure,category,my-page,intro,common}/{page,component,hook,service,interface,constant,utils,...}
  config/{axios,route,theme}
  store/      # zustand: authStore, uiStore, figureViewStore
  utils/      # cookieUtils
```

- import는 `@/` 별칭을 쓰고 **확장자를 생략**한다. 파일은 훅 `.ts`, 컴포넌트/페이지 `.tsx`, PascalCase. 타입은 `import type`.
- Page는 상태, 훅, 핸들러를 담당하고 `XxxListComponent`는 표시 전용, 추가/수정 모달은 `mode: 'insert' | 'edit'`. 컴포넌트 파일은 약 300줄 이내로 유지한다.
- 타입은 `interface/`에 두고 필드마다 JSDoc을 단다. 같은 컴포넌트들이 함께 쓰는 짧은 타입은 한 파일에 둔다(예: `FigureFilter.ts`). 필드가 길거나 다른 기능의 타입은 파일을 나눈다. 한 파일(컴포넌트, 훅)에서만 쓰는 타입과 값이 하나뿐인 상수는 그 파일 맨 위에 둔다. 필드가 1개뿐인 요청 본문은 만들지 않고 인자로 받는다. 요청/응답은 `XxxRequestBody`/`XxxResponseData`. 상태, 결제 방식 등은 `as const` 유니온으로 한 곳에서 정의한다(`erasableSyntaxOnly`라서 enum 불가).
- 폴더 하나에 파일이 10개를 넘으면 화면(페이지) 단위 하위 폴더로 나눈다(예: `figure/component/{list,filter,detail,form,common}`). 한 화면에서만 쓰면 그 화면 폴더, 둘 이상의 화면이 쓰면 `common`, 파일이 1개뿐인 그룹은 폴더를 만들지 않는다.
- 주석은 한글 블록 주석(`/* ... */`), 훅에는 JSDoc.
- **파일은 위에서 아래로 읽히게 쓴다.** 맨 위에 보조 함수와 확인창 글자 블록, 그 아래에 **메인 레이아웃 컴포넌트**(`CategoryPage`), 그 아래에 메인이 부르는 컴포넌트(`CategoryContent`) 순서다. 메인 레이아웃이 아래에 있고 그것이 부르는 컴포넌트가 위에 있으면 읽는 순서가 거꾸로가 되므로 하지 않는다.
- **sweetalert2 확인창에 들어가는 글자만** 파일 맨 위 블록(`DELETE_ALERT` 등)으로 모으고 핸들러에서는 이름으로 부른다(계산이 필요한 글자는 함수 값). 제목, 버튼 이름, 빈 화면 문구, 스낵바 문구 같은 나머지 글자는 JSX나 핸들러에 그대로 쓴다. 단어 하나하나를 옮기지 않는다. `CategoryPage.tsx`가 기준 시안이다.

## 서비스 레이어 (API 호출 훅)

- 위치는 `app/{domain}/service/`, 이름은 `useReadXxx`, `useReadXxxList`, `useCreateXxx`, `useUpdateXxx`, `useDeleteXxx`. 훅 안에서 `useState` + `axios`(`api`) + `try/catch` + `toApiResponse`로 처리한다.
- **조회 훅**은 `{ xxx: ApiResponse | undefined, xxxLoading, fetchReadXxx }`를 반환한다(예: `{ figure, figureLoading, fetchReadFigure }`). 페이지가 `useEffect`나 클릭에서 `fetchReadXxx`를 직접 호출한다.
- **변경 훅**은 `fetchXxx`가 `Promise<ApiResponse>`를 `return`한다. 페이지는 `await` 결과의 `code`로 바로 분기한다(`useLogin` 방식).
- 컴포넌트는 이 반환 형태에만 의존한다. 나중에 react-query로 옮길 때 훅 내부만 바꾸고 반환 형태를 유지한다.
- 분류(카테고리)는 5개 축(판매처, 형태, 시리즈, 장르·캐릭터, 제조사)이 서로를 모르는 독립 모듈이다(`category/{축}/`). 엔드포인트 하나에 훅 하나, 축마다 자기 타입(`XxxItem`, `XxxGroup`, `XxxFormValues`), 목록, 폼 창, 화면을 가진다. `CategoryPage`는 탭과 축 화면 고르기만 하고, 축에 상관없는 것(탭, 축 이름, 스타일)은 `category/common/`에 둔다. 백엔드가 분류 응답의 필드 이름을 통일했으므로(`id`, `groupId`, 상위만 `children`) 훅은 변환 없이 응답을 그대로 담고, 없을 수 있는 `description`, `thumbnailUrl`만 `?`다. 분류 `PUT`/`DELETE`는 응답 데이터가 없으므로 성공 후 목록을 다시 불러온다.
- 서버 결과 코드는 문자열을 직접 쓰지 않고 `API_CODE`(`config/axios/constant/apiCode.ts`)로 비교한다(`res.code !== API_CODE.OK`).
- `ApiResponse`는 `{ code: string; message: string; data: T }`(백엔드가 성공 응답에도 항상 message 를 채우도록 수정 중, 비어 오는 경우는 `toApiResponse`가 상태 코드로 채운다). `DELETE /api/figure?figureIds=`는 `ids.join(',')`로 보낸다(axios 배열 기본 직렬화 `figureIds[]=` 금지).
- 폼은 **`react-hook-form`**으로 관리한다(`useForm`, `mode: 'onTouched'`, `defaultValues`). 검증 표시는 라이브러리 표준 동작을 따른다(칸을 처음 벗어날 때 검사, 이후 입력마다 재검사, 오류는 칸마다 남고, 제출이 막히면 첫 오류 칸에 포커스). 검사 규칙과 문구는 `ValidationUtils`의 **이름 있는 함수**(`validateXxx`)에 두고 폼은 `validate: validateXxx`로 이름만 넘긴다(폼 파일에 화살표 함수나 문구를 쓰지 않는다). 폼 타입이 서버 요청 타입과 다르면 `XxxFormValues`를 따로 두고 `handleValid`로 변환, 같으면 `XxxRequestBody`를 그대로 쓰고 `handleSubmit(onSubmit)`로 넘긴다.
- 입력칸은 **한 칸씩** 쓴다(mycocktail 컨벤션, `map` 금지. 같은 블록이 10~20개 이상 반복되는 경우만 예외). 글자 칸은 `register`를 인라인으로 쓴다: `inputRef={register('이름', { validate }).ref}` 다음 줄에 `{...register('이름', { validate })}`(MUI `TextField`에는 `ref`가 아니라 `inputRef`로 넘긴다. 래퍼 함수는 만들지 않는다. **펼치는 `{...register()}`는 항상 props 맨 마지막**에 둔다. 펼침에 `ref`가 또 들어가 바깥 div에도 붙는데 포커스 이동은 미검증), 자동완성·날짜·에디터는 `Controller`.
- 수정 화면은 상세 데이터를 받은 뒤에 폼(과 Tiptap 에디터)을 렌더링한다(`defaultValues`는 처음 한 번만 반영된다).

## 인증과 토큰

- 토큰(JWT)은 **쿠키**(`js-cookie`, 만료 24시간)에 두고, zustand `authStore`에는 `user`와 `isInitialized`만 둔다.
- `isAuthenticated`는 mycocktail 방식으로 쿠키 토큰 유무와 `user` 존재를 함께 검사한다.
- axios 요청 인터셉터가 쿠키 토큰을 `Authorization: Bearer`로 넣고, 401/403이면 쿠키와 스토어를 비운다. 앱 시작 때 `useInitAuth`가 `GET /api/auth/me`로 `user`를 복원한다.
- 설명 HTML은 `HtmlView` 한 곳에서만 DOMPurify로 정화해 렌더링한다. 다른 곳에서 `dangerouslySetInnerHTML`을 쓰지 않는다.

## 라우트

- `src/config/route/RoutesConfig.tsx`의 `APP_ROUTES` 테이블 하나로 GNB 메뉴와 인증 가드를 만든다(`requireAuth`, `type` 유니온). 목록 렌더링 `key`는 `path`.
- 인증 필요 라우트는 `RequireAuth`로 감싸고, 미로그인이면 `/intro`(소개 화면)로 보내며 원래 경로(`from`)를 유지한다(소개 화면의 로그인 버튼이 `/login`으로 이어서 넘긴다).
- 소개(`/intro`, `app/intro/`)는 장면(한 화면) 7개를 휠, 키보드, 진행 점으로 넘기는 화면이다. 장면의 데모는 실제 상품, 분류 컴포넌트에 목데이터(`intro/constant`, 마감일은 오늘 기준)를 넣어 보여 주고, 장면 틀은 `common/style/CommonScene.style`이다. 상단 메뉴에 `소개` 탭이 있고, 로그인한 사용자는 마지막 `시작하기` 장면이 없다.
- 마이페이지(`/my-page`)는 서브 라우트 없이 한 페이지(`MyPagePage`)에서 탭 상태로 내 정보와 탈퇴를 바꾼다.

## 스타일 규칙

- `.css` 파일을 쓰지 않는다. 스타일은 MUI `styled()`로 정의한다. **`sx`는 어디에도 쓰지 않는다**(ESLint가 막는다). 여러 화면이 같이 쓰는 모양은 `app/common/style/Common*.style.tsx`에 두고 가져다 쓰며, 그 컴포넌트에만 있는 모양은 컴포넌트 파일 맨 아래에 둔다(두 컴포넌트 이상이 같이 쓰는 것만 도메인의 `style/` 폴더에 `Xxx.style.tsx`로 둔다: `figure/style/FigureInfo.style`, `figure/style/FigureFilter.style`. `.style.tsx`를 `component/`에 같이 두지 않는다). 컴포넌트마다 스타일 파일을 만들지 않는다.
- **새 스타일 선언은 금지다.** `styled()`로 새 모양을 정의하거나 공통, 공유 스타일 파일에 새 정의를 추가하는 것은 사용자 허락 없이는 하지 않는다(2026-10-15 확정). 기존 스타일 모듈에 있는 것만 가져다 쓰고, 없으면 멈춘 뒤 필요한 모양과 이유를 설명해 허락을 받는다. 같은 모양이 둘 이상 생기면 공통으로 모으자고 제안한다.
- 공통 스타일 모듈: `CommonLayout`(`Row`, `SpreadRow`, `EndRow`, `SplitLayout`, `SideColumn`), `CommonText`(`Highlight`, `LabelText`, `ValueText`, `BoldText`, `LabelValueGrid`, `LabelValueRow`, `PriceText`, `PriceColumn`), `CommonCard`(`ColumnCard`, `SpreadCard`, `MediaCard`, `Pill`, `SectionTitle`), `CommonMedia`(`FillImage`, `SquareFrame`, `ThumbFrame`, `ThumbAvatar`, `StateIcon`), `CommonForm`(`FormBody`, `DialogFormBody`, `DialogFieldStack`, `FieldStack`, `FormActions`, `EqualToggleGroup`), `CommonState`(`StateStack`), `CommonTabs`(`UnderlineTabs`), `CommonButton`, `CommonPage`, `CommonMotion`, `CommonTooltip`. 새 화면은 먼저 여기서 찾아 쓰고, 없으면 멈추고 허락을 받는다. 폼 모달은 `CategoryFormDialog`처럼 `DialogFormBody` + `DialogTitle`/`DialogContent`(`DialogFieldStack`)/`FormActions` 구조를 따른다.
- `styled-components` 패키지는 쓰지 않는다 (MUI 엔진은 emotion이라 충돌). 같은 역할을 `@mui/material/styles`의 `styled()`로 한다.
- 색/간격/폰트는 `config/theme/theme.ts`의 `createTheme` 한 곳에서 정하고 `CssBaseline`을 쓴다. 컴포넌트에 hex 색을 직접 쓰지 않고 `theme.palette`를 참조한다. Vite 템플릿의 `App.css`, `index.css`는 제거한다.
- **여백, 크기, 위치를 px나 `theme.spacing(n)` 숫자로 짐작해서 맞추지 않는다**(모바일에서 깨진다). 위치가 어긋나면 구조로 푼다(`alignItems: stretch`, `inline-grid` + `gridAutoColumns: 1fr`, 같은 부모의 `gap` 하나). 간격은 같은 종류의 기존 화면(모달, 폼)이 쓰는 값을 그대로 쓰고 새 숫자를 만들지 않는다. 전역 규칙에도 같은 내용이 있다.
- 아이콘은 `@mui/icons-material`(이모지 금지). 아이콘 크기나 간격은 `sx`로 박지 않는다(필요하면 허락을 받아 `styled(Icon)`으로).
- 디자인 기조: 다크 테마(배경 `#100e1a`, 면 `#1b1830`/`#241f3d`), 포인트 골드 `#e8b654`와 핑크 `#ff8fb3`, 경고 `#e8735f`, 폰트 Do Hyeon / Noto Sans KR / JetBrains Mono, 가로 티켓형 카드.
- 알림 구분: 되돌릴 수 없는 동작(삭제, 탈퇴)의 확인은 sweetalert2, 결과 알림은 zustand `uiStore` + 루트 `<GlobalSnackbar/>`. 서버 응답은 `showResult(res)`(결과 코드로 success/warning/error를 자동 선택), 직접 쓴 글자는 `showSnackbar(메시지, severity)`.

## 비즈니스 규칙 (상태 전이)

- 상품 상태는 강제 일방향이다(`CART → UNPURCHASED → (RESERVED) → PURCHASED → DELIVERED`). 전이 때 입력한 값(예약금, 결제일, 잔금 기한 등)은 이후 수정할 수 없고, 틀리면 삭제 후 재등록한다. 백엔드는 수정하지 않는다. 이를 백엔드의 한계로 다시 문제 삼지 않는다.
- 잔금 기한은 선택 입력이다(업체가 나중에 알려 주는 경우가 많음). 상태 전이 모달에서는 저장 직전 sweetalert2 확인창으로 "저장하면 수정할 수 없다"를 알리고, 잔금 기한이 비었으면 마감 알림이 뜨지 않는다는 문단을 추가한다(친근한 존댓말). 문구는 `doc/frontend-architecture.md` 11장.
- 알림의 핵심은 미구매 상품의 예약마감일 임박(2개월 깜빡임, 1개월 모달)이다. 예약완료의 잔금 기한 알림(같은 규칙, 문구는 `URGENT_ALERT`)은 기한을 입력한 상품에서만 동작하는 부가 기능이다.
- 회원 정보 수정 기능은 없다(기본 기능 완료 후 추가 예정). 마이페이지는 한 라우트(`/my-page`)에서 탭 상태로 내 정보(프로필 이미지 올리기, 지우기 포함)와 탈퇴만 둔다. `/me` 조회는 `useReadMe` 한 곳에서 한다.

## 약속: 완성 전까지 사용하지 않는 라이브러리

`@tanstack/react-query`는 **설치만 해 두었고, 프로젝트가 완성되기 전까지 코드에서 사용하지 않는다.** 레거시 방식(위 서비스 레이어 컨벤션)으로 먼저 개발해 불편함을 겪어 본 뒤, 완성 후 마이그레이션하며 익히는 것이 목적이다. 사용자가 먼저 마이그레이션을 제안하기 전에는 쓰자고 제안하거나 import하지 않는다. (`react-hook-form`은 2026-10-14에 지금부터 쓰기로 바뀌었다.)

## git 규칙

- 이 저장소의 git 작성자는 `--local` 설정이다: `Yoo Jong Hyeon <68066071+jongHyeon0000@users.noreply.github.com>`. 전역 설정은 회사 이메일이므로 건드리지 않는다.
- **Claude는 `git commit`, `git add`(스테이징), `git push`를 하지 않는다.** 커밋은 사용자가 단계적으로 직접 한다. 작업이 끝나면 바뀐 파일 목록만 알려 준다.
- (사용자가 직접 커밋할 때를 위해) 커밋 전에 작성자/커밋터 이메일이 noreply인지 확인한다.
- 커밋 메시지에 Claude 공동 작성자(`Co-Authored-By`) 줄을 넣지 않는다.
- 원격: `origin` = https://github.com/jongHyeon0000/miku-miku-reservation-frontend (공개). 비밀값을 파일에 적지 않는다.

## 진행 현황

- [x] Vite 프로젝트 생성, GitHub 공개 레포 생성, 라이브러리 설치(미커밋)
- [x] 백엔드 개발 완료, 프론트 전체 설계 문서 작성 (`doc/frontend-architecture.md`)
- [x] 백엔드 `api-spec.md` 대조 완료(경로 일치, 영향 사항은 설계 문서 5장)
- [x] 설계 결정 확정과 문서(`doc/frontend-architecture.md`, `CLAUDE.md`) 반영
- [x] `.iml`은 `.gitignore`에 있고 이름 변경 때 추적을 해제했다
- [x] MSW 제거, 환경 세팅(1번), 화면 뼈대와 통신 기반(2번), 페이지 이동과 상단 메뉴(3번)
- [x] 4번 회원가입·로그인(`react-hook-form` 적용)
- [x] 5-1 카테고리 관리(C안 2열 배치, 줄무늬 목록, (i) 설명 툴팁, 시안 `doc/mockup-category-*.html`, 메모리 feedback-design-taste)
- [x] 5-2 분류 썸네일(추가/수정 창에서 고르기·끌어다 놓기, 저장 버튼에서 POST/PUT 후 응답 id로 PUT 썸네일, 목록에는 썸네일 표시 안 함(A안), 검증은 `validateThumbnailFiles`)
- [ ] 상품 작업(번호는 이 단계 안에서만): 1 목록 → 2 상세(`HtmlView` 포함) → 3 등록·수정 폼(에디터 제외) → 4 에디터(Tiptap) → 5 마감 알림·선택 모드 → 6 상태 전이. 상품 데이터는 백엔드로 넣어 둠. **상품 1번(목록), 2번(상세), 3번(등록·수정 폼), 4번(에디터, 도구줄 A안) 구현 완료(브라우저 확인 전, 시안 `doc/mockup-detail-confirmed.html`, `doc/mockup-form.html`, `doc/mockup-editor.html`). 5번은 선택 모드(일괄 삭제), 카드 진입 애니메이션(motion), 마감 임박 모달, 예약마감일 깜빡임까지 구현 완료. 5번에서 남은 것은 예약완료의 잔금 기한 알림이며 6번(상태 전이)이 끝난 뒤 마지막에 반드시 한다(사용자 확정). 6번(상태 전이)은 목록 일괄(상태 변경 모드, 탭별), 상세 개별(예약금, 잔금 기한 포함)까지 구현 완료(브라우저 확인 전, 시안 `doc/mockup-status.html`, `doc/mockup-status-all.html`). 다음은 5번에서 남은 잔금 기한 알림**
- [x] 마이페이지(내 정보, 프로필 이미지, 탈퇴) 구현 완료(브라우저 확인 전, 시안 `doc/mockup-mypage.html` C안)
- [x] 예약완료 잔금 기한 알림 구현 완료(미구매와 같은 규칙, 문구만 다름, 다시 보지 않기는 탭별)
- [ ] 마무리 점검
