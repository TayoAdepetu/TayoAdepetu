'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { ContactModal } from './ContactModal';

type ContactContextValue = {
  open: (preselectedService?: string) => void;
  close: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselected, setPreselected] = useState<string | undefined>(undefined);

  const open = useCallback((preselectedService?: string) => {
    setPreselected(preselectedService);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} preselectedService={preselected} />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error('useContact must be used inside <ContactProvider />');
  }
  return ctx;
}
