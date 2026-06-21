import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { CommunityView } from './components/CommunityView';
import { ContributionView } from './components/ContributionView';
import { ContactView } from './components/ContactView';
import { AdminPanel } from './components/AdminPanel';
import { Language } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'services' | 'community' | 'contribution' | 'contact' | 'admin'>('home');
  const [lang, setLang] = useState<Language>('en');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col font-sans selection:bg-amber-500 selection:text-emerald-950" id="bgo-app-root">
      
      {/* Complete Responsive Multilingual Header bar */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        lang={lang} 
        setLang={setLang} 
      />

      {/* Main tab wrapper with simple fade-entering container */}
      <main className="flex-grow transition-opacity duration-300">
        {currentTab === 'home' && (
          <HomeView 
            lang={lang} 
            setCurrentTab={setCurrentTab} 
            setSelectedCampaignId={setSelectedCampaignId} 
          />
        )}

        {currentTab === 'services' && (
          <ServicesView lang={lang} />
        )}

        {currentTab === 'community' && (
          <CommunityView lang={lang} />
        )}

        {currentTab === 'contribution' && (
          <ContributionView 
            lang={lang} 
            selectedCampaignId={selectedCampaignId} 
            setSelectedCampaignId={setSelectedCampaignId}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView lang={lang} />
        )}

        {currentTab === 'admin' && (
          <AdminPanel lang={lang} />
        )}
      </main>

      {/* Consistent footer links and Gadaa traditional flags */}
      <Footer lang={lang} setCurrentTab={setCurrentTab} />
    </div>
  );
}
