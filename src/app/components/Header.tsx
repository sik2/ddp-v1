"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const navItems = [
    { href: "/", text: "맛집" },
    { href: "/cafe", text: "카페" },
    { href: "/notice", text: "공지" },
  ];

  return (
    <header className="bg-white shadow-sm p-3 sm:p-4 border-b border-slate-200/80">
      <div className="container mx-auto px-4 relative flex items-center">
        <div className="flex items-center w-1/4">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <Link
              href="/"
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label="홈으로 이동"
            ></Link>
            <Image
              src="/logo.svg"
              alt="DDP 로고"
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col ml-2">
            <span className="font-bold text-slate-700 text-lg leading-tight">
              DDP
            </span>
            <span className="text-xs text-slate-500 leading-tight">
              Dongdaemun Dealicious sPot
            </span>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <nav className="flex space-x-4 sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-sm sm:text-base text-slate-500 hover:text-yellow-500 transition-colors duration-300"
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-end w-1/4">
          <Link
            href="/new"
            className="bg-yellow-400 text-white px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md font-medium hover:bg-yellow-500 active:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
          >
            신규 등록
          </Link>
        </div>
      </div>
    </header>
  );
}
