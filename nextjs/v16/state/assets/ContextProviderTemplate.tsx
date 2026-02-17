'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type FeatureState = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const FeatureContext = createContext<FeatureState | undefined>(undefined);

export function FeatureProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>;
}

export function useFeatureState() {
  const context = useContext(FeatureContext);
  if (!context) throw new Error('useFeatureState must be used within FeatureProvider');
  return context;
}
