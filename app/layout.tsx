import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://wenyu-personal-notes.wangshouyi.chatgpt.site'),
  title: 'W. — 写作、游历与生活',
  description: '记录思考、学习、旅行、照片与声音的一处私人角落。',
  openGraph: {
    title: 'W. — 写作、游历与生活',
    description: '记录思考、学习、旅行、照片与声音的一处私人角落。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'W. 写作、游历与生活' }],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'W. — 写作、游历与生活',
    description: '记录思考、学习、旅行、照片与声音的一处私人角落。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body></html>;
}
