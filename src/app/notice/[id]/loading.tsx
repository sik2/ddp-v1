import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 공지사항 상세 내용 스켈레톤 */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-6 animate-pulse">
            <div className="mb-4">
              <div className="w-24 h-6 bg-slate-200 rounded"></div>
            </div>

            <div className="border-b border-slate-200 pb-4 mb-6">
              <div className="w-3/4 h-8 bg-slate-200 rounded mb-2"></div>
              <div className="w-48 h-4 bg-slate-200 rounded"></div>
            </div>

            <div className="space-y-4">
              <div className="w-full h-4 bg-slate-200 rounded"></div>
              <div className="w-full h-4 bg-slate-200 rounded"></div>
              <div className="w-full h-4 bg-slate-200 rounded"></div>
              <div className="w-full h-4 bg-slate-200 rounded"></div>
              <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
            </div>
          </div>

          {/* 댓글 영역 스켈레톤 */}
          <div className="mt-8">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-6 animate-pulse">
              <div className="w-full h-24 bg-slate-200 rounded mb-6"></div>

              <div className="w-32 h-6 bg-slate-200 rounded mb-4"></div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-200/80"
                  >
                    <div className="w-32 h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="w-full h-16 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
