import React from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";

export default function JoinForm() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-poetic-sky px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/60 backdrop-blur-3xl p-12 rounded-[50px] shadow-2xl text-center border border-white"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tighter">신청 완료</h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            하늘연달의 새로운 계절에 <br />
            함께해주셔서 감사합니다. <br />
            검토 후 곧 연락드리겠습니다.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all"
          >
            홈으로 돌아가기
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="text-poetic-rose font-bold tracking-[0.4em] uppercase text-xs block mb-6">Recruitment</span>
          <h1 className="text-6xl font-bold text-slate-900 mb-8 tracking-tighter italic">단원 모집.</h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed break-keep">
            나만의 작은 방 안에서 혼자 웅얼거리던 당신의 문장들이 <br />
            커다란 무대 위에서 빛나는 별이 되는 경험을 시작하세요.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Basic Info */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">이름</label>
              <input 
                required
                type="text" 
                placeholder="성함을 입력하세요"
                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all text-slate-800"
              />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">연락처</label>
              <input 
                required
                type="tel" 
                placeholder="010-0000-0000"
                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all text-slate-800"
              />
            </div>
          </div>

          {/* Section 2: Interest */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">지원 분야</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["배우", "연출", "작가", "무대/스태프"].map((role) => (
                <label key={role} className="relative group cursor-pointer">
                  <input type="checkbox" className="absolute opacity-0" />
                  <div className="py-4 text-center border border-slate-200 rounded-2xl group-hover:border-sky-400 transition-all text-slate-500 group-has-[:checked]:bg-sky-50 group-has-[:checked]:border-sky-400 group-has-[:checked]:text-sky-600 font-bold">
                    {role}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Motivation */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">지원 동기 및 포부</label>
            <textarea 
              required
              rows={6}
              placeholder="당신의 연극에 대한 열정을 자유롭게 들려주세요."
              className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all text-slate-800 resize-none"
            />
          </div>

          <div className="pt-10">
            <button 
              type="submit"
              className="w-full py-6 bg-slate-900 text-white rounded-full font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-4"
            >
              제출하기 <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
