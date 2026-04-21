import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ko" | "en";

interface Translations {
  [key: string]: {
    ko: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_notices: { ko: "공지사항", en: "Notices" },
  nav_about: { ko: "극단 소개", en: "About" },
  nav_artists: { ko: "아티스트", en: "Artists" },
  nav_behind: { ko: "연습 기록", en: "Records" },
  nav_reviews: { ko: "관객 후기", en: "Reviews" },
  nav_login: { ko: "로그인", en: "Login" },
  nav_logout: { ko: "로그아웃", en: "Logout" },

  // Board Categories
  cat_rehearsal: { ko: "뜨거운 연습의 공기", en: "Air of Passionate Rehearsal" },
  cat_tech: { ko: "무대를 만드는 손길", en: "Hands Creating the Stage" },
  cat_moment: { ko: "찰나의 진심", en: "Moment of Sincerity" },
  cat_backstage: { ko: "커튼 뒤의 영혼들", en: "Souls Behind the Curtain" },
  cat_reviews: { ko: "관객의 울림", en: "Audience Echoes" },
  cat_notices: { ko: "하늘연달 공지사항", en: "Haneul-Yeondal Notices" },
  
  // Hero
  hero_since: { ko: "시월의 하늘이 처음 열린 날부터", en: "Since the Sky Opened in October" },
  hero_title_1: { ko: "청년극단", en: "Youth Troupe" },
  hero_title_2: { ko: "하늘연달", en: "Haneul-Yeondal" },
  hero_sub_1: { ko: "우리는 차가운 도시의 소음 속에서,", en: "Amidst the cold noise of the city," },
  hero_sub_2: { ko: "당신의 마음 가장 깊은 곳에 닿을", en: "reaching the deepest parts of your heart" },
  hero_sub_3: { ko: "따뜻한 문장", en: "warm sentences" },
  hero_sub_4: { ko: "을 찾습니다.", en: "we seek." },
  hero_sub_5: { ko: "하늘연달의 무대는 당신의 계절이 시작되는 곳입니다.", en: "Haneul-Yeondal's stage is where your season begins." },
  hero_cta_join: { ko: "우리의 계절", en: "Our Season" },
  hero_cta_about: { ko: "극단 이야기", en: "Troupe Story" },
  
  // Notice Section
  notice_title: { ko: "공지사항", en: "Notices" },
  notice_sub: { ko: "하늘연달의 찬란한 소식들을 이곳에서 가장 먼저 전해드립니다.", en: "Be the first to hear the brilliant news of Haneul-Yeondal here." },
  notice_view_all: { ko: "전체 공지사항 보기", en: "View All Notices" },

  // Home Sections
  section_plans_title: { ko: "프로젝트.", en: "Projects." },
  section_plans_sub: { ko: "우리가 함께 걸어갈 길 위에는 찬란한 새벽빛이 기다리고 있습니다.", en: "Brilliant dawn light awaits on the path we walk together." },
  
  plan_1_title: { ko: "워크숍.", en: "Workshop." },
  plan_1_sub: { ko: "Acting & Workshop", en: "Acting & Workshop" },
  plan_1_desc: { ko: "무대 위의 배우들만이 아닌, 무대 뒤의 영혼들이 서로의 온기를 확인하는 정기 워크숍입니다.", en: "A regular workshop where not just actors, but the souls behind the curtain check each other's warmth." },
  
  plan_2_title: { ko: "낭독공연.", en: "Reading." },
  plan_2_sub: { ko: "Reading Performance", en: "Reading Performance" },
  plan_2_desc: { ko: "활자 속에 갇혀 있던 감정들이 처음으로 공기를 타고 당신의 귓가에 닿는 낭독의 밤입니다.", en: "A night of reading where emotions trapped in print first ride the air to reach your ears." },
  
  plan_3_title: { ko: "정기공연.", en: "Main Stage." },
  plan_3_sub: { ko: "Main Stage Performance", en: "Main Stage Performance" },
  plan_3_desc: { ko: "시월의 하늘처럼 높고 푸른 무대. 우리가 꿈꾸던 가장 완전한 세계를 당신에게 선물합니다.", en: "A stage high and blue like the October sky. We present to you the most complete world we dreamed of." },

  section_behind_title: { ko: "연습의 기록.", en: "Records." },
  section_reviews_title: { ko: "관객의 울림.", en: "Audience Echoes." },
  section_reviews_sub: { ko: "무대 위에서 보낸 우리의 진심이 당신의 삶 속에서 어떤 조각으로 남았는지 들려주세요.", en: "Please tell us how our sincerity sent from the stage remains a fragment in your life." },
  section_reviews_btn: { ko: "관객 후기 게시판", en: "Review Board" },

  section_contact_title: { ko: "단원 모집.", en: "Recruitment." },
  section_contact_sub: { ko: "나만의 작은 방 안에서 혼자 웅얼거리던 당신의 문장들이 커다란 무대 위에서 빛나는 별이 되는 경험. 그 여정의 시작을 하늘연달과 함께하세요.", en: "The experience of your sentences, once muttered alone in your small room, becoming shining stars on a grand stage. Join Haneul-Yeondal for the start of that journey." },
  section_contact_btn: { ko: "입단 신청하기", en: "Apply to Join" },

  // Common
  write: { ko: "글쓰기", en: "Write" },
  back_to_list: { ko: "목록으로 돌아가기", en: "Back to List" },
  close: { ko: "닫기", en: "Close" },
  search: { ko: "검색", en: "Search" },
  search_placeholder: { ko: "제목이나 내용 검색", en: "Search title or content" },
  
  // About Page
  about_start: { ko: "우리의 이야기.", en: "Our Story." },
  about_intro_1: { ko: "'하늘연달'이라는 이름은 단순히 시간을 뜻하지 않습니다. 그것은 침묵하던 열망이 하늘을 향해 처음으로 고개를 드는 순간, 그 찰나의 진심을 무대 위에 펼쳐내겠다는 약속입니다.", en: "The name 'Haneul-Yeondal' doesn't just mean time. It's a promise to spread that moment of sincerity on stage, when silenced aspirations first lift their heads toward the sky." },
  about_intro_2: { ko: "연습실의 공기는 무겁고 때로는 불안하지만, 우리는 그 안에서 가장 빛나는 찰나를 기다립니다. 서투르지만 맑은, 우리의 첫 숨이 당신에게 닿기를 바랍니다.", en: "The air in the practice room is heavy and sometimes anxious, but we wait for the most brilliant moment within it. We hope our first breath, though clumsy but clear, reaches you." },
  about_value_1_title: { ko: "섬세함", en: "Delicacy" },
  about_value_1_desc: { ko: "작은 눈빛 하나, 손끝의 가녀린 떨림 하나에 담긴 우주를 포착합니다. 우리는 관객이 놓치기 쉬운 아주 사소한 감정의 선까지 세밀하게 예술로 복원하여 무대 위로 옮겨냅니다.", en: "We capture the universe contained in a single small look or a delicate tremble of a fingertip. We meticulously restore even the most minor lines of emotion that audiences might miss and move them onto the stage." },
  about_value_2_title: { ko: "진실함", en: "Sincerity" },
  about_value_2_desc: { ko: "화려한 연출과 기교보다, 우리 내면의 가장 깊고 흔들리는 마음의 진실을 마주하는 용기를 믿습니다. 거짓 없는 연기로 관객의 마음에 닿는 가장 따뜻한 체온의 무대를 지향합니다.", en: "More than flashy direction and technique, we believe in the courage to face the truths of our deepest, shaking hearts. We aim for a stage with the warmest human temperature that reaches the audience's heart through honest acting." },
  about_quote: { ko: "우리의 무대는 차가운 기술이 아닌, 당신의 체온으로 완성됩니다.", en: "Our stage is completed not by cold technology, but by your body temperature." },
  about_history_title: { ko: "연혁.", en: "History." },
  about_artists_val_title: { ko: "함께하는 아티스트들", en: "Artists with us" },
  about_artists_val_sub: { ko: "무대 위와 아래에서 찬란한 빛을 발하는 우리의 아티스트들을 소개합니다.", en: "Introducing our artists who shine brilliantly on and off the stage." },
  about_artists_view: { ko: "아티스트 보기", en: "View Artists" },

  // Artist Page
  artist_title: { ko: "빛나는 영혼들.", en: "Shining Souls." },
  artist_sub: { ko: "우리는 서로 다른 색깔을 가지고 있지만, 함께 무대 위에 서는 순간 하나의 별자리가 됩니다.", en: "We have different colors, but the moment we stand on stage together, we become a single constellation." },
  artist_join_title: { ko: "당신의 빛나는 재능도 우리의 무대가 될 수 있습니다.", en: "Your brilliant talent can also be our stage." },
  artist_join_sub: { ko: "하늘연달은 언제나 새로운 아티스트의 숨결을 기다립니다.", en: "Haneul-Yeondal is always waiting for the breath of new artists." },
  artist_join_btn: { ko: "하늘연달 단원 신청하기", en: "Apply to Join Haneul-Yeondal" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("haneul_lang");
    return (saved as Language) || "ko";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("haneul_lang", lang);
  };

  const t = (key: string) => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
