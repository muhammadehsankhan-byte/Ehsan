import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  monthlyPrice: number;
  emoji: string;
  image: string;
  inStock: boolean;
  specs?: Record<string, string>;
}

interface ComparisonContextType {
  compareItems: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  isComparing: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const toggleCompare = (product: Product) => {
    setCompareItems((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) return prev; // Limit to 4 items for layout
      return [...prev, product];
    });
  };

  const clearCompare = () => setCompareItems([]);

  const isComparing = (productId: string) => {
    return compareItems.some((p) => p.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{ compareItems, toggleCompare, clearCompare, isComparing }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
