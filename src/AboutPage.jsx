import React from 'react';
import { Footer } from './components/Footer';

const AboutPage = () => {
  return (
    // background
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900 ">
        {/* working container */}
            <div className="w-full h-full max-w-sm bg-white flex flex-col items-center justify-end p-4 rounded-lg shadow-lg">
              {/* type here */}
              <Footer/>
            </div>
        </div>
  );
};

export default AboutPage;