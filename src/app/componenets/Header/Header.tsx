"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';

import Link from 'next/link';

// import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className={`fixed z-40 navbar ${isScrolled ? 'bg-base-100' : 'bg-transparent'} text-base-content transition-all duration-300`}>
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

