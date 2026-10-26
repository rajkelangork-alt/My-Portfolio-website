'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, KeyRound, FileText, Cpu, BookOpen, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'credentials' | 'readme' | 'stack' | 'casestudy';
  filePath?: string;
  imageUrls?: string[];
}

export default function Modal({ isOpen, onClose, title, type, filePath, imageUrls }: ModalProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsFullScreen(false);
      return;
    }

    if (type === 'casestudy') {
      setLoading(false);
      return;
    }

    if (filePath) {
      setLoading(true);
      // Try exact path first, fallback to lowercase readme.md if needed
      fetch(encodeURI(filePath))
        .then(async (res) => {
          if (!res.ok && filePath.endsWith('README.md')) {
            const fallbackRes = await fetch(encodeURI(filePath.replace('README.md', 'readme.md')));
            if (fallbackRes.ok) return fallbackRes.text();
            throw new Error('File not found');
          }
          if (!res.ok) throw new Error('File not found');
          return res.text();
        })
        .then((text) => setContent(text))
        .catch(() => setContent('Document content is being prepared.'))
        .finally(() => setLoading(false));
    }
  }, [isOpen, filePath, type]);

  if (!isOpen || !mounted) return null;

  const isExpandable = type === 'casestudy' || type === 'readme';

  const renderIcon = () => {
    switch (type) {
      case 'credentials':
        return <KeyRound size={16} className="text-[#F28C28]" />;
      case 'readme':
        return <FileText size={16} className="text-[#1C1F1E]" />;
      case 'stack':
        return <Cpu size={16} className="text-[#D9381E]" />;
      case 'casestudy':
        return <BookOpen size={16} className="text-[#E5A93C]" />;
    }
  };

  const getContainerDimensions = () => {
    if (!isExpandable) {
      return 'w-full max-w-xl h-auto max-h-[360px] lg:ml-[380px]';
    }
    if (isFullScreen) {
      return 'w-[92vw] h-[86vh] max-w-7xl';
    }
    return 'w-full max-w-[680px] h-[490px] lg:ml-[380px]';
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className={`relative flex flex-col overflow-hidden rounded-2xl border border-[#1C1F1E]/25 bg-white shadow-2xl transition-all duration-200 ${getContainerDimensions()}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Solid Pinned Modal Header Bar */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#1C1F1E]/15 bg-[#F7F5F0] px-5">
          <div className="flex items-center gap-2.5 overflow-hidden pr-3">
            <span className="shrink-0">{renderIcon()}</span>
            <h3 className="truncate text-xs font-bold uppercase tracking-wider text-[#1C1F1E] sm:text-sm">
              {title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {isExpandable && (
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#525854] transition-colors hover:bg-white hover:text-[#1C1F1E]"
                title={isFullScreen ? 'Exit Fullscreen' : 'Full Screen'}
              >
                {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            )}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#525854] transition-colors hover:bg-white hover:text-[#D9381E]"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div
          className={`flex-1 overflow-y-auto ${
            type === 'readme' ? 'bg-[#0d1117] text-[#e6edf3]' : 'bg-white p-5'
          }`}
        >
          {type === 'casestudy' ? (
            <div className="flex flex-col items-center gap-5">
              {imageUrls && imageUrls.length > 0 ? (
                imageUrls.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="w-full overflow-hidden rounded-xl border border-[#1C1F1E]/15 bg-[#F7F5F0] shadow-sm"
                  >
                    <div className="border-b border-[#1C1F1E]/10 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#525854]">
                      Page {index + 1} of {imageUrls.length}
                    </div>
                    <img
                      src={imgSrc}
                      alt={`${title} - Page ${index + 1}`}
                      className="h-auto w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                ))
              ) : (
                <p className="py-12 text-center text-xs text-[#525854]">
                  No case study images found in this folder.
                </p>
              )}
            </div>
          ) : loading ? (
            <div className="p-6 text-xs text-[#8b949e]">Loading document...</div>
          ) : type === 'readme' ? (
            /* Exact GitHub Dark Mode UI Container */
            <div className="min-h-full bg-[#0d1117] text-[#e6edf3]">
              {/* GitHub Repository "README" Tab Bar */}
              <div className="sticky top-0 z-10 flex items-center border-b border-[#30363d] bg-[#0d1117] px-6 pt-2">
                <div className="flex items-center gap-2 border-b-2 border-[#f78166] px-2 pb-2.5 text-xs font-semibold text-[#e6edf3]">
                  <BookOpen size={15} className="text-[#8b949e]" />
                  <span>README</span>
                </div>
              </div>

              {/* GitHub Markdown Body */}
              <div className="px-6 py-6 text-[14px] leading-[1.6] text-[#e6edf3]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-4 mt-2 border-b border-[#21262d] pb-2.5 text-2xl font-semibold tracking-tight text-[#e6edf3]">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-4 mt-6 border-b border-[#21262d] pb-2 text-xl font-semibold tracking-tight text-[#e6edf3]">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-3 mt-5 text-base font-semibold text-[#e6edf3]">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-[#e6edf3]">{children}</p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="mb-4 border-l-4 border-[#30363d] pl-4 text-[#8b949e]">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2f81f7] no-underline hover:underline"
                      >
                        {children}
                      </a>
                    ),
                    img: ({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt || ''}
                        className="mr-1.5 inline-block max-w-full align-middle"
                      />
                    ),
                    hr: () => <hr className="my-6 border-0 border-t border-[#21262d]" />,
                    ul: ({ children }) => (
                      <ul className="mb-4 list-disc space-y-1 pl-6 text-[#e6edf3]">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 list-decimal space-y-1 pl-6 text-[#e6edf3]">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    table: ({ children }) => (
                      <div className="mb-5 overflow-x-auto">
                        <table className="w-full border-collapse border border-[#30363d] text-left text-[13px]">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-[#161b22] text-[#e6edf3]">{children}</thead>
                    ),
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => (
                      <tr className="border-t border-[#21262d] bg-[#0d1117] even:bg-[#161b22]">
                        {children}
                      </tr>
                    ),
                    th: ({ children }) => (
                      <th className="border border-[#30363d] px-3.5 py-2 font-semibold text-[#e6edf3]">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-[#30363d] px-3.5 py-2 text-[#e6edf3]">
                        {children}
                      </td>
                    ),
                    code: ({ className, children, ...props }) => {
                      const isBlock = Boolean(className);
                      if (isBlock) {
                        return (
                          <code
                            className="block overflow-x-auto rounded-lg border border-[#30363d] bg-[#161b22] p-4 font-mono text-xs leading-relaxed text-[#e6edf3]"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code
                          className="rounded-[6px] bg-[#6e768166] px-1.5 py-0.5 font-mono text-[85%] text-[#e6edf3]"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => <pre className="mb-4 overflow-x-auto">{children}</pre>,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#1C1F1E]">
              {content}
            </pre>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}