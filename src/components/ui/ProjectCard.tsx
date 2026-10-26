'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, KeyRound, FileText, Cpu, BookOpen } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { ProjectItem } from '@/lib/projects.data';

interface ProjectCardProps {
  project: ProjectItem;
}

type ModalType = 'credentials' | 'readme' | 'stack' | 'casestudy';

export default function ProjectCard({ project }: ProjectCardProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: ModalType;
    title: string;
    filePath?: string;
    imageUrls?: string[];
  }>({
    isOpen: false,
    type: 'credentials',
    title: '',
    filePath: '',
    imageUrls: [],
  });

  const openModal = (e: React.MouseEvent, type: ModalType) => {
    e.preventDefault();
    e.stopPropagation();

    let titleLabel = 'CREDENTIALS';
    let path = project.credentialsFile;
    let imgs: string[] = [];

    if (type === 'readme') {
      titleLabel = 'README.MD';
      path = project.readmeFile;
    } else if (type === 'stack') {
      titleLabel = 'TECH STACK';
      path = project.techStackFile;
    } else if (type === 'casestudy') {
      titleLabel = 'PRODUCT CASE STUDY';
      imgs = project.caseStudyImages;
    }

    setModalState({
      isOpen: true,
      type,
      title: `${project.title} - ${titleLabel}`,
      filePath: path,
      imageUrls: imgs,
    });
  };

  return (
    <>
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#1C1F1E]/20 bg-white/85 p-3.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#F28C28]/80 hover:shadow-md">
        {/* Top Accent Strip */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#E5A93C] via-[#F28C28] to-[#D9381E] opacity-90" />

        {/* Card Header & Live Site Link */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#525854]">
            <span>{project.category}</span>
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-bold text-[#1C1F1E] transition-colors hover:text-[#D9381E]"
            >
              <span>LIVE SITE</span>
              <ExternalLink size={11} />
            </Link>
          </div>

          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block"
          >
            <h3 className="text-base font-bold tracking-tight text-[#1C1F1E] transition-colors group-hover:text-[#F28C28]">
              {project.title}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-[11px] leading-relaxed text-[#525854]">
              {project.subtitle}
            </p>
          </Link>
        </div>

        {/* 4 Evenly Placed Action Buttons */}
        <div className="mt-2.5 grid grid-cols-4 gap-1.5 border-t border-[#1C1F1E]/10 pt-2.5">
          <button
            onClick={(e) => openModal(e, 'credentials')}
            className="flex items-center justify-center gap-1 rounded-lg border border-[#1C1F1E]/15 bg-[#F7F5F0] px-1.5 py-1.5 text-[10px] font-semibold text-[#1C1F1E] shadow-sm transition-all hover:border-[#F28C28] hover:bg-white"
            title="View Credentials"
          >
            <KeyRound size={11} className="shrink-0 text-[#F28C28]" />
            <span className="truncate">Creds</span>
          </button>

          <button
            onClick={(e) => openModal(e, 'readme')}
            className="flex items-center justify-center gap-1 rounded-lg border border-[#1C1F1E]/15 bg-[#F7F5F0] px-1.5 py-1.5 text-[10px] font-semibold text-[#1C1F1E] shadow-sm transition-all hover:border-[#1C1F1E] hover:bg-white"
            title="View README.md"
          >
            <FileText size={11} className="shrink-0 text-[#1C1F1E]" />
            <span className="truncate">README</span>
          </button>

          <button
            onClick={(e) => openModal(e, 'stack')}
            className="flex items-center justify-center gap-1 rounded-lg border border-[#1C1F1E]/15 bg-[#F7F5F0] px-1.5 py-1.5 text-[10px] font-semibold text-[#1C1F1E] shadow-sm transition-all hover:border-[#D9381E] hover:bg-white"
            title="View Tech Stack"
          >
            <Cpu size={11} className="shrink-0 text-[#D9381E]" />
            <span className="truncate">Stack</span>
          </button>

          <button
            onClick={(e) => openModal(e, 'casestudy')}
            className="flex items-center justify-center gap-1 rounded-lg border border-[#1C1F1E]/15 bg-[#F7F5F0] px-1.5 py-1.5 text-[10px] font-semibold text-[#1C1F1E] shadow-sm transition-all hover:border-[#E5A93C] hover:bg-white"
            title="View Product Case Study"
          >
            <BookOpen size={11} className="shrink-0 text-[#E5A93C]" />
            <span className="truncate">Case Study</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        type={modalState.type}
        filePath={modalState.filePath}
        imageUrls={modalState.imageUrls}
      />
    </>
  );
}