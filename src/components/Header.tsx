'use client';

import React from 'react';
import { Send, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-dark-bg/85 backdrop-blur-md border-b border-dark-card-border/80">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col">
          <span className="text-xl md:text-2xl font-black tracking-widest text-white">
            US<span className="text-brand-orange">2</span>TH
          </span>
          <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-dark-text-secondary uppercase -mt-1 font-bold">
            Rare Sourcing
          </span>
        </a>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-dark-text-secondary">
          <a href="#showcase" className="hover:text-white transition-colors">Delivered Showcase</a>
          <a href="#tracker" className="hover:text-white transition-colors">Shipment Tracker</a>
          <a href="#inquiry" className="hover:text-white transition-colors">Request Quote</a>
          <a href="#openchat" className="hover:text-white transition-colors">OpenChat Community</a>
        </nav>

        {/* CTA Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://lin.ee/ByS27YW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm bg-brand-orange text-white text-xs font-bold hover:bg-brand-orange-hover transition-all tracking-wider uppercase"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            LINE @hij2541a
          </a>
          <a
            href="https://www.facebook.com/us2th"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm border border-white/20 text-white text-xs font-bold hover:bg-white/5 transition-all tracking-wider uppercase"
          >
            <Send className="w-3.5 h-3.5" />
            Messenger
          </a>
        </div>

        {/* Simple Mobile Version indicator - Hamburger not strictly required since it's a single-page landing page, but desktop links will be visible in the mobile bottom sticky bar and main section links */}
        <div className="md:hidden flex items-center">
          <a
            href="#inquiry"
            className="px-3 py-1 bg-brand-orange text-white text-xs font-black rounded-sm uppercase tracking-wider"
          >
            Request Sourcing
          </a>
        </div>
      </div>
    </header>
  );
}
