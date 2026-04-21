import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import { ChevronLeft, Send, PenTool, Type, FileText, Sparkles, Lock, ShieldCheck, EyeOff, Image as ImageIcon, X } from "lucide-react";

export default function Write() {
  const { categoryId } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const CATEGORY_MAP: Record<string, { title: string; color: string }> = {
    rehearsal: { title: t('cat_rehearsal'), color: "text-sky-600" },
    tech: { title: t('cat_tech'), color: "text-rose-600" },
    moment: { title: t('cat_moment'), color: "text-purple-600" },
    backstage: { title: t('cat_backstage'), color: "text-amber-600" },
    reviews: { title: t('cat_reviews'), color: "text-emerald-600" },
    notices: { title: t('cat_notices'), color: "text-slate-900" },
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const category = CATEGORY_MAP[categoryId || ""] || { title: "게시판", color: "text-slate-900" };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("이미지 크기는 2MB 이하여야 합니다.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Redirect if not logged in or not admin for notices
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (categoryId === "notices" && !user.isAdmin) {
      alert("공지사항은 관리자만 작성할 수 있습니다.");
      navigate("/board/notices");
    }
  }, [user, navigate, categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    
    try {
      const postsKey = `haneul_posts_${categoryId}`;
      const existingPosts = JSON.parse(localStorage.getItem(postsKey) || "[]");
      
      const newPost = {
        id: Date.now(),
        title,
        content,
        image,
        author: user?.username || "무명단원",
        userEmail: user?.email,
        isAnonymous,
        isPrivate,
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
        views: 0
      };

      localStorage.setItem(postsKey, JSON.stringify([newPost, ...existingPosts]));
      
      // Simulate slight delay for "submit" feel
      setTimeout(() => {
        navigate(`/board/${categoryId}`);
      }, 500);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to={`/board/${categoryId}`} 
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-10 text-sm font-bold uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> 취소하고 돌아가기
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden"
        >
          <header className="px-10 py-10 md:px-16 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                <PenTool size={20} />
              </div>
              <div>
                <div className={`${category.color} text-[10px] font-bold tracking-[0.2em] uppercase mb-1`}>{category.title}</div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">새 글 작성하기</h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 italic">
               <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-sky-400/60" /> 당신의 진심을 문장으로 옮겨주세요.</span>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="p-10 md:p-16 space-y-10">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                <Type size={14} /> Subject
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해 주세요"
                required
                className="w-full text-2xl md:text-3xl font-bold bg-transparent border-none placeholder:text-slate-200 focus:outline-none focus:ring-0 text-slate-900"
              />
              <div className="h-[1px] w-full bg-slate-100" />
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                <FileText size={14} /> Content
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="본문 내용을 입력해 주세요..."
                required
                className="w-full min-h-[400px] text-lg leading-relaxed bg-transparent border-none placeholder:text-slate-200 focus:outline-none focus:ring-0 text-slate-700 resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                <ImageIcon size={14} /> Attachment
              </label>
              
              <div className="flex items-start gap-4">
                {!image ? (
                  <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-slate-100 rounded-3xl cursor-pointer hover:bg-slate-50 hover:border-sky-100 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="text-slate-200 group-hover:text-sky-400 transition-colors mb-2" size={32} />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Photo Upload</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                ) : (
                  <div className="relative group">
                    <img src={image} alt="Preview" className="w-40 h-40 object-cover rounded-3xl border border-slate-100" />
                    <button 
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-rose-500 shadow-lg hover:bg-rose-500 hover:text-white transition-all scale-0 group-hover:scale-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <div className="flex-1 py-4">
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    작품 사진이나 연습 풍경 등<br />
                    아름다운 순간을 함께 담아주세요. (최대 2MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-10 border-t border-slate-50">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                <ShieldCheck size={14} /> Post Settings
              </label>
              
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all ${isAnonymous ? 'bg-sky-50 border-sky-200 text-sky-600 shadow-sm' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${isAnonymous ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <EyeOff size={14} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold">익명으로 작성</div>
                    <div className="text-[10px] opacity-60">작성자 정보가 숨겨집니다.</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all ${isPrivate ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${isPrivate ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Lock size={14} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold">비공개로 작성</div>
                    <div className="text-[10px] opacity-60">관리자만 내용을 볼 수 있습니다.</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-10 flex items-center justify-between border-t border-slate-50">
               <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <span className="text-[10px] font-bold">{user.username[0]}</span>
                  </div>
                  <div className="text-xs">
                    <div className="text-slate-300 font-bold uppercase tracking-tighter scale-75 origin-left">Writer</div>
                    <div className="text-slate-600 font-bold">{user.username}</div>
                  </div>
               </div>

               <button 
                type="submit" 
                disabled={isSubmitting}
                className={`flex items-center gap-3 px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
               >
                 {isSubmitting ? "등록 중..." : "글 등록하기"} <Send size={20} />
               </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
