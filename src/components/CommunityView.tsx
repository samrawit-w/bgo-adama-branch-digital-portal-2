import React, { useState, useEffect } from 'react';
import { 
  Calendar, FileText, Image, Film, LayoutGrid, HeartHandshake, 
  MapPin, Clock, Search, BookOpen, AlertCircle
} from 'lucide-react';
import { Language, NewsItem, CommunityEvent } from '../types';
import { translations } from '../translations';
import { initialNews, initialEvents } from '../data';

interface CommunityViewProps {
  lang: Language;
}

interface GalleryItem {
  id: string;
  type: 'photo' | 'video' | 'event';
  title_om: string;
  title_am: string;
  title_en: string;
  image: string;
}

const communityGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    type: 'photo',
    title_om: 'Kora Abbootii Gadaa Adaamaa',
    title_am: 'የአዳማ ገዳ ባህላዊ በአል ስነስርዓት',
    title_en: 'Oda Assembly & Gadaa Blessings inside Adama Central',
    image: ''
  },
  {
    id: 'gal-2',
    type: 'photo',
    title_om: 'Moora Qonnaa Misooma Midhaan Shawaa',
    title_am: 'የአዳማ አቅራቢያ የገበሬዎች መኸር ምርት',
    title_en: 'Tomato & Onion Harvesting in rural East Shewa',
    image: ''
  },
  {
    id: 'gal-3',
    type: 'video',
    title_om: 'Viidiyoo Marsariitii Barnoota Maallaqa BGO',
    title_am: 'የወጣቶች ቁጠባ ድረገጽ ስልጠና ቪዲዮ',
    title_en: 'Video Profile: Digital Banking & Gadaa Mutual Aid',
    image: ''
  },
  {
    id: 'gal-4',
    type: 'event',
    title_om: 'Badhaasa Dubartoota Suuqii Xixiqqa',
    title_am: 'የስኬታማ ሴት ብድር ተጠቃሚዎች ሽልማት',
    title_en: 'Siiqqee Cooperative Joint-Liability Award Day',
    image: ''
  },
  {
    id: 'gal-5',
    type: 'photo',
    title_om: 'Galmeessa Miseensota Damee Adaamaa New',
    title_am: 'የአዳማ ቅርንጫፍ አዳዲስ አባላት ምዝገባ',
    title_en: 'Active Registration of 500+ Youth saving members',
    image: ''
  },
  {
    id: 'gal-6',
    type: 'video',
    title_om: 'Gabaasa Teeso BGO dhiho',
    title_am: 'ስለ አየር ሁኔታ መድን የተዘጋጀ አጭር ፊልም',
    title_en: 'Climate Resilience: Satellite Weather Index Index Payout Film',
    image: ''
  }
];

