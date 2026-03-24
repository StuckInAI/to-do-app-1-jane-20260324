import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A full-stack Todo application built with Next.js and SQLite',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <main className="min-h-screen p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Todo App</h1>
              <p className="text-center text-gray-600">Manage your tasks efficiently</p>
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}