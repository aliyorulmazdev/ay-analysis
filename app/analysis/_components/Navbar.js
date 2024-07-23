"use client";
import { useState } from "react";
import {
  HomeIcon,
  BoxIcon,
  TagIcon,
  ShoppingCartIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="md:hidden">
        <button
          className="fixed top-4 right-5 z-50 flex items-center justify-center rounded-md bg-indigo-600 p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={toggleMenu}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      <nav
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center justify-center">
          <Link href="/analysis">
            <p variant="link" className="p-4 mt-5 text-lg font-bold">
              Edremit Ticaret Borsası Analiz Laboratuvarı
            </p>
          </Link>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider">
              Analiz
            </h3>
            <div className="mt-2 space-y-1">
              <Link
                href="/analysis/analysis-information/analysis-record"
                className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-indigo-600"
                prefetch={false}
              >
                <BoxIcon className="h-5 w-5" />
                <span className="ml-3">Analiz Kayıtları</span>
              </Link>
              <Link
                href="/analysis/analysis-information/analysis-parameters"
                className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-indigo-600"
                prefetch={false}
              >
                <TagIcon className="h-5 w-5" />
                <span className="ml-3">Analiz Parametreleri</span>
              </Link>
              <Link
                href="/analysis/analysis-information/analysis-standards"
                className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-indigo-600"
                prefetch={false}
              >
                <BoxIcon className="h-5 w-5" />
                <span className="ml-3">Analiz Standartları</span>
              </Link>
              <Link
                href="/analysis/analysis-information/analysis-notes"
                className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-indigo-600"
                prefetch={false}
              >
                <TagIcon className="h-5 w-5" />
                <span className="ml-3">Analiz Notları</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider">
              Örnek
            </h3>
            <div className="mt-2 space-y-1">
              <Link
                href="/analysis/sample-information/sample-record"
                className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-indigo-600"
                prefetch={false}
              >
                <BoxIcon className="h-5 w-5" />
                <span className="ml-3">Örnek Kayıtları</span>
              </Link>
              <Link
                href="/analysis/sample-information/sample-type"
                className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-indigo-600"
                prefetch={false}
              >
                <TagIcon className="h-5 w-5" />
                <span className="ml-3">Örnek Tipleri</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider">
              Müşteri
            </h3>
            <div className="mt-2 space-y-1">
              <Link
                href="/analysis/customer-information"
                className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-indigo-600"
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                <span className="ml-3">Müşteri Kayıtları</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider">
              Çalışan
            </h3>
            <div className="mt-2 space-y-1">
              <Link
                href="/analysis/employee-information"
                className="flex items-center rounded-md px-4 py-2 text-sm hover:bg-indigo-600"
                prefetch={false}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="ml-3">Çalışan Kayıtları</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
