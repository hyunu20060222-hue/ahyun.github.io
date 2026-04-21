import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft, PenSquare, MessageSquare, User, Clock, Search, Lock, EyeOff, Image as ImageIcon } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";

interface Post {
  id: number;
  title: string;
  author: string;
  userEmail?: string;
  isAnonymous?: boolean;
  isPrivate?: boolean;
  image?: string | null;
  date: string;
  views: number;
  content: string;
}

const CATEGORY_MAP: Record<string, { title: string; color: string }> = {
  rehearsal: { title: "뜨거운 연습의 공기", color: "text-sky-600" },
  tech: { title: "무대를 만드는 손길", color: "text-rose-600" },
  moment: { title: "찰나의 진심", color: "text-purple-600" },
  backstage: { title: "커튼 뒤의 영혼들", color: "text-amber-600" },
  reviews: { title: "관객의 울림", color: "text-emerald-600" },
  notices: { title: "하늘연달 공지사항", color: "text-slate-900" },
};

const DEFAULT_POSTS: Record<string, Post[]> = {
  notices: [
    { id: 3, title: "제 5회 정기공연 오디션 공고", author: "운영팀", date: "2024.10.28", views: 412, content: "하늘연달의 다섯 번째 이야기를 함께할 새로운 얼굴을 찾습니다. \n\n1. 모집 분야: 배우, 스태프\n2. 오디션 일시: 11월 15일(토) 오후 2시\n3. 장소: 극단 연습실" },
    { id: 2, title: "[필독] 극단 연습실 이용 수칙 안내", author: "관리자", date: "2024.10.15", views: 289, content: "공동 연습실 사용 시 다음 수칙을 반드시 준수해 주시기 바랍니다. \n\n- 입실 전 명부 작성 필수\n- 연습 후 개인 쓰레기 배출 및 정리정돈\n- 마지막 퇴실 자 전등 및 냉난방기 확인" },
    { id: 1, title: "하늘연달 홈페이지 리뉴얼 안내", author: "개발팀", date: "2024.10.01", views: 156, content: "우리 극단의 새로운 보금자리가 오픈되었습니다. \n단원들 간의 소통과 관객들과의 만남을 위한 다양한 게시판이 마련되었으니 많은 이용 부탁드립니다." },
  ],
  reviews: [
    { id: 3, title: "정말 감동적인 공연이었습니다", author: "관객A", date: "2024.10.25", views: 245, content: "배우분들의 열정이 그대로 느껴지는 무대였어요. 특히 마지막 장면에서의 대사가 잊혀지지 않네요." },
    { id: 2, title: "하늘연달의 다음 공연이 기다려집니다", author: "연극사랑", date: "2024.10.24", views: 182, content: "우연히 보게 된 공연이었는데 팬이 되었습니다. 멤버들의 호흡이 정말 좋네요." },
    { id: 1, title: "청춘의 에너지를 받고 갑니다", author: "대학생S", date: "2024.10.23", views: 156, content: "요즘 많이 지쳐있었는데 공연을 보며 큰 위로를 받았습니다. 감사합니다!" },
  ],
  rehearsal: [
    { id: 4, title: "연습 공지사항 필독 바랍니다", author: "관리자", date: "2024.10.20", views: 124, content: "이번 주 토요일 연습은 평소보다 1시간 일찍 시작합니다. 늦지 않게 도착해 주세요!\n\n장소: 연습실 A\n준비물: 개인 대본, 편한 실내화" },
    { id: 3, title: "어제자 연습 사진 공유합니다", author: "김배우", date: "2024.10.19", views: 85, content: "어제 첫 동선 잡느라 다들 고생 많으셨습니다. \n단톡방에 있는 사진들 중 잘 나온 것 몇 장 추려봤어요. \n다들 표정이 너무 좋네요!" },
  ]
};

