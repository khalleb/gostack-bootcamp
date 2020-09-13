import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4'
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextProps {
  addToast(messge: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ title, type, description }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();
    const toast = {
      id,
      title,
      type,
      description,
    }

    setMessages((state) => [...state, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter(message => message.id !== id));
  }, []);


  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
};

function useToast(): ToastContextProps {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };