import React from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectsData } from '@/lib/projects.data';

export const metadata = {
  title: 'My Projects | Full Stack Portfolio',
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex h-[calc(100dvh-115px)] max-w-7xl flex-col justify-between overflow-hidden px-6 pb-2 pt-1">
      {/* Header section placed at the top */}
      <div className="shrink-0 text-center">
        <h1 className="text-xl font-black uppercase tracking-tight text-[#1C1F1E] sm:text-2xl">
          MY PROJECTS
        </h1>
        <p className="text-[11px] text-[#525854]">
          Click any card to launch the live site. Click credentials or tech stack badges to view files.
        </p>
      </div>

      {/* 2x2 Grid evenly filling remaining height */}
      <div className="grid flex-1 grid-cols-1 items-stretch gap-3.5 py-2 md:grid-cols-2">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}