import StoreNav from '@/components/shop/StoreNav';
import React from 'react';

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
