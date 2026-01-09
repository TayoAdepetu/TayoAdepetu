import { projects } from '@/data/projects';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">
          Projects
        </h2>
        
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                    {project.name}
                    {project.status === 'archived' && (
                      <span className="ml-3 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                        (Archived)
                      </span>
                    )}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label={`Visit ${project.name}`}
                    >
                      <ExternalLink className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <Github className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

