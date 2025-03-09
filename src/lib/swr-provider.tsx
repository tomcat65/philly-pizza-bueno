'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

// Global fetcher that automatically uses JSON
const globalFetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.message = `HTTP Error ${res.status}: ${res.statusText}`;
    throw error;
  }
  
  return res.json();
};

export default function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: globalFetcher,
        revalidateOnFocus: false, // Don't revalidate when window gets focus
        revalidateIfStale: true, // Always revalidate when data is stale
        errorRetryCount: 3, // Retry failed requests 3 times
        errorRetryInterval: 5000, // Starting retry interval of 5 seconds
        dedupingInterval: 2000, // Deduplicate requests within 2 seconds
        focusThrottleInterval: 5000, // Throttle focus events to max once every 5 seconds
      }}
    >
      {children}
    </SWRConfig>
  );
} 