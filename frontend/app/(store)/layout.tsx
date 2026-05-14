import React from 'react';
import StoreNav from '@/components/shop/StoreNav';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreNav />
      {children}
    </>
  );
}
