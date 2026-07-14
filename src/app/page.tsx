import Hero from '@/components/herosection/Hero';
import Navbar from '@/components/navbar/Navbar';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
    </div>
  );
};

export default page;