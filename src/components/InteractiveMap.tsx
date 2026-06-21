import React, { useState } from 'react';
import { MapPin, Info, Phone, Clock, Compass, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface MapLocation {
  id: string;
  name_om: string;
  name_am: string;
  name_en: string;
  type: 'main' | 'education' | 'agricultural' | 'women';
  coords: { x: number; y: number };
  address_om: string;
  address_am: string;
  address_en: string;
  manager: string;
  phone: string;
  hours: string;
  description_en: string;
  description_om: string;
  description_am: string;
}

const adamaLocations: MapLocation[] = [
  {
    id: 'loc-1',
    name_en: 'BGO Adama Main Branch & HQ',
    name_om: 'BGO Damee Guddaa Adaamaa',
    name_am: 'የBGO አዳማ ዋና ቅርንጫፍ',
    type: 'main',
    coords: { x: 280, y: 190 },
    address_en: 'Gadaa Avenue, Block 4, Adama Central (Near Geda Hall)',
    address_om: 'Karaa Gadaa, Block 4, Adaamaa Giddugaleessa (Mora Gadaa Hall Lafa Bira)',
    address_am: 'ገዳ አደባባይ፣ ፎቅ 4፣ መካከለኛው አዳማ (ከገዳ አዳራሽ አጠገብ)',
    manager: 'Aadde Obsee Dajene',
    phone: '+251 22 111 8979',
    hours: 'Mon - Fri (8:00 AM - 5:00 PM), Sat (8:00 AM - 12:00 PM)',
    description_en: 'Central administration hub providing standard agricultural & commercial business loans.',
    description_om: 'Giddugaleessa dhimma maaykiroo-liqiifi tajaajila tajaajila maamilaa hundaa.',
    description_am: 'ዋናው የስራ ማስፈጸሚያ ማእከል እና አጠቃላይ የቁጠባና ብድር መመዝገቢያ ቦታ።'
  },
  {
    id: 'loc-2',
    name_en: 'Agricultural Support Desk',
    name_om: 'Diriira Deeggarsa Qonnaa',
    name_am: 'የግብርና ድጋፍ መስኮት',
    type: 'agricultural',
    coords: { x: 120, y: 120 },
    address_en: 'Northern Farmer Gate Road, Adama',
    address_om: 'Karaa Gara Kaabaa, Adaamaa',
    address_am: 'ሰሜናዊው የገበሬዎች መግቢያ መንገድ፣ አዳማ',
    manager: 'Obbo Abbabaa Tarrafae',
    phone: '+251 22 111 2045',
    hours: 'Mon - Fri (8:00 AM - 4:00 PM)',
    description_en: 'Specialized desk issuing small-scale fertilizer loans & agricultural crop protection micro-insurances.',
    description_om: 'Kkf liqii xaa’oo, sanyii filatamaafi inshuraansii qonnaa dhiheessuuf qophaa’e.',
    description_am: 'የገበሬዎችን ምርታማነት ለማሳደግ የአነስተኛ ብድር መገኛ ቅርንጫፍ።'
  },
  {
    id: 'loc-3',
    name_en: 'Youth Savings & Digital Incubation Annex',
    name_om: 'Qusannoo Dargaggootaa & Giddugaleessa Teeknooloojii',
    name_am: 'የወጣቶች ቁጠባና ዲጂታል ስልጠና ማዕከል',
    type: 'education',
    coords: { x: 410, y: 140 },
    address_en: 'University Road, near ASTU Main Gate, Adama',
    address_om: 'Karaa Yuunivarsitii, kellaa guddaa ASTU dhihoo, Adaamaa',
    address_am: 'ዩኒቨርሲቲ መንገድ፣ ከአዳማ ሳይንስና ቴክኖሎጂ ዩኒቨርሲቲ አጠገብ',
    manager: 'Dr. Obbo Tolasaa Baqqalaa',
    phone: '+251 22 111 3110',
    hours: 'Mon - Sat (8:30 AM - 6:00 PM)',
    description_en: 'Encouraging youth financial independence via digital startup wallets & financial education workshops.',
    description_om: 'Dargaggoota herrega qusannoo qaqqabsiisuu fi barsiisa faayinaansii kennuu.',
    description_am: 'የወጣት ስራ ፈጣሪዎችን የንግድ ሀሳብ መደገፊያና ማሰልጠኛ ቅርንጫፍ።'
  },
  {
    id: 'loc-4',
    name_en: 'Women Empowerment Loan Center',
    name_om: 'Wirtuu Liqii Dubartoota Hawaasummaa',
    name_am: 'የሴቶች ማብቃትና ብድር ማእከል',
    type: 'women',
    coords: { x: 340, y: 290 },
    address_en: 'Adama Industrial Loop, Block B, Adama',
    address_om: 'Diriira Warshaa Adaamaa, Block B, Adaamaa',
    address_am: 'አዳማ ኢንዱስትሪ ዞን፣ ህንፃ B፣ አዳማ',
    manager: 'W/ro Muluemebet G/Mariam',
    phone: '+251 22 111 5002',
    hours: 'Mon - Fri (8:00 AM - 5:00 PM)',
    description_en: 'Offering collateral-free joint liability loans for localized women-owned micro enterprises.',
    description_om: 'Dubartootaaf liqii wabii malee gareen wal-tumsuun kennamu dhiyeessu.',
    description_am: 'ሴት ስራ ፈጣሪዎችን ለማብቃትና መያዣ የሌለው አነስተኛ ብድር ለማቅረብ የሚሰራ።'
  }
];

export function InteractiveMap({ lang }: { lang: Language }) {
  const [selectedId, setSelectedId] = useState<string>('loc-1');
  const [filterType, setFilterType] = useState<string>('all');
  const [routeSimulated, setRouteSimulated] = useState<boolean>(false);

  const selectedLoc = adamaLocations.find(l => l.id === selectedId) || adamaLocations[0];

  const filteredLocations = filterType === 'all' 
    ? adamaLocations 
    : adamaLocations.filter(l => l.type === filterType);

  const translate = (loc: MapLocation, field: 'name' | 'address' | 'description') => {
    if (lang === 'om') return loc[`${field}_om` as keyof MapLocation] as string;
    if (lang === 'am') return loc[`${field}_am` as keyof MapLocation] as string;
    return loc[`${field}_en` as keyof MapLocation] as string;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100" id="adama-interactive-map-section">
      <div className="bg-emerald-800 text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold font-sans tracking-tight">
            {lang === 'om' ? 'Kariita To’annoo Damee Keenyaa' : lang === 'am' ? 'የቅርንጫፎቻችን መስተጋብራዊ ካርታ' : 'Interactive Branch Map Locator'}
          </h3>
          <p className="text-sm font-light text-emerald-100 mt-1">
            {lang === 'om' ? 'Bakkeewwan BGO gumaacha tajaajila adda addaa Adaamaa keessaa filadhaa.' : 
             lang === 'am' ? 'በአዳማ ከተማ ውስጥ ያሉትን ቅርንጫፎቻችንን ይምረጡና ዝርዝር መረጃዎችን ያግኙ።' : 
             'Explore our primary branches, youth hubs, and outreach spots across Adama City.'}
          </p>
        </div>
        <button 
          onClick={() => setRouteSimulated(prev => !prev)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-md cursor-pointer"
        >
          <Compass className={`w-4 h-4 ${routeSimulated ? 'animate-spin' : ''}`} />
          {routeSimulated 
            ? (lang === 'om' ? 'Daandii Haqulla' : lang === 'am' ? 'መንገድ አጥፋ' : 'Clear Simulated Route') 
            : (lang === 'om' ? 'Hordoffii Daandii' : lang === 'am' ? 'መንገድ አሳይ' : 'Simulate Transport Route')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Map Stage: 7 Columns */}
        <div className="lg:col-span-8 p-6 bg-slate-50 flex flex-col justify-between border-r border-gray-100 relative min-h-[400px]">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 mb-4 z-10">
            {['all', 'main', 'agricultural', 'education', 'women'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                  filterType === type 
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {type === 'all' && (lang === 'om' ? 'Hunda' : lang === 'am' ? 'ሁሉም ምድብ' : 'All Spots')}
                {type === 'main' && (lang === 'om' ? 'Wanta Guddaa' : lang === 'am' ? 'ዋና ቅርንጫፍ' : 'Main HQ')}
                {type === 'agricultural' && (lang === 'om' ? 'Qonnaa' : lang === 'am' ? 'የግብርና ድጋፍ' : 'Agriculture')}
                {type === 'education' && (lang === 'om' ? 'Dargaggoota' : lang === 'am' ? 'ለወጣቶች' : 'Youth & Tech')}
                {type === 'women' && (lang === 'om' ? 'Dubartoota' : lang === 'am' ? 'ለሴቶች' : 'Women Center')}
              </button>
            ))}
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-emerald-50/40 rounded-xl border border-emerald-100/50 overflow-hidden shadow-inner p-2 my-auto">
            <svg viewBox="0 0 500 350" className="w-full h-full select-none text-slate-300">
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#008000" strokeWidth="0.5" strokeOpacity="0.06"/>
                </pattern>
                <linearGradient id="expresswayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d1d5db" />
                  <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* City Map Features (Adama Rivers / Mountains Representation or roads) */}
              {/* Lake / Green Area representation */}
              <path d="M 400,300 C 440,280 480,310 500,290 L 500,350 L 380,350 Z" fill="#22c55e" fillOpacity="0.08" />
              <path d="M 0,40 Q 80,80 150,20 T 300,50" fill="none" stroke="#93c5fd" strokeWidth="4" strokeOpacity="0.3" strokeLinecap="round" />

              {/* Main Roads in Adama */}
              {/* Addis-Adama Expressway connector */}
              <path d="M -10,100 L 180,180 L 510,210" fill="none" stroke="url(#expresswayGrad)" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.7" />
              <path d="M -10,100 L 180,180 L 510,210" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="5,5" strokeLinecap="round" />
              
              {/* Gadaa Avenue */}
              <path d="M 280,20 Q 280,150 280,330" fill="none" stroke="#fcd34d" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.4" />
              <text x="290" y="50" fill="#064e3b" fontSize="8" fontWeight="bold" opacity="0.4" transform="rotate(90 290 50)">GADAA AVENUE</text>

              {/* Station Road */}
              <path d="M 40,320 L 410,110" fill="none" stroke="#d1d5db" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.6" />
              
              {/* Landmarks */}
              <circle cx="180" cy="180" r="14" fill="#10b981" fillOpacity="0.1" />
              <text x="180" y="184" fill="#047857" fontSize="7" textAnchor="middle" fontWeight="bold" opacity="0.6">TRAFFIC CIRCLE</text>

              <rect x="235" y="145" width="25" height="15" rx="3" fill="#cbd5e1" opacity="0.5" />
              <text x="247" y="155" fill="#475569" fontSize="6" textAnchor="middle" opacity="0.7">Geda Hall</text>

              <rect x="420" y="100" width="30" height="15" rx="3" fill="#cbd5e1" opacity="0.5" />
              <text x="435" y="110" fill="#475569" fontSize="6" textAnchor="middle" opacity="0.7">ASTU Campus</text>

              {/* Simulated Route Path */}
              {routeSimulated && (
                <path 
                  d="M 120,120 L 180,180 L 280,190" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeDasharray="8,4" 
                  className="animate-[dash_1.5s_linear_infinite]"
                  style={{
                    animation: 'dash 30s linear infinite',
                    strokeDashoffset: 100
                  }}
                />
              )}

              {/* Render Filtered Locations pins */}
              {filteredLocations.map((loc) => {
                const isSelected = loc.id === selectedId;
                let markerColor = '#10b981'; // green for main
                if (loc.type === 'agricultural') markerColor = '#15803d';
                if (loc.type === 'education') markerColor = '#d97706';
                if (loc.type === 'women') markerColor = '#7c3aed';

                return (
                  <g 
                    key={loc.id} 
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedId(loc.id)}
                    transform={`translate(${loc.coords.x}, ${loc.coords.y})`}
                  >
                    {/* Ring highlight */}
                    {isSelected && (
                      <circle cx="0" cy="0" r="18" fill={markerColor} fillOpacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />
                    )}
                    <circle cx="0" cy="0" r="11" fill={isSelected ? '#ffffff' : markerColor} stroke={markerColor} strokeWidth="3.5" shadow-sm="true" />
                    
                    {/* Icon glyph */}
                    <path 
                      d="M -4,-2 L 4,-2 M -2,2 L 2,2" 
                      stroke={isSelected ? markerColor : '#ffffff'} 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="0" 
                      cy="0" 
                      r="2" 
                      fill={isSelected ? markerColor : '#ffffff'} 
                    />

                    {/* Compact Label */}
                    <text 
                      y="-16" 
                      fill="#1e293b" 
                      fontSize="9" 
                      fontWeight={isSelected ? 'bold' : 'normal'} 
                      textAnchor="middle"
                      className="bg-white px-1 pointer-events-none"
                    >
                      {lang === 'en' ? loc.name_en.substring(0, 16) + '...' : lang === 'om' ? loc.name_om.substring(0, 16) + '...' : loc.name_am.substring(0, 16) + '...'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
            <Info className="w-3 h-3 text-emerald-600" />
            {lang === 'om' ? 'Kariita kana irratti mallattoo nuunni qubannoo filadhu.' : 
             lang === 'am' ? 'የቅርንጫፍ መቆሚያዎችን በመጫን ቀጥተኛ መረጃዎችን ማየት ይችላሉ።' : 
             'Click directly on map markers to view detail sheets.'}
          </div>
        </div>

        {/* Selected Point Metadata Details: 4 Columns */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full ${
                selectedLoc.type === 'main' ? 'bg-emerald-100 text-emerald-800' :
                selectedLoc.type === 'agricultural' ? 'bg-green-100 text-green-800' :
                selectedLoc.type === 'education' ? 'bg-amber-100 text-amber-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {selectedLoc.type === 'main' ? (lang === 'en' ? 'Main HQ Office' : lang === 'om' ? 'Mora Guddaa' : 'ዋና መስሪያ ቤት') :
                 selectedLoc.type === 'agricultural' ? (lang === 'en' ? 'Agri Desk' : lang === 'om' ? 'Qonnaa' : 'የግብርና ድጋፍ') :
                 selectedLoc.type === 'education' ? (lang === 'en' ? 'Training Center' : lang === 'om' ? 'Leenjii' : 'የስልጠና ማዕከል') :
                 (lang === 'en' ? 'Specialized Hub' : lang === 'om' ? 'Wirtuu Dubartoota' : 'ለሴቶች ልዩ ማዕከል')}
              </span>
            </div>

            <h4 className="text-lg font-bold text-gray-900 font-sans tracking-tight mb-2">
              {translate(selectedLoc, 'name')}
            </h4>

            <p className="text-xs text-gray-600 leading-relaxed min-h-[50px] mb-4">
              {translate(selectedLoc, 'description')}
            </p>

            <hr className="border-gray-100 my-3" />

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-gray-400">
                    {lang === 'om' ? 'Teessoo' : lang === 'am' ? 'አድራሻ' : 'Address'}
                  </span>
                  <span className="text-xs text-gray-700 font-medium">
                    {translate(selectedLoc, 'address')}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-gray-400">
                    {lang === 'om' ? 'Sa’aa Hojii' : lang === 'am' ? 'የስራ ሰዓት' : 'Office Hours'}
                  </span>
                  <span className="text-xs text-gray-700 font-medium">
                    {selectedLoc.hours}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-gray-400">
                    {lang === 'om' ? 'Lakk Bilbilaa & Bulchaa' : lang === 'am' ? 'ስልክ እና ኃላፊ' : 'Contact & Officer'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-950 block">
                    {selectedLoc.phone}
                  </span>
                  <span className="text-xs text-gray-500 font-light block">
                    {lang === 'om' ? 'Bulchaa' : lang === 'am' ? 'ኃላፊ' : 'Officer'}: {selectedLoc.manager}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-900 border border-amber-100/60 leading-relaxed flex items-start gap-2">
              <Compass className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>{lang === 'om' ? 'Gorsa Gara Kellaa:' : lang === 'am' ? 'ቅርንጫፉን ለማግኘት:' : 'Navigation Tip:'}</strong>{' '}
                {selectedLoc.type === 'main' 
                  ? (lang === 'en' ? 'Central Adama location accessible via all cross-city bajaj transport lines.' : lang === 'om' ? 'Bajajii hundaan kellaa moraa Gadaa hall biraan salphatti qunnamti.' : 'በማንኛውም ባጃጅ ከገዳ አዳራሽ ጎን በቀላሉ ያገኙታል።')
                  : (lang === 'en' ? 'Located right at ASTU/Industrial Loops with custom outreach signboards.' : lang === 'om' ? 'Yuunivarsitii kellaa dura mallattoo keenya calqasuu dandeessu.' : 'ከአዳማ ሳይንስና ቴክኖሎጂ ዩኒቨርሲቲ ዋና መግቢያ አጠገብ ባለው ምልክት ይመሩ።')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
