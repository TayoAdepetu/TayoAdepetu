import { Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
          Get in Touch
        </h2>
        
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
          Whether you need help with a project or want to chat about freelancing, feel free to reach out.
        </p>
        
        <a
          href="mailto:tayo@tayoadepetu.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors font-medium text-lg"
        >
          <Mail className="h-5 w-5" />
          Send me an email
        </a>
      </div>
    </section>
  );
}

