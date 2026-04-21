import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { Mail, Lock, CloudMoon, ChevronLeft, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-8">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-poetic-rose opacity-20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-poetic-sky opacity-20 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-8 text-xs font-bold uppercase tracking-[0.2em]">
          <ChevronLeft size={16} /> Back to Home
        </Link>

        <div className="bg-white rounded-[40px] p-10 md:p-14 shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-tr from-sky-400 to-rose-400 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-sky-100">
              <CloudMoon size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">하늘연달 로그인</h1>
            <p className="text-slate-400 text-sm font-medium italic">우리의 무대로 돌아오세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-sky-50 focus:border-sky-200 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-sky-50 focus:border-sky-200 transition-all"
                />
              </div>
            </div>

            {error && <p className="text-rose-500 text-xs font-bold text-center mt-4">{error}</p>}

            <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-200 mt-4">
              로그인 <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-sm font-medium">
              아직 계정이 없으신가요?{" "}
              <Link to="/signup" className="text-sky-500 font-bold hover:underline underline-offset-4">회원가입</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
