import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 bg-gray-900/70 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10 flex justify-between items-center">
      <div className="text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
          Studie Assistent
        </h1>
        <p className="mt-1 text-sm text-gray-300">
          Jouw AI-hulp voor alle studievragen.
        </p>
      </div>
    </header>
  );
};

export default Header;