export default function Board() {
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

  const category = CATEGORY_MAP[categoryId || ""] || { title: t('board'), color: "text-slate-900" };

  const isGalleryCategory = ["rehearsal", "tech", "moment", "backstage"].includes(categoryId || "");

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const postsKey = `haneul_posts_${categoryId}`;
    const savedPosts = JSON.parse(localStorage.getItem(postsKey) || "null");
    
    if (savedPosts) {
      setPosts(savedPosts);
    } else {
      const defaults = DEFAULT_POSTS[categoryId || ""] || [];
      setPosts(defaults);
      localStorage.setItem(postsKey, JSON.stringify(defaults));
    }
  }, [categoryId]);

  const handleWriteClick = () => {
    if (!user) {
      alert("글을 쓰시려면 먼저 로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate(`/write/${categoryId}`);
    }
  };

  const canSeePost = (post: Post) => {
    if (!post.isPrivate) return true;
    if (!user) return false;
    if (user.isAdmin) return true;
    if (user.email === post.userEmail) return true;
    return false;
  };

  const handlePostClick = (post: Post) => {
    if (!canSeePost(post)) {
      alert("비공개 글입니다. 관리자 혹은 작성자만 볼 수 있습니다.");
      return;
    }
    setSelectedPost(post);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-10 text-sm font-bold uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> 목록으로 돌아가기
          </button>

          <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <header className="p-10 md:p-16 border-b border-slate-100 bg-slate-50/50">
              <div className="text-sky-500 font-bold text-xs mb-4 tracking-widest uppercase">{category.title}</div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">{selectedPost.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    {selectedPost.isAnonymous ? <EyeOff size={14} /> : <User size={16} />}
                  </div>
                  <span className="text-slate-900 font-bold">
                    {selectedPost.isAnonymous ? "익명" : selectedPost.author}
                    {selectedPost.isPrivate && <span className="ml-2 text-rose-500 text-xs font-normal flex items-center gap-1 inline-flex"><Lock size={10} /> 비공개</span>}
                  </span>
                </div>
                <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
                  <Clock size={16} className="opacity-50" /> {selectedPost.date}
                </div>
                <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
                  조회수 <span className="text-slate-600 font-mono">{selectedPost.views}</span>
                </div>
              </div>
            </header>

            <div className="p-10 md:p-16 leading-[2] text-slate-700 text-lg whitespace-pre-wrap font-sans min-h-[400px]">
              {selectedPost.image && (
                <div className="mb-12 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-100 border border-slate-100">
                  <img src={selectedPost.image} alt="Attached" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              {selectedPost.content}
            </div>

            <footer className="px-10 md:px-16 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <button className="flex items-center gap-2 hover:text-sky-500 transition-colors">
                  <MessageSquare size={18} /> 댓글 <span className="font-bold whitespace-nowrap">2</span>
                </button>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="px-8 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-white transition-all shadow-sm"
              >
                닫기
              </button>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Board Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link 
              to="/#behind" 
              className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
            >
              <ChevronLeft size={16} /> {t('back_to_list')}
            </Link>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tight ${category.color}`}>
              {category.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
             {(categoryId !== "notices" || user?.isAdmin) && (
               <button 
                onClick={handleWriteClick}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all"
               >
                  <PenSquare size={18} /> {t('write')}
               </button>
             )}
          </div>
        </div>

        {/* Board List (Naver Cafe Style Layout) or Gallery View */}
        {isGalleryCategory ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                onClick={() => handlePostClick(post)}
                className={`group cursor-pointer ${!canSeePost(post) ? 'opacity-60' : ''}`}
              >
                <div className="aspect-[4/5] bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 flex items-center justify-center relative">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-slate-100">
                      <ImageIcon size={64} strokeWidth={1} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">No Image</span>
                    </div>
                  )}
                  
                  {!canSeePost(post) && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center gap-4">
                      <Lock className="text-white" size={32} />
                      <span className="text-white text-[10px] font-bold uppercase tracking-widest">Private</span>
                    </div>
                  )}

                  {/* Frame Effect */}
                  <div className="absolute inset-0 border-[16px] border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none" />
                </div>
                
                <div className="mt-8 px-4 text-center">
                  <h3 className="text-lg font-black text-slate-800 line-clamp-1 group-hover:text-sky-500 transition-colors uppercase tracking-tight mb-2">
                    {canSeePost(post) ? post.title : "Private Photo"}
                  </h3>
                  <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{post.isAnonymous ? "익명" : post.author}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div className="col-span-1 text-center">번호</div>
              <div className="col-span-7 md:col-span-8">제목</div>
              <div className="col-span-2 md:col-span-1 text-center">작가</div>
              <div className="col-span-2 md:col-span-1 text-center">날짜</div>
              <div className="hidden md:block col-span-1 text-center">조회</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-slate-100">
              {posts.map((post) => (
                <motion.div 
                  key={post.id}
                  whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
                  onClick={() => handlePostClick(post)}
                  className={`grid grid-cols-12 gap-4 px-8 py-5 items-center text-sm group cursor-pointer ${!canSeePost(post) ? 'opacity-60' : ''}`}
                >
                  <div className="col-span-1 text-center text-slate-400 font-mono">{post.id}</div>
                  <div className="col-span-7 md:col-span-8 font-bold text-slate-700 group-hover:text-slate-900 transition-colors flex items-center gap-2">
                    {post.isPrivate && <Lock size={14} className="text-rose-400" />}
                    {canSeePost(post) ? post.title : "비공개 글입니다."}
                    {post.image && <ImageIcon size={14} className="text-slate-300" />}
                    <span className="text-sky-500 font-normal text-xs flex items-center gap-1">
                      <MessageSquare size={12} /> [2]
                    </span>
                  </div>
                  <div className="col-span-2 md:col-span-1 text-center text-slate-500">
                    <span className="flex items-center justify-center gap-1">
                      {post.isAnonymous ? (
                        <>
                          <EyeOff size={14} className="opacity-50" /> 익명
                        </>
                      ) : (
                        <>
                          <User size={14} className="opacity-50" /> {post.author}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="col-span-2 md:col-span-1 text-center text-slate-400 text-xs">
                     <span className="flex items-center justify-center gap-1">
                      <Clock size={14} className="opacity-50" /> {post.date}
                    </span>
                  </div>
                  <div className="hidden md:block col-span-1 text-center text-slate-400 font-mono text-xs">{post.views}</div>
                </motion.div>
              ))}
            </div>
            
            {/* List Footer / Search */}
            <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="제목이나 내용 검색" 
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all w-64"
                  />
                </div>
                <button className="px-4 py-2 bg-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-300 transition-all">
                  검색
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-900 bg-white">1</button>
                <button className="w-8 h-8 flex items-center justify-center border border-transparent rounded hover:bg-slate-200 transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center border border-transparent rounded hover:bg-slate-200 transition-colors">3</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