export function CommunityView({ lang }: CommunityViewProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'photo' | 'video' | 'event'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const [resNews, resEvts] = await Promise.all([
          fetch('/api/news').then(r => r.json()),
          fetch('/api/events').then(r => r.json())
        ]);
        setNews(resNews);
        setEvents(resEvts);
      } catch (e) {
        console.error('Failed to load live catalog, using static backup.', e);
        setNews(initialNews);
        setEvents(initialEvents);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunityData();
  }, []);

  const translateItem = (item: any, field: string) => {
    const key = `${field}_${lang}`;
    return item[key] || item[`${field}_en`] || '';
  };

  const filteredGallery = galleryFilter === 'all'
    ? communityGallery
    : communityGallery.filter((item) => item.type === galleryFilter);

  // Combine News and Events search matches
  const matchedNews = news.filter((n) => {
    const term = searchTerm.toLowerCase();
    return (
      translateItem(n, 'title').toLowerCase().includes(term) ||
      translateItem(n, 'content').toLowerCase().includes(term) ||
      n.category.toLowerCase().includes(term)
    );
  });

  const matchedEvents = events.filter((e) => {
    const term = searchTerm.toLowerCase();
    return (
      translateItem(e, 'title').toLowerCase().includes(term) ||
      translateItem(e, 'description').toLowerCase().includes(term) ||
      translateItem(e, 'location').toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="bgo-community-media-page">
      
      {/* Search Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-8">
        <div>
          <span className="text-amber-600 font-bold tracking-widest text-[10px] uppercase block">COMMUNITY COMMUNION</span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight font-sans mt-0.5">{t('community.title')}</h2>
          <p className="text-xs text-gray-500 mt-1">Read regional news, discover upcoming workshops, and filter cultural media assets.</p>
        </div>
        
        {/* Search Input bar */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="search" 
            placeholder="Search news, events, advisory..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-700 outline-none transition"
          />
        </div>
      </div>

      {loading && (
        <div className="py-12 text-center text-xs text-emerald-800 font-semibold animate-pulse">
          Fetching regional media and calendar archives...
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Column: News & Announcements (8/12 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-lg font-extrabold text-emerald-950 font-sans tracking-tight border-b border-gray-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              Adama Branch Newsroom
            </h3>

            <div className="space-y-6">
              {matchedNews.map((n) => (
                <div 
                  key={n.id} 
                  className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition grid grid-cols-1 md:grid-cols-12"
                  id={`news-card-${n.id}`}
                >
                  <div className="md:col-span-4 relative aspect-video md:aspect-auto">
                    {n.image ? (
                      <img 
                        src={n.image} 
                        alt="Thumbnail" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-slate-100 text-gray-400 p-4">
                        <Image className="w-6 h-6 mb-1 opacity-50 text-emerald-800" />
                        <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-950">{lang === 'om' ? 'Iddoo Suuraa' : lang === 'am' ? 'የፎቶ ቦታ' : 'Photo Space'}</span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-8 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 uppercase">
                        <span className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded font-bold">{n.category}</span>
                        <span>{n.date}</span>
                      </div>
                      <h4 className="font-extrabold text-base text-gray-900 leading-snug">
                        {translateItem(n, 'title')}
                      </h4>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">
                        {translateItem(n, 'content')}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-[11px]">
                      <span className="text-gray-400 font-mono">ID: BGO-{n.id.toUpperCase()}</span>
                      <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded cursor-help">
                        {lang === 'om' ? 'Afaan Oromoon Mirgiti' : lang === 'am' ? 'በአማርኛ የቀረበ' : 'Afaan Oromo / Amharic / English'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {matchedNews.length === 0 && (
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-center gap-3 text-xs text-amber-900">
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-700" />
                  <span>No articles fit your search criteria. Check your query spelling or search simpler items.</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column: Events & Calendar (4/12 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-lg font-extrabold text-emerald-950 font-sans tracking-tight border-b border-gray-100 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              {t('community.events_title')}
            </h3>

            <div className="space-y-5">
              {matchedEvents.map((evt) => (
                <div 
                  key={evt.id} 
                  className="bg-white rounded-2xl border border-gray-150 p-5 shadow-sm space-y-3 hover:border-amber-400 transition"
                  id={`event-card-${evt.id}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="bg-amber-50 text-amber-800 uppercase font-bold text-[9px] px-2.5 py-0.5 rounded tracking-wide font-sans">
                      {evt.category}
                    </span>
                    <span className="text-red-500 font-black text-xs uppercase text-right leading-none block">
                      {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 leading-snug">
                    {translateItem(evt, 'title')}
                  </h4>

                  <p className="text-xs text-gray-600 font-light leading-relaxed italic border-l-2 border-amber-400 pl-2.5">
                    "{translateItem(evt, 'description')}"
                  </p>

                  <div className="pt-3 border-t border-gray-50 space-y-1.5 text-[11px] text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{translateItem(evt, 'location')}</span>
                    </div>
                  </div>
                </div>
              ))}

              {matchedEvents.length === 0 && (
                <div className="bg-slate-50 border border-gray-200 p-6 rounded-2xl text-center text-xs text-gray-400 italic">
                  No upcoming events scheduled right now.
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Filterable Media Gallery Section */}
      <div className="space-y-8 pt-6 border-t border-gray-150">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div>
            <span className="text-amber-600 font-bold tracking-widest text-[10px] uppercase block">MEDIA REPOSITORY</span>
            <h3 className="text-xl font-black text-emerald-950 font-sans tracking-tight">{t('community.gallery_title')}</h3>
          </div>

          {/* Filter Sub-headers */}
          <div className="flex bg-slate-50 p-1 rounded-xl border border-gray-200 gap-1 overflow-x-auto shrink-0">
            {[
              { id: 'all', label: t('community.gallery_all'), icon: LayoutGrid },
              { id: 'photo', label: t('community.gallery_photos'), icon: Image },
              { id: 'video', label: t('community.gallery_videos'), icon: Film },
              { id: 'event', label: t('community.gallery_events'), icon: HeartHandshake }
            ].map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setGalleryFilter(f.id as any)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-tight transition cursor-pointer ${
                    galleryFilter === f.id 
                      ? 'bg-emerald-800 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-emerald-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-sm relative aspect-[4/3]"
              id={`gallery-${item.id}`}
            >
              {item.image ? (
                <img 
                  src={item.image} 
                  alt="Gallery item image" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-gray-400 p-4">
                  <Image className="w-6 h-6 mb-1 opacity-50 text-emerald-800" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-950">{lang === 'om' ? 'Iddoo Suuraa' : lang === 'am' ? 'የፎቶ ቦታ' : 'Photo Space'}</span>
                </div>
              )}
              {/* Type Indicator */}
              <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-amber-400 font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1 z-10 border border-white/10">
                {item.type === 'video' ? <Film className="w-2.5 h-2.5" /> : item.type === 'photo' ? <Image className="w-2.5 h-2.5" /> : <HeartHandshake className="w-2.5 h-2.5" />}
                {item.type}
              </span>

              {/* Hover Bottom Title Board */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent flex items-end p-5 opacity-80 group-hover:opacity-100 transition duration-300">
                <div>
                  <h4 className="text-white font-extrabold text-sm font-sans tracking-tight leading-snug">
                    {lang === 'om' ? item.title_om : lang === 'am' ? item.title_am : item.title_en}
                  </h4>
                  <span className="text-[10px] text-amber-400 block mt-1 font-mono uppercase">bgo-adama-archive</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
