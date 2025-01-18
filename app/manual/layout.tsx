"use client";

export default function ManualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
