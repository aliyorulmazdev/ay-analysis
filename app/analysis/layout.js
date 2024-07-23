// app/layout.js
import Navbar from './_components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My App',
  description: 'Welcome to my app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Navbar />
          <main className="flex-1 p-6 xl:ml-64 md:ml-64 sm:ml-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
