'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  showToast: (title: string, type?: ToastType, description?: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, type: ToastType = 'success', description?: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    const newToast: ToastMessage = { id, type, title, description };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (title: string, description?: string) => showToast(title, 'success', description);
  const error = (title: string, description?: string) => showToast(title, 'error', description);
  const warning = (title: string, description?: string) => showToast(title, 'warning', description);
  const info = (title: string, description?: string) => showToast(title, 'info', description);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      
      {/* Toast Render Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-slide-in ${
              toast.type === 'success'
                ? 'bg-slate-900/90 border-emerald-500/40 text-white shadow-emerald-950/40'
                : toast.type === 'error'
                ? 'bg-slate-900/90 border-rose-500/40 text-white shadow-rose-950/40'
                : toast.type === 'warning'
                ? 'bg-slate-900/90 border-amber-500/40 text-white shadow-amber-950/40'
                : 'bg-slate-900/90 border-blue-500/40 text-white shadow-blue-950/40'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1 text-xs">
              <h4 className="font-bold text-sm leading-tight text-white">{toast.title}</h4>
              {toast.description && <p className="text-slate-300 mt-0.5 leading-relaxed">{toast.description}</p>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition p-0.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if not inside provider
    return {
      showToast: (t: string) => console.log(t),
      success: (t: string) => console.log(t),
      error: (t: string) => console.log(t),
      warning: (t: string) => console.log(t),
      info: (t: string) => console.log(t),
    };
  }
  return context;
}
