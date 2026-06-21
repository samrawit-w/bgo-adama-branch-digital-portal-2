import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, Trash2, Mail, CheckCircle, Award, 
  TrendingUp, Users, DollarSign, Calendar, FileText,
  BarChart3, RefreshCw, Layers
} from 'lucide-react';
import { Language, NewsItem, CommunityEvent, Contribution, ContactMessage } from '../types';

interface AdminPanelProps {
  lang: Language;
}

export function AdminPanel({ lang }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'events' | 'messages' | 'donations' | 'analytics'>('analytics');
  
  // Data State
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [stats, setStats] = useState({
    totalContributed: 0,
    activeCampaigns: 0,
    totalDonors: 0,
    totalContacts: 0,
    unreadContacts: 0
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form States - News
  const [newsTitleEn, setNewsTitleEn] = useState('');
  const [newsTitleOm, setNewsTitleOm] = useState('');
  const [newsTitleAm, setNewsTitleAm] = useState('');
  const [newsContentEn, setNewsContentEn] = useState('');
  const [newsContentOm, setNewsContentOm] = useState('');
  const [newsContentAm, setNewsContentAm] = useState('');
  const [newsCategory, setNewsCategory] = useState<'announcement' | 'education' | 'update'>('announcement');
  const [newsImage, setNewsImage] = useState('');

  // Form States - Events
  const [eventTitleEn, setEventTitleEn] = useState('');
  const [eventTitleOm, setEventTitleOm] = useState('');
  const [eventTitleAm, setEventTitleAm] = useState('');
  const [eventDescEn, setEventDescEn] = useState('');
  const [eventDescOm, setEventDescOm] = useState('');
  const [eventDescAm, setEventDescAm] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocEn, setEventLocEn] = useState('');
  const [eventLocOm, setEventLocOm] = useState('');
  const [eventLocAm, setEventLocAm] = useState('');
  const [eventCategory, setEventCategory] = useState<'meeting' | 'training' | 'celebration'>('meeting');

  // Load backend content
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resNews, resEvents, resMsgs, resCont, resStats] = await Promise.all([
        fetch('/api/news').then(r => r.json()),
        fetch('/api/events').then(r => r.json()),
        fetch('/api/messages').then(r => r.json()),
        fetch('/api/contributions').then(r => r.json()),
        fetch('/api/analytics').then(r => r.json())
      ]);

      setNews(resNews);
      setEvents(resEvents);
      setMessages(resMsgs);
      setContributions(resCont);
      setStats(resStats);
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Creation Handlers
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitleEn || !newsContentEn) {
      alert('Please fill at least the English fields.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_en: newsTitleEn,
          title_om: newsTitleOm || newsTitleEn,
          title_am: newsTitleAm || newsTitleEn,
          content_en: newsContentEn,
          content_om: newsContentOm || newsContentEn,
          content_am: newsContentAm || newsContentEn,
          category: newsCategory,
          image: newsImage || ''
        })
      });

      if (res.ok) {
        // Clear
        setNewsTitleEn('');
        setNewsTitleOm('');
        setNewsTitleAm('');
        setNewsContentEn('');
        setNewsContentOm('');
        setNewsContentAm('');
        setNewsImage('');
        fetchData();
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitleEn || !eventDate) {
      alert('Please fill at least the Title and Date.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_en: eventTitleEn,
          title_om: eventTitleOm || eventTitleEn,
          title_am: eventTitleAm || eventTitleEn,
          description_en: eventDescEn,
          description_om: eventDescOm || eventDescEn,
          description_am: eventDescAm || eventDescEn,
          date: eventDate,
          time: eventTime || '09:00 AM - 05:00 PM',
          location_en: eventLocEn,
          location_om: eventLocOm || eventLocEn,
          location_am: eventLocAm || eventLocEn,
          category: eventCategory
        })
      });

      if (res.ok) {
        setEventTitleEn('');
        setEventTitleOm('');
        setEventTitleAm('');
        setEventDescEn('');
        setEventDescOm('');
        setEventDescAm('');
        setEventDate('');
        setEventTime('');
        setEventLocEn('');
        setEventLocOm('');
        setEventLocAm('');
        fetchData();
      }
    } catch (error) {
      console.error('Event save error:', error);
    } finally {
      setSaving(false);
    }
  };

  // Actions
  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkMessageRead = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}/read`, { method: 'POST' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const translateLabel = (om: string, am: string, en: string) => {
    if (lang === 'om') return om;
    if (lang === 'am') return am;
    return en;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6" id="bgo-cms-control-panel">
      {/* Title */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-amber-600 font-bold tracking-widest text-xs uppercase block">ADMINISTRATOR CMS</span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight font-sans mt-1">
            {translateLabel('Teessoo Bulchiinsa CMS', 'የሲኤምኤስ አስተዳደር ሰሌዳ', 'Portal Administration & CMS')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {translateLabel('Oduu, sagantaalee fi gabaasa kaffaltii jireenya maamiloota Adaamaa dhihotti sarari.',
                           'ማስታወቂያዎችን፣ መጪ ስብሰባዎችን፣ መዋጮዎችንና መልዕክቶችን በቅጽበት መቆጣጠሪያ ፓነል።',
                           'Publish branch updates, manage local mutual aid donations, and review community logs.')}
          </p>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow cursor-pointer focus:ring-4 focus:ring-emerald-100"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {lang === 'om' ? 'Haaromsi' : lang === 'am' ? 'አድስ' : 'Refresh Data'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CRM sidebar navigation: 3 Columns */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'analytics', label: translateLabel('Gabaasa Xiinxalaa', 'ዳሽቦርድ', 'Dashboard & Reports'), icon: BarChart3 },
            { id: 'news', label: translateLabel('Oduu & Gorsa', 'ዜና ማስተዳደሪያ', 'Manage News Catalog'), icon: FileText },
            { id: 'events', label: translateLabel('Sagantaalee & Yaali', 'ክንዋኔዎች ማውጫ', 'Events & Trainings'), icon: Calendar },
            { id: 'messages', label: translateLabel('Ergaalee Dhufe', 'የደንበኞች መልእክት', 'Incoming Inquiries'), icon: Mail, count: stats.unreadContacts },
            { id: 'donations', label: translateLabel('Buusii Maamilootaa', 'የመዋጮ ዝርዝር', 'Contributions Audit'), icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left flex items-center justify-between p-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-800 text-white shadow-md transform translate-x-1' 
                    : 'bg-white text-gray-600 hover:bg-emerald-50/50 border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-red-500 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="bg-emerald-950 text-white rounded-2xl p-5 mt-8 border border-emerald-900 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h5 className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1">Secure Sign-On</h5>
              <p className="text-[11px] text-emerald-200 leading-relaxed font-light">
                Logged in as branch administrator. Changes made are reflected instantly for Adama portal visitors.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-[10px] font-mono lowercase tracking-wider text-emerald-300">branch-node-online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic CMS Workspace Panels: 9 Columns */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: ANALYTICS & REPORTS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Contributions</span>
                    <span className="text-xl font-extrabold text-gray-900 font-sans block mt-1">{stats.totalContributed.toLocaleString()} ETB</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-amber-50 text-amber-700">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Active Support Drives</span>
                    <span className="text-xl font-extrabold text-gray-900 block mt-1">{stats.activeCampaigns} Drive(s)</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-purple-50 text-purple-700">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Digital Donors</span>
                    <span className="text-xl font-extrabold text-gray-900 block mt-1">{stats.totalDonors} Members</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-blue-50 text-blue-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Contact Enquiries</span>
                    <span className="text-xl font-extrabold text-gray-900 block mt-1">
                      {stats.totalContacts} total <span className="text-xs text-red-500 font-semibold">({stats.unreadContacts} new)</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphical Insights (Simulated SVG Chart) */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  Branch Contribution & Community Growth Index (Weekly)
                </h4>
                <div className="w-full aspect-[2.5/1] min-h-[220px] bg-slate-50 rounded-xl relative p-4 flex flex-col justify-between">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-30 pointer-events-none">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-b border-dashed border-gray-300 w-full"></div>
                    ))}
                  </div>

                  {/* SVG Chart Area */}
                  <div className="w-full h-[150px] relative mt-2 z-10">
                    <svg viewBox="0 0 500 150" className="w-full h-full">
                      {/* Trend Area */}
                      <path 
                        d="M 10,130 Q 100,110 180,70 T 350,50 T 490,15 L 490,140 L 10,140 Z" 
                        fill="url(#chartGrad)" 
                        opacity="0.15" 
                      />
                      {/* Trend Line */}
                      <path 
                        d="M 10,130 Q 100,110 180,70 T 350,50 T 490,15" 
                        fill="none" 
                        stroke="#059669" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                      
                      {/* Points */}
                      <circle cx="10" cy="130" r="4" fill="#047857" />
                      <circle cx="180" cy="70" r="4" fill="#047857" />
                      <circle cx="350" cy="50" r="5" fill="#d97706" />
                      <circle cx="490" cy="15" r="5" fill="#047857" />

                      <text x="350" y="32" fill="#d97706" fontSize="8" fontWeight="bold" textAnchor="middle">CBE Birr Rollout</text>

                      {/* Gradients */}
                      <defs>
                        <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Horizontal Labels */}
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-2 border-t border-gray-100 z-10">
                    <span>Week 1 (May)</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4 (June)</span>
                    <span>Week 5 (Current)</span>
                  </div>
                </div>
              </div>

              {/* Action Board (Bento Box cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Micro-insurance quick counter */}
                <div className="bg-gradient-to-br from-emerald-850 to-emerald-950 text-white rounded-2xl p-6 shadow-sm border border-emerald-900">
                  <h4 className="text-sm font-semibold tracking-wider text-amber-400 uppercase mb-3">Weather-Index Auto Protection</h4>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-4xl font-black font-sans block">1,248</span>
                      <span className="text-xs text-emerald-200 mt-1 block font-light">Subscribers Registered inside Adama Sector</span>
                    </div>
                    <Award className="w-12 h-12 text-yellow-400 opacity-60" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-emerald-800/80 flex justify-between text-xs text-emerald-100">
                    <span>Target Coverage: 2,000</span>
                    <span>Status: 62% Completed</span>
                  </div>
                </div>

                {/* News & Communication Coverage */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 uppercase mb-2">Multilingual Publishing Activity</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Your published news is automatically distributed in Afaan Oromo, Amharic, and English. Keep the portal fresh to build regional digital engagement.
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] px-2.5 py-1 rounded-full font-bold">OM (%100 Complete)</span>
                    <span className="bg-amber-50 text-amber-800 text-[10px] px-2.5 py-1 rounded-full font-bold">AM (%100 Complete)</span>
                    <span className="bg-sky-50 text-sky-800 text-[10px] px-2.5 py-1 rounded-full font-bold">EN (%100 Complete)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NEWS CATALOG MANAGEMENT */}
          {activeTab === 'news' && (
            <div className="space-y-8">
              {/* Creation Form */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-800" />
                  Publish New Article or Advisory
                </h4>
                <form onSubmit={handleCreateNews} className="space-y-4">
                  {/* Category & Thumbnail */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Catalog Category</label>
                      <select 
                        value={newsCategory} 
                        onChange={(e: any) => setNewsCategory(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      >
                        <option value="announcement">Official Announcement</option>
                        <option value="education">Financial Education / Literacy</option>
                        <option value="update">Policy Update & Insights</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Photo URL (Optional)</label>
                      <input 
                        type="url" 
                        placeholder="https://images.unsplash.com/..." 
                        value={newsImage} 
                        onChange={(e) => setNewsImage(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Title Translations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Title (English) *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Adama Branch expands fertilizer loan rules" 
                        value={newsTitleEn} 
                        onChange={(e) => setNewsTitleEn(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Mata Duree (Afaan Oromo)</label>
                      <input 
                        type="text" 
                        placeholder="Dameen Adaamaa tajaajila babal ise" 
                        value={newsTitleOm} 
                        onChange={(e) => setNewsTitleOm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">የዜና ርዕስ (አማርኛ)</label>
                      <input 
                        type="text" 
                        placeholder="የአዳማው ቅርንጫፍ የብድር አገልግሎቱን አስፋፋ" 
                        value={newsTitleAm} 
                        onChange={(e) => setNewsTitleAm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Content Translations */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Content description (English) *</label>
                      <textarea 
                        rows={3} 
                        required 
                        placeholder="English content details..." 
                        value={newsContentEn} 
                        onChange={(e) => setNewsContentEn(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Guutuu Oduu (Afaan Oromo)</label>
                      <textarea 
                        rows={3} 
                        placeholder="Barreeffama Afaan Oromoo..." 
                        value={newsContentOm} 
                        onChange={(e) => setNewsContentOm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">ዝርዝር መግለጫ (አማርኛ)</label>
                      <textarea 
                        rows={3} 
                        placeholder="የአማርኛ ዝርዝር ዜና መጣጥፍ..." 
                        value={newsContentAm} 
                        onChange={(e) => setNewsContentAm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={saving}
                    className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition disabled:opacity-40 cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Publish Article'}
                  </button>
                </form>
              </div>

              {/* News List */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-base font-bold text-gray-900 mb-4">Published Articles ({news.length})</h4>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition border border-gray-100">
                      <div className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt="Thumbnail" 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-lg object-cover shrink-0 border border-gray-100" 
                        />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-800">{item.category}</span>
                          <h5 className="font-bold text-sm text-gray-900 mt-0.5">{item.title_en}</h5>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.content_en}</p>
                          <span className="text-[10px] text-gray-400 block mt-1">{item.date}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteNews(item.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {news.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No news articles found. Publish one above!</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS MANAGEMENT */}
          {activeTab === 'events' && (
            <div className="space-y-8">
              {/* Creation Form */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-800" />
                  Schedule Upcoming Assembly / Training
                </h4>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Event Category</label>
                      <select 
                        value={eventCategory} 
                        onChange={(e: any) => setEventCategory(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      >
                        <option value="meeting">Community Meeting / Audit</option>
                        <option value="training">Financial Literacy Training</option>
                        <option value="celebration">Cultural & Award Ceremony</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Scheduled Date *</label>
                      <input 
                        type="date" 
                        required 
                        value={eventDate} 
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Time Slot</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 09:00 AM - 12:00 PM" 
                        value={eventTime} 
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Title Translations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Event Title (English) *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Adama Tomato Cooperative Financial Literacy Class" 
                        value={eventTitleEn} 
                        onChange={(e) => setEventTitleEn(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Maqaa Qophii (Afaan Oromo)</label>
                      <input 
                        type="text" 
                        placeholder="Maqaa Qophii" 
                        value={eventTitleOm} 
                        onChange={(e) => setEventTitleOm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">የስብሰባው ርዕስ (አማርኛ)</label>
                      <input 
                        type="text" 
                        placeholder="የአማርኛ ርዕስ" 
                        value={eventTitleAm} 
                        onChange={(e) => setEventTitleAm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Location Translations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Location (English) *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Adama Branch Conference Suite, 2nd Floor" 
                        value={eventLocEn} 
                        onChange={(e) => setEventLocEn(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Bakka Qophii (Afaan Oromo)</label>
                      <input 
                        type="text" 
                        placeholder="Galma keenya" 
                        value={eventLocOm} 
                        onChange={(e) => setEventLocOm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">ክፍለ ከተማ / አዳራሽ (አማርኛ)</label>
                      <input 
                        type="text" 
                        placeholder="የስብሰባው አዳራሽ ስም" 
                        value={eventLocAm} 
                        onChange={(e) => setEventLocAm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Details (English)</label>
                      <textarea 
                        rows={2} 
                        placeholder="Target group, curriculum, etc." 
                        value={eventDescEn} 
                        onChange={(e) => setEventDescEn(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Ibsa Qophii (Afaan Oromo)</label>
                      <textarea 
                        rows={2} 
                        placeholder="Garee kaayeffame..." 
                        value={eventDescOm} 
                        onChange={(e) => setEventDescOm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">ዝርዝር መግለጫ (አማርኛ)</label>
                      <textarea 
                        rows={2} 
                        placeholder="ስብሰባው የሚካሄደው ለማን ነው..." 
                        value={eventDescAm} 
                        onChange={(e) => setEventDescAm(e.target.value)}
                        className="w-full text-xs rounded-lg border border-gray-200 p-2 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={saving}
                    className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition disabled:opacity-40 cursor-pointer"
                  >
                    {saving ? 'Scheduling...' : 'Schedule Event'}
                  </button>
                </form>
              </div>

              {/* Events List */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-base font-bold text-gray-900 mb-4">Active Schedule ({events.length})</h4>
                <div className="space-y-4">
                  {events.map((evt) => (
                    <div key={evt.id} className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 transition border border-gray-100">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          {evt.category}
                        </span>
                        <h5 className="font-bold text-sm text-gray-900 mt-1">{evt.title_en}</h5>
                        <p className="text-xs text-gray-500 mt-0.5">{evt.date} @ {evt.time} | Location: {evt.location_en}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteEvent(evt.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No scheduled events. Create one above!</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h4 className="text-base font-bold text-gray-900">User Message Inboxes (Adama Digital Desk)</h4>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`p-5 rounded-xl border transition-all ${
                      msg.status === 'unread' ? 'border-l-4 border-l-amber-500 bg-amber-50/20 border-gray-200' : 'border-gray-150 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <span className="font-bold text-sm text-gray-900 block">{msg.name}</span>
                        <span className="text-xs font-mono text-emerald-800 block mt-0.5">&lt;{msg.email}&gt;</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {msg.status === 'unread' && (
                          <button 
                            onClick={() => handleMarkMessageRead(msg.id)}
                            className="bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200 text-[10px] px-2.5 py-1 rounded-full transition flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Mark Read
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-amber-900 font-semibold mb-2">Subject: {msg.subject}</div>
                    <p className="text-xs text-gray-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-gray-100 font-light">
                      "{msg.message}"
                    </p>
                    <span className="text-[10px] text-gray-400 block mt-2 text-right">
                      Received: {new Date(msg.date).toLocaleString()}
                    </span>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-xs text-gray-400 italic py-6 text-center">No contact inquiries found. Clean slate!</div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DONATIONS & LEDGER AUDIT */}
          {activeTab === 'donations' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-base font-bold text-gray-900">Digital Contribution Ledger (Audited)</h4>
                <span className="bg-emerald-600 text-white font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-wider">
                  CBE Birr & Telebirr synchronized
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-slate-50 text-gray-400 font-semibold text-[10px] uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="p-3">Reference / Date</th>
                      <th className="p-3">Full Donor Name</th>
                      <th className="p-3">Category/Campaign ID</th>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3 text-right">Amount (ETB)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contributions.map((cont) => (
                      <tr key={cont.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3">
                          <span className="font-mono font-semibold block text-emerald-950">{cont.id}</span>
                          <span className="text-[9px] text-gray-400 font-light block mt-0.5">{new Date(cont.date).toLocaleDateString()}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-gray-900">{cont.fullName}</span>
                          <span className="text-[10px] text-gray-400 block mt-0.5 font-light">{cont.phone || 'No phone'}</span>
                        </td>
                        <td className="p-3">
                          <span className="capitalize bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium text-[10px]">
                            {cont.purpose === 'camp-1' ? 'Agri Seed Relief' : cont.purpose === 'camp-2' ? 'Women empowerment' : 'General Care Fund'}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-slate-700 capitalize">
                          {cont.paymentMethod === 'cbe_birr' ? 'CBE Birr API' : cont.paymentMethod === 'telebirr' ? 'Telebirr Wallet' : 'Bank Direct'}
                        </td>
                        <td className="p-3 text-right font-extrabold text-emerald-950 text-sm">
                          {cont.amount.toLocaleString()} ETB
                        </td>
                      </tr>
                    ))}
                    {contributions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-gray-400 italic">No registrations found. Submit donations via Contribution Tab.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
