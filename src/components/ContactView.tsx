import React, { useState } from 'react';
import { 
  Phone, Mail, Clock, MapPin, CheckCircle, Send, Loader2, Info, Landmark 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { InteractiveMap } from './InteractiveMap';

interface ContactViewProps {
  lang: Language;
}

export function ContactView({ lang }: ContactViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        alert('Server returned error response.');
      }
    } catch (err) {
      console.error(err);
      alert('Network request failed. Try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="bgo-contact-view-page">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-amber-600 font-bold tracking-widest text-[10px] uppercase block">DIRECT CHANNELS</span>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight font-sans mt-0.5">{t('contact.title')}</h2>
        <p className="text-xs text-gray-500 mt-1 max-w-lg mx-auto">{t('contact.subtitle')}</p>
      </div>

      {/* Grid: Coordinates Boxes vs. Direct Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="coord-grid">
        
        {/* Branch Info Coordinates (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-gray-100 pb-3">Official Branch Coordinates</h4>
            
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('contact.address_label')}</span>
                  <p className="text-xs text-gray-700 leading-normal mt-0.5 font-medium">
                    {lang === 'om' ? 'Kellaa Galma Gadaa Lafa Bira, Karaa Gadaa Block 4, Adaamaa, Oromiyaa' :
                     lang === 'am' ? 'ገዳ አደባባይ ፎቅ 4፣ አዳማ ከተማ፣ ምስራቅ ሸዋ፣ ኢትዮጵያ' :
                     'Near Geda Hall, Gadaa Avenue, Block 4, Adama, East Shewa, Ethiopia'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-lg shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('contact.phone_label')}</span>
                  <p className="text-xs text-gray-700 leading-normal mt-0.5 font-semibold">
                    +251 22 111 8979 / Hotline
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-purple-50 text-purple-700 rounded-lg shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('contact.email_label')}</span>
                  <p className="text-xs text-slate-700 leading-normal mt-0.5 font-mono">
                    adama.branch@bgo-oromiyaa.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('contact.hours_label')}</span>
                  <span className="block text-xs text-gray-700 font-medium mt-0.5">
                    {lang === 'om' ? 'Wiixata - Jimaata (Ibsa 8:00 AM - 5:00 PM)' : lang === 'am' ? 'ከሰኞ - አርብ (ከጠዋቱ 2:00 - እስከ ማታ 11:00 የስራ ሰዓት)' : 'Monday - Friday (8:00 AM - 5:00 PM)'}
                  </span>
                  <span className="block text-[10px] text-gray-400 font-light mt-0.5">
                    {lang === 'om' ? 'Sanbata Gg. (8:00 AM - 12:00 PM)' : lang === 'am' ? 'ቅዳሜ ግማሽ ቀን (ከጠዋቱ 2:00 - እስከ ሰዓት 6:00)' : 'Saturday (8:00 AM - 12:00 PM)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 text-amber-950 flex gap-3 leading-relaxed">
            <Info className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" />
            <div className="text-xs leading-relaxed font-light">
              <strong>Counseling desk visits:</strong> No pre-booking is required for standard microfinance inquiries. Bring your residential ID cards for seamless customer profile activation.
            </div>
          </div>
        </div>

        {/* Message Form (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm">
          <h4 className="text-base font-bold text-gray-900 mb-4 font-sans tracking-tight">{t('contact.form_title')}</h4>

          {success ? (
            <div className="text-center py-8 space-y-4" id="feedback-success">
              <div className="mx-auto w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div>
                <h5 className="text-base font-bold text-gray-900">Message Transmitted Successfully!</h5>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Thank you for editing contact feedback. Your submission database record was written dynamically. A BGO agent will review it shortly.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs px-5 py-2 rounded-xl transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Your Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={t('contact.name_input')} 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Your Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder={t('contact.email_input')} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Subject of Inquiry</label>
                <input 
                  type="text" 
                  placeholder={t('contact.subject_input')} 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Write Message details *</label>
                <textarea 
                  required 
                  rows={4} 
                  placeholder={t('contact.message_input')} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none font-light"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-3 rounded-lg text-center transition flex justify-center items-center gap-1.5 cursor-pointer disabled:opacity-40 shadow"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t('contact.send_btn')}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* SVG Interactive Branch map (Point to the Map) */}
      <section className="space-y-6 pt-10 border-t border-gray-150">
        <div className="max-w-2xl">
          <h3 className="text-xl font-black text-emerald-950 font-sans tracking-tight">{t('contact.map_title')}</h3>
          <p className="text-xs text-gray-500 mt-1">Easily find custom Gadaa outlets, training annex centers, and agricultural microfinance desks across Adama township.</p>
        </div>
        
        {/* Custom SVG Adama Interactive Map Component */}
        <InteractiveMap lang={lang} />
      </section>

    </div>
  );
}
