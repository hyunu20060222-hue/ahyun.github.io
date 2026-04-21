import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, Sparkles, History, Calendar, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

export default function About() {
  const { t, language } = useLanguage();
  
  const history = [
    { 
      year: "2023.10", 
      event: language === 'ko' ? "청년극단 '하늘연달' 창단" : "Inauguration of Youth Troupe 'Haneul-Yeondal'", 
      desc: language === 'ko' ? "시월의 어느 푸른 날, 연극을 사랑하는 청년들이 모여 무대의 문을 열었습니다." : "On a blue day in October, youth who love theater gathered to open the doors to the stage."
    },
    { 
      year: "2023.12", 
      event: language === 'ko' ? "제1회 정기 워크숍 '숨' 개최" : "1st Regular Workshop 'Breath' Held", 
      desc: language === 'ko' ? "서로의 호흡을 맞추며 팀의 기반을 다지는 첫 걸음을 떼었습니다." : "Took the first step of building the team's foundation by syncing breaths."
    },
    { 
      year: "2024.03", 
      event: language === 'ko' ? "창단 기념 낭독공연 '시월의 독백'" : "Anniversary Reading Performance 'October Monologue'", 
      desc: language === 'ko' ? "관객들과 처음으로 마주하며 목소리에 담긴 진심을 전했습니다." : "Met the audience for the first time and conveyed the sincerity in our voices."
    },
    { 
      year: "2024.07", 
      event: language === 'ko' ? "소극장 페스티벌 초청 공연" : "Small Theater Festival Invitational Performance", 
      desc: language === 'ko' ? "우리만의 색깔이 담긴 소품극으로 지역 예술계에 신선한 울림을 주었습니다." : "Gave a fresh echo to the local art world with short plays containing our own colors." 
    },
    { 
      year: "2024.10", 
      event: language === 'ko' ? "제1회 정기공연 '하늘을 여는 달' 예정" : "1st Main Stage Performance 'The Month the Sky Opens' Scheduled", 
      desc: language === 'ko' ? "창단 1주년을 기념하며 우리가 꿈꾸던 가장 완전한 무대를 준비하고 있습니다." : "To celebrate the 1st anniversary, we are preparing the most complete stage we dreamed of."
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Introduction Section */}
      <section className="pt-48 pb-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-14 flex items-center justify-center gap-3 text-poetic-rose font-black text-sm uppercase tracking-[0.5em]">
              <div className="w-10 h-[2px] bg-current" />
              <span>About Haneul-Yeondal</span>
              <div className="w-10 h-[2px] bg-current" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-16 tracking-tighter leading-none">
              하늘연달. <br />
              <span className="text-sky-400">{t('about_start')}</span>
            </h1>
            
            <div className="space-y-12 text-xl md:text-3xl text-slate-800 leading-relaxed font-sans max-w-4xl mx-auto font-medium break-keep">
              <p>
                {t('about_intro_1')}
              </p>
              <p className="italic text-slate-500 leading-loose text-2xl">
                {t('about_intro_2')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100"
            >
              <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mb-8">
                <Sparkles size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">{t('about_value_1_title')}</h3>
              <p className="text-lg text-slate-600 leading-relaxed break-keep">
                {t('about_value_1_desc')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100"
            >
              <div className="w-16 h-16 bg-rose-50 text-poetic-rose rounded-2xl flex items-center justify-center mb-8">
                <Heart size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">{t('about_value_2_title')}</h3>
              <p className="text-lg text-slate-600 leading-relaxed break-keep">
                {t('about_value_2_desc')}
              </p>
            </motion.div>
          </div>

          <div className="mt-32 text-center max-w-3xl mx-auto">
             <div className="mb-12 inline-block p-4 theme-card border-none bg-white">
                <Star size={32} className="text-sunlit-gold" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-snug text-slate-800 mb-8 tracking-tight break-keep">
                {t('about_quote')}
              </h2>
          </div>
        </div>
      </section>

      {/* History (연혁) Section - Simplified List */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{t('about_history_title')}</h2>
            <div className="text-slate-400 font-bold text-sm tracking-widest uppercase">Our History</div>
          </div>

          <div className="space-y-4">
            {history.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-baseline gap-8 py-6 border-b border-slate-50 group hover:bg-slate-50/50 px-4 transition-all rounded-xl"
              >
                <span className="text-poetic-rose font-mono font-bold text-lg w-24 shrink-0 tracking-tighter">{item.year}</span>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                  <span className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors uppercase">{item.event}</span>
                  <span className="text-slate-400 text-sm font-medium italic break-keep">{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Artist Page */}
          <div className="mt-32 p-12 border-2 border-slate-100 rounded-[40px] text-center bg-slate-50/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t('about_artists_val_title')}</h3>
            <p className="text-slate-500 mb-8 font-medium italic">{t('about_artists_val_sub')}</p>
            <Link to="/artists" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
              {t('about_artists_view')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
