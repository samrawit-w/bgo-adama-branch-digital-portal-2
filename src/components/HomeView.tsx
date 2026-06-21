import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Shield, Award, Users, TrendingUp, Landmark, 
  HelpCircle, ChevronRight, FileText, Calendar, HeartHandshake, Smile,
  Image, Camera
} from 'lucide-react';
import { Language, NewsItem, Campaign } from '../types';
import { translations } from '../translations';
import { initialNews, initialCampaigns } from '../data';

interface HomeViewProps {
  lang: Language;
  setCurrentTab: (tab: any) => void;
  setSelectedCampaignId?: (id: string) => void;
}

export function HomeView({ lang, setCurrentTab, setSelectedCampaignId }: HomeViewProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  // States to hold the interactive blank branch photo
  const [branchPhoto, setBranchPhoto] = useState<string>(() => {
    return localStorage.getItem('bgo_adama_branch_photo') || '';
  });
  const [photoInput, setPhotoInput] = useState('');

  const handleInsertPhoto = () => {
    if (photoInput.trim()) {
      setBranchPhoto(photoInput.trim());
      localStorage.setItem('bgo_adama_branch_photo', photoInput.trim());
      setPhotoInput('');
    }
  };

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [resNews, resCamps] = await Promise.all([
          fetch('/api/news').then(r => r.json()),
          fetch('/api/campaigns').then(r => r.json())
        ]);
        setNews(resNews.slice(0, 3)); // Only show latest 3 on homepage
        setCampaigns(resCamps);
      } catch (e) {
        console.error('Lag in API, falling back to static datasets.', e);
        setNews(initialNews);
        setCampaigns(initialCampaigns);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const translateText = (item: any, fieldPrefix: string) => {
    const key = `${fieldPrefix}_${lang}`;
    return item[key] || item[`${fieldPrefix}_en`] || '';
  };

  // Testimonials list
  const testimonials = [
    {
      name: 'Obbo Kabbadaa Asaffaa',
      role: lang === 'om' ? 'Qonnaan Bulaa, Holqa Adaamaa' : lang === 'am' ? 'አትክልት አምራች ገበሬ፣ አዳማ ዙሪያ' : 'Onion & Tomato Farmer, Adama Northern Cluster',
      story_om: 'Liqii Oda q qonnaan bultootaa fudheen xaa’oo fi sanyii filatamaa bitee midhaan koorraa dacha gabaa argadheera. Inshuraansiin haala qilleensaas nan gargaaredha.',
      story_am: 'የ BGO ግብርና ብድርና የመድን ዋስትና ህይወቴን ሙሉ በሙሉ ቀይሮታል። በዝናብ መዘግየት ወቅት የኢንሹራንስ ካሳ ተከፍሎኛል፣ ይህም ኪሳራን አድኖልኛል።',
      story_en: 'The Oda Agricultural loan and Weather insurance allowed me to secure modern irrigation channels. When rain was delayed, BGO compensated me immediately.',
      avatar: ''
    },
    {
      name: 'Chaltu Dajene',
      role: lang === 'om' ? 'Haadha Warshaa Xixiqqoo' : lang === 'am' ? 'የአነስተኛ ሱቅ ባለቤት፣ አዳማ ከተማ' : 'Weaving Cooperative Leader, Adama Market',
      story_om: 'Gareen keenya dubartootaa Siiqqeetiin liqi wabii malee argannaan daldala keenya guddisnee jireenya ijoollee keenyaa salphatti mijeessinee jirra.',
      story_am: 'ሴቶች ተደራጅተን ያገኘነው የሲቄ ብድር ያለ ምንም መያዣ ስለነበር እጅግ ረድቶናል። ዛሬ የሸማ መሸጫ ሱቃችንን ማስፋፋት ችለናል።',
      story_en: 'Through the Siiqqee women joint-finance program, our circle of 5 secured credit with no collateral, allowing us to acquire high-grade wool spinning assets.',
      avatar: ''
    }
  ];

  return (
    <div className="space-y-16 pb-12" id="bgo-home-page-container">
      
      {/* SECTION 1: HERO CORNER banner with cultural pattern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-400">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 to-transparent opacity-45"></div>
        
        {/* Subtle Oromo Oda Branch Traditional SVG outline pattern watermark */}
        <div className="absolute bottom-[-50px] right-[-50px] w-96 h-96 opacity-10 pointer-events-none text-amber-300">
          <Landmark className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 font-extrabold text-[10px] tracking-widest uppercase rounded-full border border-amber-500/30">
              <Shield className="w-3.5 h-3.5" />
              {lang === 'en' ? 'Verified Central Oromia Institution' : lang === 'om' ? 'Walda Mirkanaaye Oromiyaa' : 'ሕጋዊ የማይክሮፋይናንስ ተቋም'}
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-white leading-[1.1] max-w-xl">
              {t('hero.title')}
            </h1>
            
            <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <button 
                onClick={() => setCurrentTab('services')}
                className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-extrabold text-xs tracking-wide uppercase px-6 py-3.5 rounded-xl transition shadow-lg shrink-0 cursor-pointer"
              >
                {t('btn.open_account')}
              </button>
              <button 
                onClick={() => setCurrentTab('services')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs tracking-wide uppercase px-6 py-3.5 rounded-xl transition border border-emerald-600 shadow-md shrink-0 cursor-pointer"
              >
                {t('btn.apply_loan')}
              </button>
              <button 
                onClick={() => setCurrentTab('contribution')}
                className="bg-white hover:bg-slate-100 text-emerald-950 font-extrabold text-xs tracking-wide uppercase px-6 py-3.5 rounded-xl transition shadow-md shrink-0 cursor-pointer"
              >
                {t('btn.make_contribution')}
              </button>
              <button 
                onClick={() => setCurrentTab('contact')}
                className="bg-emerald-900/60 hover:bg-emerald-900 text-amber-400 font-extrabold text-xs tracking-wide uppercase px-6 py-3.5 rounded-xl transition border border-emerald-800 shrink-0 cursor-pointer"
              >
                {t('btn.contact_us')}
              </button>
            </div>
          </div>

          {/* Hero visual promo layout */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="font-semibold text-xs tracking-wide uppercase text-amber-400">Adama Core Updates</span>
                <span className="text-[10px] bg-green-500/20 text-green-400 font-mono text-xs px-2 py-0.5 rounded-full">active-node</span>
              </div>
              <p className="text-xs text-emerald-200 font-light leading-relaxed">
                {lang === 'om' ? 'Qusannoo Bilbilaa "Kallee" mijeessun herrega qusannoo keessan salphatti Adaamaatti akka to’achuu dandeessan beeksifna.' :
                 lang === 'am' ? 'በሞባይል ባንኪንግ አማካኝነት የቁጠባ ሂሳብዎን ከአዳማ ፖርታል ጋር አገናኝተው መቆጣጠር የሚችሉበት አዲስ አሰራር ተጀምሯል።' :
                 'Manage your savings, trace active agricultural insurance updates, and contribute to mutual aid drives via CBE Birr / Telebirr.'}
              </p>
              <div className="bg-emerald-950/70 p-4 rounded-xl border border-emerald-800/80 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">{lang === 'om' ? 'Kaffaltii Baname' : lang === 'am' ? 'የቅርብ ጊዜ መዋጮ' : 'Recent Donation'}</span>
                  <span className="font-mono text-emerald-300 font-semibold">+3,000 ETB</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Member ID</span>
                  <span className="font-mono text-emerald-300">bgo-899-adama</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: METRICS STATISTICS PANEL with gold border */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-150 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative top-[-40px] z-20">
          
          <div className="flex items-center gap-4 border-r border-gray-100 last:border-none p-2 shrink-0">
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl">
              <Users className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-gray-900 font-sans">15,400+</span>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest leading-tight block mt-0.5">{t('stats.members')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-r border-gray-100 last:border-none p-2 shrink-0">
            <div className="p-4 bg-amber-50 text-amber-700 rounded-xl">
              <TrendingUp className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-gray-900 font-sans">120M+</span>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest leading-tight block mt-0.5">{t('stats.loans')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-r border-gray-100 last:border-none p-2 shrink-0">
            <div className="p-4 bg-purple-50 text-purple-700 rounded-xl">
              <Landmark className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-gray-900 font-sans">28,000+</span>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest leading-tight block mt-0.5">{t('stats.savings')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-r border-gray-100 last:border-none p-2 shrink-0">
            <div className="p-4 bg-green-50 text-green-700 rounded-xl">
              <HeartHandshake className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-gray-900 font-sans">48+</span>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest leading-tight block mt-0.5">{t('stats.projects')}</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ABOUT BGO SECTION (Editorial, rich negative space) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Graphic layout of Gadaa Sycamore / Odaa logo representing stability */}
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-black text-emerald-950 font-sans tracking-tight mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-emerald-800" />
                {t('about.title')}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed font-light mb-6">
                Busaa Gonofaa Oromiyaa (BGO) is built upon the timeless Oromo heritage of collective asset pooling to counter droughts, pests, and personal crises. In our Adama Branch, we blend this centuries-old social solidarity with digital microfinance instruments to foster absolute economic resilience.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1.5 bg-amber-500 rounded-full shrink-0"></div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-900 uppercase tracking-tight">{t('about.history_title')}</h5>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed font-light">{t('about.history_text')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision/Mission blocks + Interactive Branch Photo Space */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* Adama Branch Office Photo Space - Beautiful, empty / blank by default */}
            <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between" id="adama-photo-insertion-space">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 flex items-center gap-1.5 font-sans">
                    <Camera className="w-4 h-4 text-amber-500 animate-pulse" />
                    {lang === 'om' ? 'Iddoo Suuraa' : lang === 'am' ? 'የቅርንጫፍ ፎቶ ቦታ' : 'Adama Branch Photo Space'}
                  </span>
                  <span className="text-[9px] bg-amber-50 text-amber-700 font-mono px-2 py-0.5 rounded-full select-none">
                    {branchPhoto ? 'Loaded' : 'Blank Placeholder'}
                  </span>
                </div>

                <div className="relative aspect-[16/9] bg-slate-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex flex-col items-center justify-center transition duration-300 group hover:border-emerald-800/30">
                  {branchPhoto ? (
                    <>
                      <img 
                        src={branchPhoto} 
                        alt="Adama branch" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                      <button 
                        onClick={() => {
                          setBranchPhoto('');
                          localStorage.removeItem('bgo_adama_branch_photo');
                        }}
                        className="absolute bottom-2.5 right-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg shadow-md transition active:scale-95 cursor-pointer z-10"
                      >
                        {lang === 'om' ? 'Haqi' : lang === 'am' ? 'ባዶ አድርግ' : 'Clear Photo'}
                      </button>
                    </>
                  ) : (
                    <div className="p-4 text-center space-y-1.5 flex flex-col items-center">
                      <Image className="w-8 h-8 text-gray-300 group-hover:text-emerald-800 transition duration-300" />
                      <div>
                        <span className="block text-xs font-bold text-gray-700">
                          {lang === 'om' ? 'Suuraa Galchi' : lang === 'am' ? 'ፎቶ ያስገቡ' : 'Insert Photo Area'}
                        </span>
                        <span className="block text-[9px] text-gray-400 font-light max-w-[200px] leading-relaxed mx-auto">
                          {lang === 'om' ? 'Liinki suuraa qabdan asitti dabaluun agarsiisaa' : 
                           lang === 'am' ? 'ሊንክ በመጻፍ ፎቶ መለጠፍ ወይም ባዶ መተው ይችላሉ' : 
                           'Workspace blank slot. Enter any image URL below to insert. Or leave it elegant & blank.'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <input 
                  type="url" 
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  placeholder={lang === 'om' ? 'https://example.com/suuraa.jpg' : lang === 'am' ? 'የፎቶ ሊንክ (https://...)...' : 'Paste photo URL (https://...)'}
                  className="flex-grow text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
                <button
                  onClick={handleInsertPhoto}
                  className="bg-emerald-800 hover:bg-emerald-950 text-white font-extrabold text-[11px] uppercase tracking-wide px-4 py-2 rounded-lg transition shrink-0 cursor-pointer"
                >
                  {lang === 'om' ? 'Galchi' : lang === 'am' ? 'አስገባ' : 'Insert'}
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition shadow-sm">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center font-black text-lg mb-3">★</div>
              <h4 className="font-bold text-base text-gray-900 uppercase tracking-tight mb-2">{t('about.vision_title')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">{t('about.vision_text')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition shadow-sm">
              <div className="w-10 h-10 bg-emerald-105 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center font-black text-lg mb-3">☀</div>
              <h4 className="font-bold text-base text-gray-900 uppercase tracking-tight mb-2">{t('about.mission_title')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">{t('about.mission_text')}</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: FEATURED SUPPORT CAMPAIGNS (Card sliders) */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-amber-600 font-bold tracking-widest text-[10px] uppercase block">URGENT MUTUAL AID</span>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight font-sans mt-0.5">{t('campaigns.title')}</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xl">{t('campaigns.subtitle')}</p>
            </div>
            <button 
              onClick={() => setCurrentTab('contribution')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition cursor-pointer"
            >
              <span>{lang === 'om' ? 'Kka Buusii Hunda' : lang === 'am' ? 'ሁሉንም መጋቢዎች ይመልከቱ' : 'Access Contribution Desk'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaigns.map((camp) => {
              const pct = Math.min(100, Math.round((Number(camp.currentAmount) / Number(camp.targetAmount)) * 100));
              return (
                <div key={camp.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[21/9] bg-slate-100 overflow-hidden flex items-center justify-center">
                      {camp.image ? (
                        <img 
                          src={camp.image} 
                          alt="Campaign image" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-gray-400 p-4">
                          <Image className="w-7 h-7 mb-1 opacity-50 text-emerald-800" />
                          <span className="text-[9px] uppercase font-bold tracking-widest text-[#2f3e46]">{lang === 'om' ? 'Iddoo Suuraa' : lang === 'am' ? 'የፎቶ ቦታ' : 'Photo Space'}</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-emerald-800 text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {camp.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-emerald-800 transition">
                        {translateText(camp, 'title')}
                      </h4>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2 font-light">
                        {translateText(camp, 'description')}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-4">
                    {/* Progress Bar Frame */}
                    <div>
                      <div className="flex justify-between items-center text-[11px] mb-1.5">
                        <span className="text-gray-500 font-light">{t('campaigns.raised')}: <strong>{camp.currentAmount.toLocaleString()} ETB</strong></span>
                        <span className="text-emerald-800 font-extrabold">{pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-150 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-700" style={{ width: `${pct}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1 font-mono uppercase">
                        <span>Target: {camp.targetAmount.toLocaleString()} ETB</span>
                        <span>Ends: {camp.endDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (setSelectedCampaignId) {
                          setSelectedCampaignId(camp.id);
                        }
                        setCurrentTab('contribution');
                      }}
                      className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-lg transition-all text-center block cursor-pointer"
                    >
                      {t('campaigns.donate_btn')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: LATEST PUBLIC NEWS & FINANCIAL LITERACY UPDATES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-emerald-800 font-bold tracking-widest text-[10px] uppercase block">COMMUNICATION PULSE</span>
            <h3 className="text-2xl font-black text-emerald-950 tracking-tight font-sans mt-0.5">{t('news.title')}</h3>
            <p className="text-xs text-gray-500 mt-1">{t('news.subtitle')}</p>
          </div>
          <button 
            onClick={() => setCurrentTab('community')}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition cursor-pointer"
          >
            <span>{lang === 'om' ? 'Oduu Hunda Dubbisi' : lang === 'am' ? 'ዜናዎችን በሙሉ አንብብ' : 'View All Announcements'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt="Thumbnail" 
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[16/10] object-cover" 
                  />
                ) : (
                  <div className="w-full aspect-[16/10] flex flex-col items-center justify-center bg-slate-50 text-gray-400 p-4 border-b border-gray-100">
                    <Image className="w-7 h-7 mb-1 opacity-50 text-emerald-800" />
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#2f3e46]">{lang === 'om' ? 'Iddoo Suuraa' : lang === 'am' ? 'የፎቶ ቦታ' : 'Photo Space'}</span>
                  </div>
                )}
                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                    <span className="uppercase text-emerald-800 font-semibold">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2">
                    {translateText(item, 'title')}
                  </h4>
                  <p className="text-xs text-gray-500 block leading-relaxed line-clamp-3 font-light">
                    {translateText(item, 'content')}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-50 mt-4">
                <button
                  onClick={() => setCurrentTab('community')}
                  className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('news.read_more')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: SUCCESS STORIES TESTIMONIALS */}
      <section className="bg-emerald-950 text-white py-16 border-y-2 border-amber-400 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-700 opacity-10 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-amber-400 font-bold text-[10px] tracking-widest uppercase block mb-2">SHARED PROGRESS</span>
          <h3 className="text-2xl font-black font-sans tracking-tight mb-2">Member Success Stories</h3>
          <p className="text-xs text-emerald-200/80 max-w-xl mx-auto mb-12">
            Real testimonies of Adama agriculturalists and enterprise mothers empowered by Busaa Gonofaa funds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {testimonials.map((test, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-3xl text-amber-400 font-serif leading-none block mb-2">“</span>
                  <p className="text-xs sm:text-sm text-emerald-100 font-light leading-relaxed italic mb-4">
                    {lang === 'om' ? test.story_om : lang === 'am' ? test.story_am : test.story_en}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  {test.avatar ? (
                    <img 
                      src={test.avatar} 
                      alt="Member avatar" 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-amber-400/35 shrink-0" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-800 text-amber-400 border border-amber-400/35 shrink-0 flex items-center justify-center font-bold text-xs">
                      {test.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="block font-bold text-xs tracking-tight text-white">{test.name}</span>
                    <span className="block text-[10px] text-amber-400 font-light font-sans mt-0.5">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
