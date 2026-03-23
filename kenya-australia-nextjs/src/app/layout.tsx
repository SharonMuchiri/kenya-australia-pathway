import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kenya → Australia | Education Pathway App',
  description: 'Your complete roadmap from KCSE results to landing in Australia. Grade assessment, financial planning, university selection, and visa checklist.',
  keywords: ['KCSE', 'Australia', 'student visa', 'study abroad', 'Kenya', 'education', 'university'],
  authors: [{ name: 'Kenya-Australia Pathway' }],
  openGraph: {
    title: 'Kenya → Australia | Education Pathway App',
    description: 'Your complete roadmap from KCSE results to landing in Australia.',
    type: 'website',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenya → Australia | Education Pathway App',
    description: 'Your complete roadmap from KCSE results to landing in Australia.',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#f59e0b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
