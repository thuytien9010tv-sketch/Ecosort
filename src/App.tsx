/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { WasteClassifier } from './components/WasteClassifier';
import { BinsGuide } from './components/BinsGuide';
import { RecycleIdeas } from './components/RecycleIdeas';
import { EcoTipsAndLocations } from './components/EcoTipsAndLocations';
import { ProfileAndHistory } from './components/ProfileAndHistory';
import { LevelUpModal } from './components/LevelUpModal';
import { NotificationToast } from './components/NotificationToast';
import { SettingsModal } from './components/SettingsModal';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('sort');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors pb-24 md:pb-12">
      {/* Top Header */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* Primary Navigation Tabs */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'sort' && <WasteClassifier onNavigateTab={setCurrentTab} />}
        {currentTab === 'bins' && <BinsGuide />}
        {currentTab === 'recycle' && <RecycleIdeas />}
        {currentTab === 'locations' && <EcoTipsAndLocations />}
        {currentTab === 'profile' && (
          <ProfileAndHistory onOpenSettings={() => setIsSettingsOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200/60 dark:border-gray-800/80 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-gray-300">
            <span>🌱 {t('appName')}</span>
            <span>•</span>
            <span>{t('appTagline')}</span>
          </div>
          <p className="text-[11px] text-gray-400">
            {t('thankYouSortMsg')}
          </p>
        </div>
      </footer>

      {/* Modals & Global Overlays */}
      <LevelUpModal />
      <NotificationToast />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
