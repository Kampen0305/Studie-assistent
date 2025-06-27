
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-purple-500"
        role="status"
        aria-live="polite"
        aria-label="Laden"
      ></div>
    </div>
  );
};

export default Loader;
