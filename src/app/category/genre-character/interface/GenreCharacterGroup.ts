import type { GenreCharacterItem } from '@/app/category/genre-character/interface/GenreCharacterItem';

/** 장르·캐릭터 상위 한 건 (하위 목록 포함) */
export interface GenreCharacterGroup extends GenreCharacterItem {
  /** 하위 분류 목록 (없으면 빈 배열) */
  children: GenreCharacterItem[];
}
