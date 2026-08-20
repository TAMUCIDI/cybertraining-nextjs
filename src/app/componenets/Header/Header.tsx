"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed z-40 navbar border-b transition-all duration-300 ${isHome && !isScrolled ? 'border-transparent bg-transparent text-base-200' : 'border-slate-200/80 bg-white/95 text-slate-900 backdrop-blur-md'} ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="navbar-start">
        <Link href={`/`} className="btn btn-ghost text-xl">
          CyberTraining
        </Link>
        
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={`/about`}>
              About
            </Link>
          </li>
          <li>
            <Link href={`/notebooks`}>
              Modules
            </Link>
          </li>
          <li>
            <Link href={`/workshops`}>
              Workshops
            </Link>
          </li>
          <li>
            <Link href={`/webinars`}>
              Webinars
            </Link>
          </li>
          <li>
            <Link href={`/news`}>
              News
            </Link>
          </li>
          
        </ul>
      </div>
      <div className="navbar-end">
        {/*<ThemeSwitcher/>*/}
      </div>
    </div>
  );
}
