// client/src/components/layout/DashboardLayout.tsx

import React from 'react';
import DashboardNav from '../dashboard/DashboardNav';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
