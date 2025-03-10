import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-50 py-8 border-t border-slate-200/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="DDP 로고"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg text-slate-700">DDP</h3>
            </div>
            <p className="text-slate-600">Dongdaemun Dealicious sPot</p>
            <p className="text-slate-500 text-sm mt-1">동대문 맛집을 한눈에</p>
          </div>
        </div>
        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} DDP (Dongdaemun Dealicious sPot). All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
