"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const navItems = [
    { href: "/", text: "맛집" },
    { href: "/cafe", text: "카페" },
  ];

  const handleNewRegistration = () => {
    alert("준비중입니다.");
  };

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
          <div className="hidden sm:flex flex-col">
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

        <button
          onClick={handleNewRegistration}
          className="bg-yellow-400 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-500 active:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
        >
          신규 등록
        </button>
      </div>
    </header>
  );
}
