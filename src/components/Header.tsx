import React from 'react';
import { Globe, Shield, Calendar, Menu, X, Landmark } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: any) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export function Header({ currentTab, setCurrentTab, lang, setLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'community', label: t('nav.community') },
    { id: 'contribution', label: t('nav.contribution') },
    { id: 'contact', label: t('nav.contact') },
    { id: 'admin', label: t('nav.admin'), highlight: true }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm" id="bgo_main_header">
      {/* Oromo Cultural Color Band Grid */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-emerald-700"></div>
        <div className="h-full w-1/3 bg-white border-y border-gray-200"></div>
        <div className="h-full w-1/3 bg-amber-400"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Frame */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-12 h-12 bg-emerald-800 rounded-xl flex items-center justify-center text-amber-400 border border-amber-400 transform group-hover:rotate-6 transition-all shadow-md">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-black text-emerald-950 font-sans tracking-tight text-lg leading-tight uppercase group-hover:text-emerald-850 transition">
                {t('nav.portal_title')}
              </span>
              <span className="block text-[11px] font-bold text-amber-600 font-sans uppercase tracking-widest leading-none mt-0.5">
                {t('nav.portal_subtitle')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-tight uppercase transition-all cursor-pointer ${
                  currentTab === item.id
                    ? item.highlight 
                      ? 'bg-amber-500 text-emerald-950 font-extrabold shadow-sm' 
                      : 'bg-emerald-700 text-white font-extrabold shadow-sm'
                    : item.highlight
                      ? 'bg-amber-100/50 text-amber-800 hover:bg-amber-100'
                      : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language Selector + Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-700 shrink-0" />
            <div className="flex bg-slate-50 p-1 rounded-xl border border-gray-200">
              {[
                { code: 'om', label: 'AO' },
                { code: 'am', label: 'አማ' },
                { code: 'en', label: 'EN' }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as Language)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                    lang === l.code 
                      ? 'bg-emerald-800 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-emerald-800'
                  }`}
                  title={l.code === 'om' ? 'Afaan Oromo' : l.code === 'am' ? 'Amharic' : 'English'}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Right Block */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Quick Language Toggle */}
            <button
              onClick={() => {
                const next: Record<Language, Language> = { om: 'am', am: 'en', en: 'om' };
                setLang(next[lang]);
              }}
              className="bg-slate-50 p-2 rounded-xl border border-gray-150 text-xs font-bold text-emerald-800 hover:bg-emerald-50 cursor-pointer flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase text-[10px]">{lang}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-50 rounded-xl hover:bg-emerald-100 transition border border-gray-150 text-emerald-900 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white p-4 space-y-2 absolute top-20 left-0 w-full shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase transition flex justify-between items-center ${
                currentTab === item.id 
                  ? 'bg-emerald-800 text-white shadow' 
                  : 'text-gray-600 hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
              {item.highlight && <Shield className="w-4 h-4 text-amber-500" />}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-[10px] font-semibold text-gray-400 uppercase">Select Portal Translation</span>
            <div className="flex bg-slate-50 p-1 rounded-xl border border-gray-200">
              {[
                { code: 'om', label: 'Afaan Oromo' },
                { code: 'am', label: 'አማርኛ' },
                { code: 'en', label: 'English' }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as Language)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    lang === l.code 
                      ? 'bg-emerald-800 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-emerald-800'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
