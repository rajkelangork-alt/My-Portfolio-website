'use client';

import React, { useEffect, useState, useRef } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectsData } from '@/lib/projects.data';

export default function HomePage() {
  const [aboutBio, setAboutBio] = useState<string>('Loading profile description...');
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState({ w: 490, h: 390 });

  useEffect(() => {
    fetch('/data/about.txt')
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((text) => setAboutBio(text.trim()))
      .catch(() =>
        setAboutBio(
          'I am a Full Stack Developer, and I build products end to end, from the first prototype to a responsive frontend. My experience as Technical Product Manager spans product prototyping, backend application design, and frontend delivery, so I can translate an idea into a working product and make the trade-offs along the way.\n\nLately, I have been experimenting with building my own products, with a focus on AI agentic applications. I enjoy turning new ideas into working prototypes, and I’m looking for challenging projects in application prototyping, and full stack development where I can keep learning and shipping.'
        )
      );
  }, []);

  // Measure actual card dimensions so the SVG L-shape border stays 100% pixel-accurate
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setBoxSize({ w: Math.round(width), h: Math.round(height) });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [aboutBio]);

  // Split bio into Paragraph 1 (beside photo) and Paragraph 2+ (full-width below photo)
  const paragraphs = aboutBio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const firstParagraph = paragraphs[0] || '';
  const remainingParagraphs = paragraphs.slice(1).join('\n\n');

  // Exact pixel geometry: 176px photo (h-44 w-44) + 12px uniform gap = 188px notch
  const notch = 188;
  const r = 12;
  const W = boxSize.w;
  const H = boxSize.h;

  const lShapePath = `
    M ${notch + r},0.5
    H ${W - r} A ${r},${r} 0 0 1 ${W - 0.5},${r}
    V ${H - r} A ${r},${r} 0 0 1 ${W - r},${H - 0.5}
    H ${r} A ${r},${r} 0 0 1 0.5,${H - r}
    V ${notch + r} A ${r},${r} 0 0 1 ${r},${notch}
    H ${notch - r} A ${r},${r} 0 0 0 ${notch},${notch - r}
    V ${r} A ${r},${r} 0 0 1 ${notch + r},0.5
    Z
  `;

  return (
    <div className="mx-auto flex h-[calc(100dvh-100px)] max-w-7xl items-center justify-center overflow-hidden px-8 py-2">
      <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
        
        {/* Left Side: Fixed 176x176 Photo + Pixel-Locked L-Shaped About Card */}
        <div className="relative w-full max-w-[495px] lg:col-span-5">
          
          {/* 1. Standalone Profile Photo (176px x 176px) */}
          <div className="absolute left-0 top-0 z-20 h-44 w-44 overflow-hidden rounded-xl border border-[#1C1F1E] bg-[#1C1F1E] shadow-sm">
            <img
              src="/images/profile.png"
              alt="My Photo"
              className="h-full w-full object-cover object-top"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('/projects/')) {
                  target.src = '/images/projects/profile.png';
                }
              }}
            />
          </div>

          {/* 2. Dynamic Pixel-Accurate L-Shaped Container */}
          <div ref={containerRef} className="relative z-10 w-full">
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${W} ${H}`}
              fill="none"
            >
              <path
                d={lShapePath}
                fill="#FFFFFF"
                stroke="#1C1F1E"
                strokeWidth="1"
              />
            </svg>

            <div className="relative z-10 flex flex-col justify-between p-5">
              {/* Upper Right Section: Placed cleanly beside the 176px photo + 12px gap */}
              <div className="ml-[188px] min-h-[168px] pl-2">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#D9381E]" />
                  <h2 className="text-[11px] font-black uppercase tracking-wider text-[#525854]">
                    About Myself
                  </h2>
                </div>
                <p className="text-[12px] leading-[1.52] text-[#1C1F1E]">
                  {firstParagraph}
                </p>
              </div>

              {/* Lower Full-Width Section: Starts immediately below the 188px photo cutout */}
              {remainingParagraphs && (
                <div className="mt-3 pt-1">
                  <p className="whitespace-pre-line text-[12px] leading-[1.52] text-[#1C1F1E]">
                    {remainingParagraphs}
                  </p>
                </div>
              )}

              {/* Footer Summary Strip inside About Card */}
              <div className="mt-3.5 border-t border-[#1C1F1E]/10 pt-3">
                <p className="text-[11px] leading-relaxed text-[#525854]">
                  Delivering high-reliability cloud architectures, real-time multi-tenant systems, and production frontend engineering with Next.js & TypeScript.
                </p>
                <div className="mt-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
                    PRODUCT FULL STACK PORTFOLIO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Outer Projects Box */}
        <div className="lg:col-span-7">
          <div className="group relative rounded-2xl border border-[#1C1F1E]/20 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#F28C28]/80 hover:shadow-lg">
            <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-[#E5A93C] via-[#F28C28] to-[#D9381E] opacity-75" />

            <div className="mb-3 text-center sm:text-left">
              <h1 className="text-base font-black uppercase tracking-tight text-[#1C1F1E] sm:text-lg">
                MY PROJECTS
              </h1>
              <p className="text-[11px] text-[#525854]">
                Click any card to launch the live site. Click badges to inspect case studies and files.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}