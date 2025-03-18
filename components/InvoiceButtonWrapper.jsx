'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import InvoiceButton only on client-side
const InvoiceButton = dynamic(() => import('./Invoice'), {
  ssr: false,
});

export default function InvoiceButtonWrapper({ order, currency }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button 
        className="flex items-center gap-1 bg-gray-300 text-white px-3 py-1.5 rounded text-xs font-medium"
        disabled
      >
        Loading...
      </button>
    );
  }

  return <InvoiceButton order={order} currency={currency} />;
} 