'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mail, Github, Copy, Check, ExternalLink, X } from 'lucide-react';

export default function Footer() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const emails = [
    { label: 'Gmail', address: 'rajkelango.rk@gmail.com' },
    { label: 'Outlook', address: 'rajkelango@outlook.com' },
  ];

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <>
      <footer className="relative z-30 w-full border-t border-[#1C1F1E]/10 bg-[#F7F5F0]/90 backdrop-blur-md">
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-center px-6">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#1C1F1E]">
            {/* Email Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-[#F28C28]"
              title="Click to view Email Addresses"
            >
              <Mail size={14} className="text-[#F28C28]" />
              <span>EMAIL</span>
            </button>

            <span className="text-[#1C1F1E]/30">•</span>

            {/* Direct GitHub Profile Link */}
            <a
              href="https://github.com/rajkelangork-alt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-[#D9381E]"
              title="Visit GitHub Profile (rajkelangork-alt)"
            >
              <Github size={14} className="text-[#1C1F1E]" />
              <span>GITHUB</span>
              <ExternalLink size={11} className="text-[#525854]" />
            </a>
          </div>
        </div>
      </footer>

      {/* Glass-Blur Email Card Portal */}
      {mounted &&
        isEmailModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-md transition-all"
            onClick={() => setIsEmailModalOpen(false)}
          >
            <div
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#1C1F1E]/20 bg-white/85 shadow-2xl backdrop-blur-xl transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Automotive Top Accent Strip */}
              <div className="h-1 w-full bg-gradient-to-r from-[#E5A93C] via-[#F28C28] to-[#D9381E]" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#1C1F1E]/10 bg-[#F7F5F0]/90 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-[#F28C28]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1F1E] sm:text-sm">
                    Contact via Email
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[#525854] transition-colors hover:bg-white hover:text-[#D9381E]"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Dual Email Rows with Copy Buttons */}
              <div className="flex flex-col gap-3 p-5">
                {emails.map((item) => (
                  <div
                    key={item.address}
                    className="flex items-center justify-between rounded-xl border border-[#1C1F1E]/15 bg-[#F7F5F0]/80 px-4 py-3 shadow-sm transition-all hover:border-[#F28C28]/60 hover:bg-white"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-[#F28C28]">
                        {item.label}
                      </span>
                      <a
                        href={`mailto:${item.address}`}
                        className="mt-0.5 block truncate font-mono text-xs font-semibold text-[#1C1F1E] hover:underline sm:text-sm"
                        title={`Send email to ${item.address}`}
                      >
                        {item.address}
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.address)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#1C1F1E]/15 bg-white px-3 py-2 text-xs font-semibold text-[#1C1F1E] shadow-sm transition-all hover:border-[#F28C28] hover:text-[#F28C28]"
                      title="Copy Email Address"
                    >
                      {copiedEmail === item.address ? (
                        <>
                          <Check size={14} className="text-green-600" />
                          <span className="text-green-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} className="text-[#525854]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}