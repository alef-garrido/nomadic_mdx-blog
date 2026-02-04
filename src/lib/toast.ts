/**
 * Toast notification utility for client-side notifications
 * Provides simple in-memory toast state management
 */

type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

export const createToast = (message: string, type: ToastType = 'info', duration = 3000): string => {
  const id = `toast-${Date.now()}-${Math.random()}`;
  const newToast: Toast = { id, message, type, duration };
  
  toasts = [...toasts, newToast];
  notifyListeners();

  if (duration) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  return id;
};

export const removeToast = (id: string) => {
  toasts = toasts.filter(t => t.id !== id);
  notifyListeners();
};

export const clearToasts = () => {
  toasts = [];
  notifyListeners();
};

const notifyListeners = () => {
  toastListeners.forEach(listener => listener([...toasts]));
};

export const subscribeToToasts = (listener: (toasts: Toast[]) => void) => {
  toastListeners.push(listener);
  listener([...toasts]);
  
  return () => {
    toastListeners = toastListeners.filter(l => l !== listener);
  };
};

// Convenience functions
export const toast = {
  success: (message: string, duration?: number) => createToast(message, 'success', duration),
  error: (message: string, duration?: number) => createToast(message, 'error', duration),
  info: (message: string, duration?: number) => createToast(message, 'info', duration),
  warning: (message: string, duration?: number) => createToast(message, 'warning', duration),
  clear: clearToasts,
};
