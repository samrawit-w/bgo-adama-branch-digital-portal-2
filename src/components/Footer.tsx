import React from 'react';
import { Landmark, Phone, Mail, Clock, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  lang: Language;
  setCurrentTab: (tab: any) => void;
}

export function Footer({ lang, setCurrentTab }: FooterProps) {
  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-white mt-auto border-t border-emerald-900" id="bgo-footer-frame">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Editorial Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-800 rounded-lg flex items-center justify-center text-amber-400 border border-amber-400/50">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-black text-sm uppercase tracking-tight leading-tight">
                  {t('nav.portal_title')}
                </span>
                <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-widest leading-none mt-0.5">
                  {t('nav.portal_subtitle')}
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-100/70 leading-relaxed font-light">
              {lang === 'om' ? 'Busaa Gonofaa Oromiyaa waldaan maaykiroo-faayinaansii hawaasa giddu-galeessa godhatee fi tajaajila adda addaa dhiheessuun beekamtii argateedha.' :
               lang === 'am' ? 'ቡሳ ጎኖፋ ኦሮሚያ የባህላዊ የጋራ መረዳጃ እሴቶችን መሠረት በማድረግ ለገበሬዎችና ለሴቶች አስተማማኝ የማይክሮ ፋይናንስ ዋስትና የሚሰጥ ተቋም ነው።' :
               'Busaa Gonofaa Oromiyaa (BGO) is a values-driven microfinance institution providing modern inclusive banking rooted in mutual aid traditions.'}
            </p>
            <div className="flex gap-2">
              {['Facebook', 'Telegram', 'YouTube', 'LinkedIn'].map((sm) => (
                <span 
                  key={sm} 
                  className="bg-emerald-900 hover:bg-emerald-800 text-amber-400 text-[10px] px-2.5 py-1 rounded font-bold cursor-pointer transition border border-emerald-800"
                >
                  {sm}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 font-sans">
              {lang === 'om' ? 'Kutalee Daawwannaa' : lang === 'am' ? 'ገጾች ማውጫ' : 'Portal Directory'}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-amber-400 transition cursor-pointer text-left block">
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('services')} className="hover:text-amber-400 transition cursor-pointer text-left block">
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('community')} className="hover:text-amber-400 transition cursor-pointer text-left block">
                  {t('nav.community')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contribution')} className="hover:text-amber-400 transition cursor-pointer text-left block">
                  {t('nav.contribution')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-amber-400 transition cursor-pointer text-left block">
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Address coordinates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 font-sans">
              {lang === 'om' ? 'Teessoo Adamaa' : lang === 'am' ? 'አድራሻና ስልክ' : 'Adama Coordinates'}
            </h4>
            <ul className="space-y-3.5 text-xs text-emerald-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-normal">
                  {lang === 'om' ? 'Mora Galma Gadaa dhihoo, Karaa Gadaa Block 4, Adaamaa, Oromiyaa' :
                   lang === 'am' ? 'የገዳ አደባባይ ፎቅ 4፣ አዳማ ከተማ፣ ምስራቅ ሸዋ፣ ኢትዮጵያ' :
                   'Near Geda Hall, Gadaa Avenue, Block 4, Adama, East Shewa, Ethiopia'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+251 22 111 8979 / Shop Desk</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>adama.branch@bgo-oromiyaa.org</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Governance Accents */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 font-sans">
              {lang === 'om' ? 'Sa’a Hojii' : lang === 'am' ? 'የስራ ቀናት' : 'Operating Schedule'}
            </h4>
            <ul className="space-y-3 text-xs text-emerald-100/80">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">{lang === 'om' ? 'Wiixata - Jimaata' : lang === 'am' ? 'ከሰኞ - አርብ' : 'Monday - Friday'}</span>
                  <span className="block font-light text-[11px] text-emerald-200/60">08:00 AM - 05:00 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">{lang === 'om' ? 'Dilbata (Sanbata Gg.)' : lang === 'am' ? 'ቅዳሜ ግማሽ ቀን' : 'Saturday (Half-day)'}</span>
                  <span className="block font-light text-[11px] text-emerald-200/60">08:00 AM - 12:00 PM</span>
                </div>
              </li>
              <li className="text-[10px] bg-emerald-900/60 p-2.5 rounded-lg border border-emerald-800 font-light text-emerald-200/90 leading-relaxed">
                {lang === 'om' ? 'Dameen Adaamaa dhiibbata keeyas deeggaranii tolaan isiniif tajaajila.' :
                 lang === 'am' ? 'የአዳማው ቅርንጫፋችን ማንኛውንም የባንክና የብድር አገልግሎቶች በብቃት ያስተናግዳል።' :
                 'Under the oversight of the Central Gadaa Council, safeguarding mutual aid across Oromia.'}
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-emerald-900 my-8" />

        {/* Dynamic Oromo Gadaa Traditional Triband Block */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-200/60 font-light">
          <div>
            <span>&copy; {currentYear} {t('nav.portal_title')} – {t('nav.portal_subtitle')}. All rights reserve.</span>
          </div>
          <div className="flex items-center gap-4 font-normal text-emerald-100/80">
            <span className="text-[10px] uppercase font-bold tracking-wider">{lang === 'om' ? 'Misooma Hawaasaa' : lang === 'am' ? 'የማህበረሰብ ልማት' : 'Community Built'}</span>
            <span className="h-4 w-px bg-emerald-800"></span>
            <span className="text-[10px] uppercase font-bold tracking-wider">{lang === 'om' ? 'Maaykiroo-faayinaansii' : lang === 'am' ? 'ማይክሮፋይናንስ' : 'Microfinance'}</span>
          </div>
        </div>

      </div>

      {/* Decorative Oromo Traditional Ribbon */}
      <div className="h-2 w-full flex">
        <div className="h-full w-1/3 bg-black"></div>
        <div className="h-full w-1/3 bg-red-600"></div>
        <div className="h-full w-1/3 bg-white"></div>
      </div>
    </footer>
  );
}
