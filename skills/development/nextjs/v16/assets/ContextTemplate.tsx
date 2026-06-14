'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FeatureContextType {
    state: any;
    setState: (val: any) => void;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export function FeatureProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState(null);

    return (
        <FeatureContext.Provider value={{ state, setState }}>
            {children}
        </FeatureContext.Provider>
    );
}

export function useFeature() {
    const context = useContext(FeatureContext);
    if (context === undefined) {
        throw new Error('useFeature must be used within a FeatureProvider');
    }
    return context;
}
