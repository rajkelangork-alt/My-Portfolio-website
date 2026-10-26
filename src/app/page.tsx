'use client';

import React, { useEffect, useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectsData } from '@/lib/projects.data';

export default function HomePage() {
  const [aboutBio, setAboutBio] = useState<string>('Loading profile description...');

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

  const paragraphs = aboutBio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="mx-auto flex h-[calc(100dvh-100px)] max-w-7xl items-center justify-center overflow-hidden px-8 py-2">
      <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
        
        {/* Left Side: Clean Unified "About Myself" Box (Photo Box Removed) */}
        <div className="relative w-full max-w-[495px] lg:col-span-5">
          <div className="group relative overflow-hidden rounded-2xl border border-[#1C1F1E]/20 bg-white/90 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#F28C28]/80 hover:shadow-lg">
            {/* Automotive Gradient Top Strip */}
            <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-[#E5A93C] via-[#F28C28] to-[#D9381E] opacity-90" />

            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#D9381E]" />
                  <h2 className="text-[11px] font-black uppercase tracking-wider text-[#525854]">
                    ABOUT MYSELF
                  </h2>
                </div>

                <div className="flex flex-col gap-3 text-xs leading-relaxed text-[#1C1F1E] sm:text-[13px]">
                  {paragraphs.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Bottom Summary Strip */}
              <div className="mt-5 border-t border-[#1C1F1E]/10 pt-3.5">
                <p className="text-xs leading-relaxed text-[#525854]">
                  Delivering high-reliability cloud architectures, real-time multi-tenant systems, and production frontend engineering with Next.js & TypeScript.
                </p>
                <div className="mt-2">
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