import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { FormProvider } from '../context/FormContext';

export const metadata: Metadata = {
  title: 'EventFlow | Requirement Posting Flow',
  description: 'Adaptive requirement posting flow for Event Planners, Performers, and Crew.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <FormProvider>
          <Navbar />
          <main className="flex-1 py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </main>
        </FormProvider>
      </body>
    </html>
  );
}
