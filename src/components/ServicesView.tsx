import React, { useState } from 'react';
import { 
  Landmark, DollarSign, ShieldAlert, CheckCircle, Info, Phone, 
  Clock, ShieldCheck, X, FileCheck, ArrowRight, UserCheck
} from 'lucide-react';
import { Language, ServiceProduct } from '../types';
import { translations } from '../translations';
import { staticProducts } from '../data';

interface ServicesViewProps {
  lang: Language;
}

export function ServicesView({ lang }: ServicesViewProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'savings' | 'loans' | 'insurance'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ServiceProduct | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(false);

  // Application Form Inputs
  const [appFullName, setAppFullName] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appKebeleId, setAppKebeleId] = useState('');
  const [appIncome, setAppIncome] = useState('');
  const [appOccup, setAppOccup] = useState('');
  const [appAgreed, setAppAgreed] = useState(false);

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  const filteredProducts = activeCategory === 'all' 
    ? staticProducts 
    : staticProducts.filter(p => p.type === activeCategory);

  const translateField = (p: ServiceProduct, prefix: 'name' | 'description' | 'eligibility' | 'requirements' | 'benefits') => {
    const key = `${prefix}_${lang}`;
    return p[key as keyof ServiceProduct] || p[`${prefix}_en` as keyof ServiceProduct] || '';
  };

  const handleApplyClick = (product: ServiceProduct) => {
    setSelectedProduct(product);
    setShowApplyModal(true);
    setSubmittedApplication(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appFullName || !appPhone || !appKebeleId) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmittedApplication(true);
  };

  const handleCloseModal = () => {
    setShowApplyModal(false);
    setSelectedProduct(null);
    setAppFullName('');
    setAppPhone('');
    setAppKebeleId('');
    setAppIncome('');
    setAppOccup('');
    setAppAgreed(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="bgo-services-view">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-amber-600 font-bold tracking-widest text-[10px] uppercase block">TAILORED REMEDIES</span>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight font-sans mt-1">
          {t('services.title')}
        </h2>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          {t('services.subtitle')}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        {[
          { id: 'all', label: lang === 'om' ? 'Hunda Tajaajilaa' : lang === 'am' ? 'ሁሉም አገልግሎቶች' : 'All Products' },
          { id: 'savings', label: t('services.savings_title') },
          { id: 'loans', label: t('services.loans_title') },
          { id: 'insurance', label: t('services.insurance_title') }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-tight uppercase transition cursor-pointer ${
              activeCategory === cat.id 
                ? 'bg-emerald-800 text-white shadow-md border border-emerald-800' 
                : 'bg-white text-gray-600 hover:text-emerald-800 border border-gray-150'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((p) => {
          let categoryColor = 'bg-emerald-100 text-emerald-800 border-emerald-250';
          if (p.type === 'loans') categoryColor = 'bg-amber-100 text-amber-800 border-amber-250';
          if (p.type === 'insurance') categoryColor = 'bg-purple-100 text-purple-800 border-purple-200';

          return (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between" id={`product-${p.id}`}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider border ${categoryColor}`}>
                    {p.type}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">BGO-{p.id.toUpperCase()}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">
                  {translateField(p, 'name')}
                </h3>

                <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
                  {translateField(p, 'description')}
                </p>

                <hr className="border-gray-100 mb-4" />

                {/* Eligibility and requirements summary */}
                <div className="space-y-3.5">
                  <div>
                    <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-widest">{t('services.eligibility')}</span>
                    <span className="block text-xs text-gray-600 mt-0.5 font-light leading-relaxed">{translateField(p, 'eligibility')}</span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-amber-600 uppercase tracking-widest">{t('services.requirements')}</span>
                    <span className="block text-xs text-gray-600 mt-0.5 font-light leading-relaxed">{translateField(p, 'requirements')}</span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-slate-850 uppercase tracking-widest">{t('services.benefits')}</span>
                    <span className="block text-xs text-slate-600 mt-0.5 font-light leading-relaxed">{translateField(p, 'benefits')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleApplyClick(p)}
                  className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-lg text-center transition-all cursor-pointer shadow-sm"
                >
                  {t('services.apply_now')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cultural trust guarantee ribbon */}
      <div className="mt-16 bg-emerald-950 text-white p-6 sm:p-8 rounded-2xl border border-emerald-900 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <h4 className="text-base font-bold text-amber-400 uppercase tracking-widest">
              {lang === 'om' ? 'Koreen Gadaa Keenya Wabii Isiniif Ta’a!' : lang === 'am' ? 'የገዳ ባህላዊ እሴቶች ዋስትናችን ናቸው!' : 'Oromo Traditional Security Pledge'}
            </h4>
            <p className="text-xs text-emerald-200 mt-1 font-light leading-relaxed">
              Every BGO system operates transparently with decentralized peer-oversight. The traditional "Busaa Gonofaa" system represents communal support, ensuring zero interest shocks or unfair collateral calls for Adama citizens.
            </p>
          </div>
          <span className="bg-amber-400 text-emerald-950 font-black text-[10px] uppercase px-4 py-2 rounded-xl shrink-0 border border-amber-300">
            Adama Branch Audited
          </span>
        </div>
      </div>

      {/* APPLICATION MODAL DIALOG */}
      {showApplyModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-gray-150 overflow-hidden" id="bgo-apply-now-modal">
            
            {/* Header */}
            <div className="bg-emerald-900 text-white p-5 flex justify-between items-center relative border-b-2 border-amber-400">
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-bold block">{lang === 'om' ? 'Iyyannoo BGO' : lang === 'am' ? 'የዲጂታል ማመልከቻ' : 'BGO Official Registration'}</span>
                <span className="text-sm font-black tracking-tight">{translateField(selectedProduct, 'name')}</span>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-white/80 hover:text-white bg-white/10 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Switch */}
            {!submittedApplication ? (
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Start your microfinance application online. Submit the basic details below to pre-register your request with our Adama Branch counseling agents.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Full Name (Legal) *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Obbo Chala Kenene" 
                      value={appFullName} 
                      onChange={(e) => setAppFullName(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Mobile Telephone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="e.g. +251 912 34 5678" 
                      value={appPhone} 
                      onChange={(e) => setAppPhone(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Kebele ID / Card Number *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. AD-04-1234-ET" 
                      value={appKebeleId} 
                      onChange={(e) => setAppKebeleId(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Occupation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Farmer, Merchant" 
                      value={appOccup} 
                      onChange={(e) => setAppOccup(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Estimated Monthly Income (ETB)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 8500" 
                    value={appIncome} 
                    onChange={(e) => setAppIncome(e.target.value)}
                    className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>

                <hr className="border-gray-100" />

                <div className="flex items-start gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="checkbox-agreed" 
                    required 
                    checked={appAgreed}
                    onChange={(e) => setAppAgreed(e.target.checked)}
                    className="w-4 h-4 accent-emerald-700 shrink-0 mt-0.5 rounded cursor-pointer"
                  />
                  <label htmlFor="checkbox-agreed" className="text-[10px] text-gray-500 leading-normal font-light">
                    I state that details are legal, and I agree to bring matching Kebele ID paper checklists to BGO Adama Head Office near Geda Hall for verify.
                  </label>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-1/3 bg-slate-100 hover:bg-slate-205 text-gray-750 font-bold text-xs py-2.5 rounded-lg text-center transition cursor-pointer"
                  >
                    {lang === 'om' ? 'Haqi' : lang === 'am' ? 'ሰርዝ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-lg text-center transition cursor-pointer"
                  >
                    {lang === 'om' ? 'Iyyannoo Ergi' : lang === 'am' ? 'ማመልከቻውን ላክ' : 'Submit Application'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-center space-y-6">
                <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xl">
                  ✓
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-gray-900 leading-normal">
                    {lang === 'om' ? 'Iyyannoo keessan nagaan fudhatameera!' : lang === 'am' ? 'የቅድመ-ምዝገባ ማመልከቻዎ በተሳካ ሁኔታ ተልኳል!' : 'Pre-Registration Complete!'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Thank you, <strong>{appFullName}</strong>. Your reference ID is <span className="font-mono text-emerald-800 font-extrabold text-[11px]">BGO-REG-{(Date.now() % 100000)}</span>.
                    An agent from the Gadaa Avenue Counselling Desk will reach you at <strong>{appPhone}</strong> within 1 working day.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-left space-y-3">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-800 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 shrink-0" />
                    Physical Visit Checklist
                  </span>
                  
                  <ul className="text-[11px] text-amber-900 space-y-1.5 leading-relaxed font-light">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>Your physical original Kebele ID Card (AD-04 series)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>2 recent passport-size color photographs</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>100 ETB minimum initial deposit for active wallet start</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>If applying for Loans: signatures of 2 local cooperative witnesses</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-lg text-center transition cursor-pointer"
                >
                  Finished & Close
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
