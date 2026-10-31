import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage, closeToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full animate-slide-up">
      <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl shadow-xl border border-emerald-500/30">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>
        <p className="text-sm font-medium leading-tight flex-1">
          {toastMessage}
        </p>
        <button
          onClick={closeToast}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
