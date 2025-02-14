'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function HeroSkeleton() {
  return (
    <section className="relative h-[600px] flex items-center">
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <Skeleton className="h-16 w-96 mb-6" />
          <Skeleton className="h-8 w-[500px] mb-8" />
          <div className="flex space-x-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
} 