/*
* 소개 화면 데모의 원본 상품 20건 (레거시 장부에서 상품 이름과 분류만 가져왔다. 가격, 구매 링크, 날짜는 쓰지 않는다).
* id 는 이미지 파일 이름(src/assets/intro/figures/{id}.jpg)과 같다.
* */
export interface IntroFigureSource {
  /** 이미지 파일 이름과 같은 번호 ("002") */
  id: string;

  /** 장르 */
  genre: string;

  /** 캐릭터. 여럿이면 ", "로 이어 쓴다 */
  character: string;

  /** 형태 (스케일, 넨도로이드) */
  style: string;

  /** 제조사 */
  maker: string;

  /** 판매처 */
  shop: string;

  /** 상품 이름 */
  name: string;
}

export const INTRO_FIGURE_SOURCES: IntroFigureSource[] = [
  { id: '002', genre: '동방프로젝트', character: '레이무, 마리사', style: '스케일', maker: '후류', shop: '네이버스토어', name: '[예약상품 26년 12월 출고] 2종 세트 후류 동방 프로젝트 뮤츄트 피규어 -하쿠레이 레이무--키리사메마리사-' },
  { id: '003', genre: '보컬로이드', character: '하츠네 미쿠', style: '넨도로이드', maker: '굿스마일', shop: '네이버스토어', name: '[특전] 넨도로이드 3068 하츠네 미쿠 메스머라이저Ver. / 보컬로이드' },
  { id: '004', genre: '보컬로이드', character: '카사네 테토', style: '넨도로이드', maker: '굿스마일', shop: '네이버스토어', name: '[특전] 넨도로이드 3069 카사네 테토 메스머라이저Ver. / 보컬로이드' },
  { id: '005', genre: '보컬로이드', character: '하츠네 미쿠', style: '넨도로이드', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 하츠네미쿠x시나모롤 데포르메 피규어 l 보컬로이드' },
  { id: '006', genre: '동방프로젝트', character: '레밀리아 스칼렛', style: '스케일', maker: '노벨 스텔라', shop: '코믹스아트', name: '(공식 파트너샵) 노벨 스텔라(Novel Stella) 1/7스케일 피규어 동방 프로젝트 레밀리아 스칼렛' },
  { id: '007', genre: '보컬로이드', character: '하츠네 미쿠', style: '넨도로이드', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 넨도로이드 하츠네 미쿠 매지컬 큐어 러브 샷 버전 l 보컬로이드' },
  { id: '008', genre: '보컬로이드', character: '하츠네 미쿠', style: '스케일', maker: '후류', shop: '네이버스토어', name: '후류 (FURYU) 보컬로이드 Sweet School Life 피규어 하츠네 미쿠 퓨어ver.' },
  { id: '009', genre: '보컬로이드', character: '하츠네 미쿠', style: '넨도로이드', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 넨도로이드 하츠네 미쿠 16th 생일 버전 l 보컬로이드 (재판)' },
  { id: '010', genre: '보컬로이드', character: '아키타 네루', style: '넨도로이드', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 넨도로이드 아키타 네루 l 보컬로이드' },
  { id: '011', genre: '보컬로이드', character: '하츠네 미쿠', style: '넨도로이드', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 넨도로이드 하츠네 미쿠 모니터링 버전 l 보컬로이드' },
  { id: '012', genre: '보컬로이드', character: '하츠네 미쿠', style: '스케일', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 굿스마일컴퍼니 유키 미쿠x쿠로미 1/7 l 보컬로이드 하츠네 미쿠' },
  { id: '013', genre: '보컬로이드', character: '하츠네 미쿠', style: '넨도로이드', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 넨도로이드 하츠네 미쿠 V6 l 보컬로이드' },
  { id: '014', genre: '보컬로이드', character: '하츠네 미쿠', style: '스케일', maker: 'Lucrea', shop: '코믹스아트', name: '(10월 2주차 입고예정) (메가토레샵한정) 메가하우스 (MEGA HOUSE) Lucrea기동전사 건담 45주년 기념 X 하츠네 미쿠 하츠네 미쿠 X 더블오 건담' },
  { id: '015', genre: '동방프로젝트', character: '시키에이키 야마자나두', style: '스케일', maker: '후류', shop: '네이버스토어', name: '후류 누들스토퍼 동방프로젝트 시키에이키 야마자나두 피규어' },
  { id: '016', genre: '보컬로이드', character: '하츠네 미쿠', style: '스케일', maker: '굿스마일', shop: '네이버스토어', name: '[예약] GS컬렉션 레이싱 미쿠 15주년 랩소디 2010-2025 1/7 l 보컬로이드' },
  { id: '017', genre: '보컬로이드', character: '하츠네 미쿠', style: '스케일', maker: '굿스마일', shop: '네이버스토어', name: '[예약] GS컬렉션 사쿠라 미쿠 굿스마일일러스트콘테스트 버전 1/7 l 보컬로이드' },
  { id: '018', genre: '보컬로이드', character: '하츠네 미쿠', style: '스케일', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 팝업퍼레이드 하츠네 미쿠 데코 미쿠 다크니스 L 사이즈 l 보컬로이드' },
  { id: '019', genre: '보컬로이드', character: '하츠네 미쿠', style: '스케일', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 팝업퍼레이드 하츠네 미쿠 데코 미쿠 라이트니스 L 사이즈 l 보컬로이드' },
  { id: '020', genre: '보컬로이드', character: '카사네 테토', style: '스케일', maker: '굿스마일', shop: '네이버스토어', name: '[예약] 팝업퍼레이드 카사네 테토 SynthesizerV AI버전 L 사이즈 l 보컬로이드' },
  { id: '021', genre: '보컬로이드', character: '카사네 테토', style: '스케일', maker: '후류', shop: '네이버스토어', name: '[예약] 후류 누들스토퍼 카사네 테토 바게트 버전 l 보컬로이드' },
];
