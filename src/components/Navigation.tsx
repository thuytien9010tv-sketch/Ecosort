import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Trash2, Lightbulb, MapPin, User, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const { t } = useApp();

  const navItems = [
    {
      id: 'sort',
      label: t('navSort'),
      icon: Search,
      highlight: true,
    },
    {
      id: 'bins',
      label: t('navBins'),
      icon: Trash2,
    },
    {
      id: 'recycle',
      label: t('navRecycle'),
      icon: Lightbulb,
    },
    {
      id: 'locations',
      label: t('navLocations'),
      icon: MapPin,
    },
    {
      id: 'profile',
      label: t('navProfile'),
      icon: User,
    },
  ];

  return (
    <>
      {/* Desktop / Tablet Tab Header */}
      <div className="hidden md:block bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200/60 dark:border-gray-800 py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Fixed Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <div
                  className={`p-1 rounded-xl mb-0.5 ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 scale-110 transition-transform'
                      : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate max-w-[62px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
