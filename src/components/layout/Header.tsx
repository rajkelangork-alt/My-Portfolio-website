'use client';

import React from 'react';
import Link from 'next/link';
import { Gauge } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1C1F1E]/10 bg-[#F7F5F0]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C1F1E] text-[#F28C28] shadow-sm">
            <Gauge size={18} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-black uppercase tracking-wider text-[#1C1F1E]">
            PRODUCT FULL STACK PORTFOLIO
          </span>
        </Link>
      </div>
    </header>
  );
}