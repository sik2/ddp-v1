import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      {/* 헤더 영역 */}
      <Header />

      {/* 메인 배너 이미지 */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-10"></div>
        <div className="absolute -right-24 -bottom-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-24 -top-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-20 text-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-slate-200/50">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2 text-center">
              맛집/카페 등록
            </h1>
            <p className="text-base sm:text-lg text-slate-600 text-center">
              새로운 맛집과 카페를 등록해주세요
            </p>
          </div>
        </div>
      </div>

      {/* 등록 폼 영역 */}
      <div className="container mx-auto mt-8 sm:mt-10 md:mt-12 px-4 mb-16">
        <RegisterForm />
      </div>

      {/* 푸터 영역 */}
      <Footer />
    </main>
  );
}
