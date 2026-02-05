"use client";

import { useEffect, useState } from "react";
import { Toast as ToastType, subscribeToToasts, removeToast } from "@/lib/toast";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts(setToasts);
    return unsubscribe;
  }, []);

  const getToastStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-600 text-white border-green-700";
      case "error":
        return "bg-red-600 text-white border-red-700";
      case "warning":
        return "bg-yellow-600 text-white border-yellow-700";
      case "info":
      default:
        return "bg-blue-600 text-white border-blue-700";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
            ${getToastStyles(t.type)}
            animate-in fade-in slide-in-from-bottom-4 duration-300
          `}
        >
          {getIcon(t.type)}
          <span className="flex-1 text-sm font-medium">{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="ml-2 hover:opacity-80 transition-opacity"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
