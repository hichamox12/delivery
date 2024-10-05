import React from 'react';
import Navbar from './Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
