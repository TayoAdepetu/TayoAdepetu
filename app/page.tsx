import { Hero } from '@/components/Hero';
import { UpworkStats } from '@/components/UpworkStats';
import { ServicesSection } from '@/components/ServicesSection';
import { Projects } from '@/components/Projects';
import { Testimonials } from '@/components/Testimonials';
import { BlogPreview } from '@/components/BlogPreview';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <UpworkStats />
      <ServicesSection />
      <Projects />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </main>
  );
}
