import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const navItems = [
    { href: "/맛집리스트", text: "맛집리스트" },
    { href: "/인기맛집", text: "인기맛집" },
    { href: "/신규맛집", text: "신규맛집" },
  ];

  return (
    <header className="bg-white shadow-sm p-4 border-b border-slate-200/80">
      <div className="container mx-auto relative flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.svg"
              alt="DDP 로고"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-700 text-lg leading-tight">
              DDP
            </span>
            <span className="text-xs text-slate-500 leading-tight">
              Dongdaemun Dealicious sPot
            </span>
          </div>
        </Link>

        <div className="absolute inset-x-0 flex justify-center">
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-slate-500 hover:text-yellow-500 transition-colors duration-300"
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>

        <button className="bg-yellow-400 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors duration-300 shadow-sm">
          로그인
        </button>
      </div>
    </header>
  );
}
