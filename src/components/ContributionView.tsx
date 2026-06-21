import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Landmark, Award, ShieldCheck, HeartHandshake, FileCheck, 
  ArrowRight, Users, Sparkles, CheckCircle, Smartphone, Check, Grid, 
  Printer, Scroll, Loader2 
} from 'lucide-react';
import { Language, Campaign, Contribution } from '../types';
import { translations } from '../translations';
import { initialCampaigns } from '../data';

interface ContributionViewProps {
  lang: Language;
  selectedCampaignId?: string;
  setSelectedCampaignId?: (id: string | undefined) => void;
}

export function ContributionView({ lang, selectedCampaignId, setSelectedCampaignId }: ContributionViewProps) {
  // Live Dashboard Metrics
  const [dbCampaigns, setDbCampaigns] = useState<Campaign[]>([]);
  const [dbContributions, setDbContributions] = useState<Contribution[]>([]);
  const [stats, setStats] = useState({
    totalContributed: 0,
    activeCampaigns: 2,
    totalDonors: 0
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any>(null); // To store successful response details for certificate

  // Form Inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState(selectedCampaignId || 'general');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe_birr' | 'bank_transfer'>('telebirr');

  // Gateway Simulation State
  const [gatewayStep, setGatewayStep] = useState<'idle' | 'simulating' | 'completed'>('idle');
  const [simulatedPIN, setSimulatedPIN] = useState('');

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  const translateField = (camp: Campaign, prefix: 'title' | 'description') => {
    const key = `${prefix}_${lang}`;
    return camp[key as keyof Campaign] || camp[`${prefix}_en` as keyof Campaign] || '';
  };

  const loadDashboardStats = async () => {
    setLoading(true);
    try {
      const [resCamps, resConts, resStats] = await Promise.all([
        fetch('/api/campaigns').then(r => r.json()),
        fetch('/api/contributions').then(r => r.json()),
        fetch('/api/analytics').then(r => r.json())
      ]);

      setDbCampaigns(resCamps);
      setDbContributions(resConts);
      setStats({
        totalContributed: resStats.totalContributed || 0,
        activeCampaigns: resStats.activeCampaigns || 0,
        totalDonors: resStats.totalDonors || 0
      });
    } catch (e) {
      console.error('Lag in analytics API. Using local datasets.', e);
      setDbCampaigns(initialCampaigns);
      
      // Fallback calculations
      setStats({
        totalContributed: 477300,
        activeCampaigns: 2,
        totalDonors: 2
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
    if (selectedCampaignId) {
      setPurpose(selectedCampaignId);
    }
  }, [selectedCampaignId]);

  const handleSubmitContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !amount) {
      alert('Please fill out Name and Amount.');
      return;
    }

    setGatewayStep('simulating');
  };

  const handleProcessCheckout = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          amount: Number(amount),
          purpose,
          paymentMethod
        })
      });

      if (res.ok) {
        const d = await res.json();
        setSuccessData(d);
        setGatewayStep('completed');
        
        // Reload dashboard
        loadDashboardStats();
      } else {
        alert('Server returned error. Please try again.');
        setGatewayStep('idle');
      }
    } catch (err) {
      console.error(err);
      alert('Network connection error.');
      setGatewayStep('idle');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setAmount('');
    setPurpose('general');
    setPaymentMethod('telebirr');
    setGatewayStep('idle');
    setSuccessData(null);
    if (setSelectedCampaignId) {
      setSelectedCampaignId(undefined);
    }
  };

  const getCampaignName = (campaignId: string) => {
    if (campaignId === 'general') return 'BGO General Welfare Fund';
    const find = dbCampaigns.find(c => c.id === campaignId);
    if (!find) return 'Adama Support Desk Fund';
    if (lang === 'om') return find.title_om;
    if (lang === 'am') return find.title_am;
    return find.title_en;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="bgo-contributions-desk">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-amber-600 font-bold tracking-widest text-[10px] uppercase block">TRANSPARENT WELFARE</span>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight font-sans mt-0.5">{t('contrib.portal_title')}</h2>
        <p className="text-xs text-gray-500 mt-1 max-w-lg mx-auto">{t('contrib.subtitle')}</p>
      </div>

      {/* Stats Dashboard: Total Contributions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-900 shadow-lg relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">{t('contrib.dashboard_total')}</span>
              <span className="text-3xl font-black font-sans block mt-1">
                {stats.totalContributed.toLocaleString()} ETB
              </span>
              <span className="text-[10px] font-light text-emerald-250 block mt-1">Audited daily against CBE ledger</span>
            </div>
            <Landmark className="w-8 h-8 text-amber-500 shrink-0" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-amber-50 text-amber-700 rounded-xl shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">{t('contrib.dashboard_campaigns')}</span>
            <span className="text-2xl font-black text-gray-900 block mt-0.5">{stats.activeCampaigns} Active</span>
            <span className="text-[10px] text-gray-500 block">Emergency & development drives</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-purple-50 text-purple-700 rounded-xl shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">{t('contrib.dashboard_donors')}</span>
            <span className="text-2xl font-black text-gray-900 block mt-0.5">{stats.totalDonors} Members</span>
            <span className="text-[10px] text-gray-500 block">Distinct supporting patrons</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Form + Recent contributions Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden min-h-[480px]">
          <div className="bg-emerald-900 text-white p-5 border-b-2 border-amber-400 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm uppercase tracking-tight">{t('contrib.form_header')}</h3>
          </div>

          <div className="p-6">
            {gatewayStep === 'idle' && (
              <form onSubmit={handleSubmitContribution} className="space-y-4">
                
                {/* Full name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Your Full Name (or Anonymous) *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Obbo Chala Kenene" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Mobile number * (For Telebirr/CBE PIN)</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="e.g. +251 912 34 5678" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                </div>

                {/* Email (Optional) & Amount */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Email address (Optional)</label>
                    <input 
                      type="email" 
                      placeholder="e.g. chala@cbebirr.et" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Amount (ETB) *</label>
                    <input 
                      type="number" 
                      required 
                      min="10" 
                      placeholder="e.g. 500" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none font-bold text-emerald-950"
                    />
                  </div>
                </div>

                {/* Purpose Campaign Finder Selection */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Contribution Target Drive</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full text-xs rounded-lg border border-gray-200 p-2.5 focus:ring-2 focus:ring-emerald-700 outline-none"
                  >
                    <option value="general">BGO General Mutual Aid Fund (Adama Branch)</option>
                    {dbCampaigns.map((camp) => (
                      <option key={camp.id} value={camp.id}>
                        {translateField(camp, 'title')} (ends {camp.endDate})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Unified Payment Option selection */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase mb-2">Integrated Payment Mode *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'telebirr', name: 'Telebirr Wallet', desc: 'Secure Mobile Checkout' },
                      { id: 'cbe_birr', name: 'CBE Birr', desc: 'Commercial Bank API' },
                      { id: 'bank_transfer', name: 'Bank Wire', desc: 'Pre-verified Transfer' }
                    ].map((mode) => {
                      const isSel = paymentMethod === mode.id;
                      return (
                        <div
                          key={mode.id}
                          onClick={() => setPaymentMethod(mode.id as any)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isSel 
                              ? 'border-emerald-750 bg-emerald-50/40 shadow-sm' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="block font-bold text-xs text-emerald-950">{mode.name}</span>
                          <span className="block text-[9px] text-gray-400 mt-0.5">{mode.desc}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <hr className="border-gray-100 pt-1" />

                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md mt-4 cursor-pointer text-center block"
                >
                  Proceed to Secure Checkout
                </button>
              </form>
            )}

            {/* Gateway Simulator Panel */}
            {gatewayStep === 'simulating' && (
              <div className="space-y-6 text-center py-6 max-w-md mx-auto" id="gateway-sim">
                <div className="mx-auto w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900 uppercase">
                    {paymentMethod === 'telebirr' ? 'Telebirr API Secure Gateway' : 'CBE Birr Instant Checkout'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    A dummy mobile billing ping has been sent to <strong>{phone}</strong> for <strong>{amount} ETB</strong>. Please enter any 4-digit verification PIN to simulate correct payment authorize.
                  </p>
                </div>

                <div className="space-y-4">
                  <input 
                    type="password" 
                    maxLength={4} 
                    placeholder="••••" 
                    value={simulatedPIN}
                    onChange={(e) => setSimulatedPIN(e.target.value)}
                    className="w-32 tracking-[1em] text-center font-black text-lg bg-slate-50 border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => setGatewayStep('idle')}
                      className="w-1/3 bg-slate-100 hover:bg-slate-205 text-gray-700 font-bold text-xs py-2 px-3 rounded-lg text-center cursor-pointer"
                    >
                      Go Back
                    </button>
                    <button
                      onClick={handleProcessCheckout}
                      disabled={simulatedPIN.length < 4 || submitting}
                      className="w-2/3 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2 px-3 rounded-lg text-center transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Process Securely</span>}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Successful Checkout Presentation with dynamic Oromo recognition Certificate */}
            {gatewayStep === 'completed' && successData && (
              <div className="space-y-6 py-4" id="success-cert">
                
                {/* Congratulations notification header */}
                <div className="text-center space-y-2">
                  <div className="mx-auto w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-extrabold text-gray-900 uppercase">Contribution Registered!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto font-light">
                    Your gumaacha of <strong>{successData.amount} ETB</strong> has successfully updated our active database! Thank you for backing Adama progress.
                  </p>
                </div>

                {/* THE PORTABLE GADAA PATRON RECOGNITION CERTIFICATE WRAP */}
                <div 
                  className="bg-emerald-950 text-white border-4 border-double border-amber-400 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4 relative overflow-hidden max-w-lg mx-auto" 
                  id="oromo-welfare-recognition-certificate"
                >
                  {/* Subtle Oda branches background */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl"></div>
                  
                  <div className="text-center relative z-10 space-y-3.5">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-amber-400 block border-b border-amber-400/25 pb-2">
                      Busaa Gonofaa Oromiyaa
                    </span>

                    <div className="space-y-1">
                      <Scroll className="w-6 h-6 text-amber-400 mx-auto opacity-80" />
                      <h5 className="font-serif italic text-lg sm:text-xl font-medium tracking-tight text-white block">
                        Certificate of Contribution Patrons
                      </h5>
                    </div>

                    <p className="text-[10px] text-emerald-200 leading-relaxed font-light font-sans italic max-w-sm mx-auto">
                      "Dugda Duuba Hawaasa Keenyaa, Wabii Misooma Keessanii"
                    </p>

                    <div className="py-2">
                      <span className="block text-[9px] text-emerald-300 font-light uppercase tracking-wider">This official token is proudly bestowed upon</span>
                      <strong className="block text-base font-black text-amber-400 mt-1 uppercase font-sans tracking-wide">{successData.fullName}</strong>
                    </div>

                    <div className="text-[10px] text-emerald-100 leading-relaxed font-light max-w-md mx-auto space-y-1.5 pt-1.5">
                      <p>
                        For generously donating an amount of <strong className="text-white font-extrabold">{successData.amount} ETB</strong> to support the crucial developmental initiative:
                      </p>
                      <span className="inline-block bg-emerald-900 border border-emerald-800 text-amber-300 text-[10px] px-3 py-1 rounded-full font-bold">
                        {getCampaignName(successData.purpose)}
                      </span>
                    </div>

                    {/* Signbox */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-amber-400/20 text-[9px] text-emerald-300 font-mono">
                      <div className="text-left">
                        <span className="block text-gray-400">REFERENCE CODE</span>
                        <span className="block text-white font-bold">{successData.id}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-gray-400">VERIFICATION SEAL</span>
                        <span className="block text-amber-400 font-bold">★ BGO-ADAMA-OFFICIAL</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Print button & restart */}
                <div className="flex gap-2 max-w-lg mx-auto">
                  <button
                    onClick={() => {
                      const printContent = document.getElementById('oromo-welfare-recognition-certificate')?.outerHTML;
                      const win = window.open('', '_blank');
                      if (win) {
                        win.document.write(`<html><head><title>BGO Certificate</title><link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"></head><body class="flex items-center justify-center h-screen bg-slate-900">${printContent}</body></html>`);
                        win.document.close();
                        win.print();
                      } else {
                        alert('Printing simulated safely inside iframe blocks!');
                      }
                    }}
                    className="w-1/2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold text-xs py-2.5 rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    Print Certificate
                  </button>
                  <button
                    onClick={handleResetForm}
                    className="w-1/2 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-lg text-center transition cursor-pointer"
                  >
                    Contribute Again
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Ledger Column (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2.5 flex items-center justify-between">
              <span>{t('contrib.recent')}</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider">verified</span>
            </h4>

            <div className="space-y-3">
              {dbContributions.map((cont) => (
                <div key={cont.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-gray-100">
                  <div>
                    <span className="block text-xs font-semibold text-gray-900">{cont.fullName}</span>
                    <span className="block text-[9px] text-gray-400 mt-0.5 font-mono">ID: {cont.id}</span>
                  </div>
                  <span className="text-xs font-black text-emerald-800">{cont.amount.toLocaleString()} ETB</span>
                </div>
              ))}
              {dbContributions.length === 0 && (
                <span className="text-xs text-gray-400 italic">No recent donations registered yet.</span>
              )}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 text-amber-900 leading-relaxed space-y-3">
            <span className="block font-bold text-xs uppercase tracking-wider">CBE BIRR Integration</span>
            <p className="text-xs font-light leading-relaxed">
              We leverage direct API connectors for Telebirr and Commercial Bank of Ethiopia (CBE) Birr. Contributions are immediately synchronized on BGO main server, keeping processing absolutely safe and rapid.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
