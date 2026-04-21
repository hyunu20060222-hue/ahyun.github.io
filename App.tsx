/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Theater, 
  Users, 
  Calendar, 
  MapPin, 
  Heart, 
  ChevronRight, 
  Star,
  Quote,
  CloudMoon,
  Sparkles,
  Smile,
  Send,
  MessageSquare,
  User,
  ArrowRight
} from "lucide-react";
import JoinForm from "./components/JoinForm";
import Board from "./components/Board";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Write from "./components/Write";
import About from "./components/About";
import Artists from "./components/Artists";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import { LanguageProvider, useLanguage } from "./lib/LanguageContext";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1503095396549-807059018b4e?auto=format&fit=crop&q=80&w=1920", 
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1920",
];

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function Home() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans">
      {/* Hero Section - Poetic Presence with Auto Slider */}
      <header className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-8 overflow-hidden">
        {/* Automatic Image Slider Background */}
        <div className="absolute inset-0 -z-20 bg-slate-900">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img 
                src={HERO_IMAGES[currentImageIndex]} 
                alt="Theater Atmosphere" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Overlays for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-white -z-10" />

        <motion.div 
          style={{ opacity, scale }}
          className="text-center w-full max-w-5xl relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-10 text-slate-600 text-sm font-bold tracking-[0.4em] uppercase"
          >
            {t('hero_since')}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-7xl md:text-[7.5rem] font-bold mb-12 leading-[1.1] text-slate-900 tracking-tighter"
          >
            <span className="inline-block relative">
              {t('hero_title_1')}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute bottom-4 left-0 h-2 bg-poetic-rose/60 -z-10"
              />
            </span>
            <br />
            <span className="text-sky-700 font-black italic">{t('hero_title_2')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-slate-700 leading-[1.8] mb-16 max-w-2xl mx-auto font-medium break-keep"
          >
            {t('hero_sub_1')}<br />
            {t('hero_sub_2')} <span className="text-slate-900 font-bold">{t('hero_sub_3')}</span>{t('hero_sub_4')}<br />
            {t('hero_sub_5')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/join" className="group px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-lg shadow-2xl shadow-sky-100 hover:shadow-sky-200 transition-all flex items-center gap-3">
              {t('hero_cta_join')} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="px-12 py-5 border border-slate-200 text-slate-500 rounded-full font-medium text-lg hover:bg-slate-50 transition-all">
              {t('hero_cta_about')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Slider Indicator */}
        <div className="absolute bottom-12 flex gap-3">
          {HERO_IMAGES.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${currentImageIndex === i ? "w-8 bg-sky-400" : "w-2 bg-slate-200"}`} 
            />
          ))}
        </div>
      </header>

      {/* Quick Notice Bar Section */}
      <section id="notices" className="bg-white border-b border-slate-100 py-24 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/3">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-6 flex items-center gap-3">
              <Sparkles className="text-rose-400" size={32} /> {t('notice_title')}
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed break-keep italic">
              {t('notice_sub')}
            </p>
            <Link to="/board/notices" className="mt-10 inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-poetic-rose hover:border-poetic-rose transition-all uppercase tracking-tighter text-sm">
              {t('notice_view_all')} <ArrowRight size={18} />
            </Link>
          </div>

          <div className="w-full md:w-2/3 grid gap-5">
            {[
              { id: 3, title: "제 5회 정기공연 오디션 공고", date: "2024.10.28" },
              { id: 2, title: "[필독] 극단 연습실 이용 수칙 안내", date: "2024.10.15" },
            ].map((notice) => (
              <Link 
                key={notice.id}
                to="/board/notices" 
                className="group flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <CloudMoon size={20} />
                  </div>
                  <span className="text-xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors uppercase">{notice.title}</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-sm font-mono text-slate-400">{notice.date}</span>
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-slate-900 group-hover:text-slate-900 transition-all">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Subtle Decorative Gradient */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-poetic-rose/10 rounded-full blur-[100px] -z-10" />
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-40 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-poetic-rose font-bold tracking-[0.4em] uppercase text-xs block mb-6">Schedule</span>
              <h2 className="text-6xl md:text-7xl font-bold text-slate-900 tracking-tighter">{t('section_plans_title')}</h2>
            </div>
            <p className="text-slate-500 text-xl max-w-sm italic font-medium">
              {t('section_plans_sub')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                keyword: t('plan_1_title'),
                sub: t('plan_1_sub'),
                desc: t('plan_1_desc')
              },
              {
                keyword: t('plan_2_title'),
                sub: t('plan_2_sub'),
                desc: t('plan_2_desc')
              },
              {
                keyword: t('plan_3_title'),
                sub: t('plan_3_sub'),
                desc: t('plan_3_desc')
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group theme-card p-14 hover:shadow-2xl hover:shadow-sky-50 transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h3 className="text-5xl font-bold mb-6 text-slate-800 tracking-tighter group-hover:text-sky-500 transition-colors">{plan.keyword}</h3>
                <div className="mb-10 text-xs font-bold text-slate-400 uppercase tracking-widest">{plan.sub}</div>
                <p className="text-slate-700 text-lg leading-loose font-medium mb-12 italic break-keep">
                  {plan.desc}
                </p>
                
                <div className="flex items-center gap-4 text-slate-500 group-hover:text-sky-400 transition-colors">
                  <span className="w-12 h-[1px] bg-current" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Opening Soon</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes (Gallery/Practice Records) */}
      <section id="behind" className="py-40 px-8 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-poetic-rose font-bold tracking-[0.4em] uppercase text-xs block mb-6">Behind the Scenes</span>
            <h2 className="text-6xl font-bold text-slate-900 tracking-tighter">{t('section_behind_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: "rehearsal", title: "뜨거운 연습의 공기", sub: "Acting Rehearsal", icon: <Theater size={32} strokeWidth={1.5} />, color: "text-sky-500" },
              { id: "tech", title: "무대를 만드는 손길", sub: "Stage Tech", icon: <Sparkles size={32} strokeWidth={1.5} />, color: "text-rose-500" },
              { id: "moment", title: "찰나의 진심", sub: "Moment", icon: <Star size={32} strokeWidth={1.5} />, color: "text-purple-500" },
              { id: "backstage", title: "커튼 뒤의 영혼들", sub: "Backstage", icon: <Users size={32} strokeWidth={1.5} />, color: "text-amber-500" },
            ].map((item, idx) => (
              <Link to={`/board/${item.id}`} key={idx}>
                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group theme-card p-10 flex flex-col justify-between h-[300px] border border-slate-100 hover:shadow-2xl transition-all duration-500 bg-white cursor-pointer"
                >
                  <div className={`${item.color} mb-8`}>{item.icon}</div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-2xl tracking-tight mb-2 break-keep">{item.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">{item.sub}</span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Reviews Section */}
      <section id="reviews" className="py-40 px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-xs block mb-6">Audience Voices</span>
              <h2 className="text-6xl md:text-7xl font-bold text-slate-900 tracking-tighter mb-8 italic">{t('section_reviews_title')}</h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed italic break-keep">
                {t('section_reviews_sub')}
              </p>
            </div>
            
            <Link to="/board/reviews">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group p-16 theme-card bg-emerald-50 border-none flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-emerald-100 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform">
                  <MessageSquare size={36} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{t('section_reviews_btn')}</h3>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase">
                  Visit Review Board <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-8 relative">
        <div className="absolute inset-0 bg-poetic-sky -z-10 opacity-40" />
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/40 backdrop-blur-3xl rounded-[60px] p-16 md:p-32 text-center border border-white/60 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-10 tracking-tighter">{t('section_contact_title')}</h2>
              <p className="text-slate-500 text-xl md:text-2xl font-normal mb-16 max-w-2xl mx-auto leading-relaxed italic break-keep">
                {t('section_contact_sub')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link to="/join" className="px-12 py-6 bg-slate-900 text-white rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-300">
                  {t('section_contact_btn')}
                </Link>
                <div className="flex items-center gap-8">
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <Link to="/contact" className="text-slate-400 hover:text-poetic-rose font-bold uppercase tracking-widest text-xs transition-colors border-b border-transparent hover:border-current">
                    Message Us
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-sunlit-gold/20 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Navigation() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-2xl border-b border-white/50">
      <div className="max-w-7xl mx-auto px-8 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-tr from-clear-sky via-poetic-rose to-sunlit-gold rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-100 group-hover:scale-110 transition-transform duration-500">
              <CloudMoon size={24} strokeWidth={2} />
            </div>
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-1 -right-1 text-sunlit-gold"
            >
              <Sparkles size={16} />
            </motion.div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-slate-800 leading-none">하늘연달</span>
            <span className="text-[10px] font-medium text-sky-400 uppercase tracking-[0.3em] leading-none mt-2">Opening the Sky</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-700 tracking-widest uppercase">
          <div className="flex items-center bg-slate-100/50 rounded-full p-1 border border-slate-200">
            <button 
              onClick={() => setLanguage('ko')}
              className={`px-3 py-1 rounded-full text-[10px] transition-all ${language === 'ko' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              KO
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-[10px] transition-all ${language === 'en' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              EN
            </button>
          </div>

          <Link to="/board/notices" className="hover:text-slate-900 transition-all duration-300">{t('nav_notices')}</Link>
          <Link to="/about" className="hover:text-poetic-rose transition-all duration-300">{t('nav_about')}</Link>
          <Link to="/artists" className="hover:text-emerald-500 transition-all duration-300">{t('nav_artists')}</Link>
          <Link to="/#behind" className="hover:text-sky-500 transition-all duration-300">{t('nav_behind')}</Link>
          <Link to="/#reviews" className="hover:text-emerald-500 transition-all duration-300">{t('nav_reviews')}</Link>
          
          {user ? (
            <div className="flex items-center gap-6 pl-6 border-l border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <User size={16} />
                </div>
                <span className="text-slate-900 lowercase font-bold tracking-tight">{user.username}</span>
              </div>
              <button 
                onClick={logout}
                className="text-[10px] text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest"
              >
                {t('nav_logout')}
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-8 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 cursor-pointer">
              {t('nav_login')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <ScrollHandler />
          <div className="min-h-screen selection:bg-rose-100 selection:text-rose-900 font-sans">
            <Navigation />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/join" element={<JoinForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/write/:categoryId" element={<Write />} />
              <Route path="/board/:categoryId" element={<Board />} />
              <Route path="/contact" element={<div className="pt-40 text-center text-slate-400">상세 문의 페이지 준비 중입니다.</div>} />
            </Routes>

          {/* Footer */}
          <footer className="py-24 px-8 bg-slate-900 text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white">
                    <CloudMoon size={24} />
                  </div>
                  <span className="text-3xl font-bold text-white tracking-tighter">하늘연달</span>
                </div>
                <p className="max-w-sm text-lg leading-relaxed italic">
                  청춘의 맑은 숨결이 모여 만드는<br />
                  단 하나의 필연적인 무대.<br />
                  우리는 당신의 하늘이 되고 싶습니다.
                </p>
              </div>
              
              <div className="flex flex-col items-end gap-6 text-xs font-medium tracking-[0.3em] uppercase text-right">
                <span>© 2024 Theater Trouble Haneul-Yeondal</span>
                <div className="flex gap-8">
                  <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                  <span className="hover:text-white cursor-pointer transition-colors">YouTube</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Email</span>
                </div>
                <span className="text-slate-700">Seoul, Korea</span>
              </div>
            </div>
          </footer>
        </div>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}
