import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronLeft, Instagram, Mail, Star, Sparkles, User } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

const getArtists = (language: string) => [
  {
    name: language === 'ko' ? "김하늘" : "Haneul Kim",
    nickname: language === 'ko' ? "스카이" : "Sky",
    role: language === 'ko' ? "대표 / 연출" : "CEO / Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    desc: language === 'ko' ? "모든 이야기는 하늘 아래에서 시작된다고 믿는 연출가입니다." : "A director who believes all stories begin under the sky.",
    tags: ["Director", "Founder"]
  },
  {
    name: language === 'ko' ? "이연달" : "Yeondal Lee",
    nickname: language === 'ko' ? "문샤인" : "Moonshine",
    role: language === 'ko' ? "상임 배우" : "Lead Actor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    desc: language === 'ko' ? "무대 위의 찰나를 위해 삶의 모든 순간을 연기하는 배우입니다." : "An actor who performs every moment of life for a split second on stage.",
    tags: ["Actor", "Lead"]
  },
  {
    name: language === 'ko' ? "박진심" : "Jinsim Park",
    nickname: language === 'ko' ? "하트" : "Heart",
    role: language === 'ko' ? "무대 디자인" : "Stage Design",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400",
    desc: language === 'ko' ? "공간에 숨을 불어넣어 진심이 닿는 세계를 만듭니다." : "Creates a world where sincerity reaches by breathing life into space.",
    tags: ["Designer", "Artist"]
  },
  {
    name: language === 'ko' ? "최영혼" : "Yeonghon Choi",
    nickname: language === 'ko' ? "소울" : "Soul",
    role: language === 'ko' ? "극작 / 배우" : "Playwright / Actor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    desc: language === 'ko' ? "말할 수 없는 것들을 글로 적고, 몸으로 표현합니다." : "Writes down the unspeakable and expresses them through the body.",
    tags: ["Writer", "Actor"]
  },
  {
    name: language === 'ko' ? "정새벽" : "Saebyeok Jeong",
    nickname: language === 'ko' ? "던" : "Dawn",
    role: language === 'ko' ? "조명 감독" : "Lighting Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    desc: language === 'ko' ? "어둠 속에서 가장 따뜻한 빛을 찾아내는 마술사입니다." : "A magician who finds the warmest light in the darkness.",
    tags: ["Lighting", "Staff"]
  },
  {
    name: language === 'ko' ? "강무대" : "Mudae Kang",
    nickname: language === 'ko' ? "스테이지" : "Stage",
    role: language === 'ko' ? "무대 감독" : "Stage Manager",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    desc: language === 'ko' ? "무대 뒤의 질서를 수호하며 공연의 완성을 돕는 든든한 버팀목입니다." : "A reliable support who guards the order behind the stage and helps complete the performance.",
    tags: ["Director", "Captain"]
  }
];

export default function Artists() {
  const { t, language } = useLanguage();
  const artists = getArtists(language);
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-48 pb-32 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Link to="/about" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-12 text-xs font-bold uppercase tracking-[0.2em]">
              <ChevronLeft size={16} /> Back to About
            </Link>
            
            <div className="mb-10 flex items-center justify-center gap-3 text-poetic-rose font-black text-sm uppercase tracking-[0.5em]">
              <div className="w-10 h-[2px] bg-current" />
              <span>Our Artists</span>
              <div className="w-10 h-[2px] bg-current" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-12">
              {language === 'ko' ? (
                <>무대 위의 <br /><span className="text-sky-400 underline decoration-sky-100 decoration-8 underline-offset-8">빛나는 영혼들.</span></>
              ) : (
                <><span className="text-sky-400 underline decoration-sky-100 decoration-8 underline-offset-8">Shining Souls</span> <br />on the Stage.</>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto italic break-keep leading-relaxed">
              {t('artist_sub')}
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-poetic-rose/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-50 rounded-full blur-[100px] translate-x-1/3" />
      </section>

      {/* Artists Grid */}
      <section className="pb-48 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {artists.map((artist, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-[40px] mb-8 shadow-2xl shadow-slate-100 border border-slate-50 relative">
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <div className="flex gap-4 mb-4">
                      <Instagram size={20} className="text-white hover:text-sky-400 cursor-pointer transition-colors" />
                      <Mail size={20} className="text-white hover:text-sky-400 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        {artist.name} <span className="text-slate-300 text-base font-medium italic">({artist.nickname})</span>
                      </h3>
                      <div className="text-poetic-rose font-bold text-xs uppercase tracking-widest mt-1">{artist.role}</div>
                    </div>
                    <div className="flex gap-2">
                      {artist.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-slate-400 border border-slate-100 px-2 py-1 rounded-full uppercase tracking-tighter">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-slate-500 font-medium italic break-keep leading-relaxed group-hover:text-slate-800 transition-colors">
                    "{artist.desc}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join Call to Action */}
          <div className="mt-48 text-center bg-slate-900 rounded-[60px] py-24 px-8 relative overflow-hidden">
            <Sparkles className="absolute top-10 left-10 text-white/10" size={80} />
            <Star className="absolute bottom-10 right-10 text-white/10" size={60} />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">{t('artist_join_title')}</h2>
              <p className="text-slate-400 text-lg mb-12 font-medium">{t('artist_join_sub')}</p>
              <Link to="/join" className="px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-sky-400 hover:text-white transition-all shadow-2xl">
                {t('artist_join_btn')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
