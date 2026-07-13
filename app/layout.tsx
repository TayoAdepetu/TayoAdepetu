import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ContactProvider } from '@/components/contact/ContactProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tayoadepetu.com'),
  title: {
    default: 'Tayo Adepetu — Software Engineer & SEO Specialist',
    template: '%s · Tayo Adepetu',
  },
  description:
    'Tayo Adepetu — Top-rated Plus software engineer and SEO specialist helping individuals and businesses in Nigeria, the US, UK, and Australia ship and rank great products.',
  keywords: [
    'Tayo Adepetu',
    'Software Engineer Nigeria',
    'Full-stack Developer',
    'SEO Specialist',
    'Upwork Top Rated Plus',
    'Mobile App Development',
    'Website Development',
    'Chrome Extension Development',
    'AI Software',
    'WhatsApp API',
    'Escrow App',
    'Next.js',
    'Laravel',
    'React Native',
  ],
  authors: [{ name: 'Tayo Adepetu' }],
  creator: 'Tayo Adepetu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tayoadepetu.com',
    siteName: 'Tayo Adepetu',
    title: 'Tayo Adepetu — Software Engineer & SEO Specialist',
    description:
      'Top-rated Plus software engineer and SEO specialist helping individuals and businesses worldwide ship and rank great products.',
    images: ['/upwork-profile.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tayo Adepetu — Software Engineer & SEO Specialist',
    description:
      'Top-rated Plus software engineer and SEO specialist helping individuals and businesses worldwide ship and rank great products.',
    creator: '@tayoadepetu',
    images: ['/upwork-profile.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}>
        <ContactProvider>
          <Navigation />
          {children}
          <Footer />
        </ContactProvider>
      </body>
    </html>
  );
}
