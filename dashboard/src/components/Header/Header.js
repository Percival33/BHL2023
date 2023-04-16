import React from 'react';

import { CogIcon } from '@heroicons/react/outline';

const Header = () => {
  return (
    <header className="bg-bluenormal text-white py-4 flex justify-between items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl text-center font-nunitosemibold">Dashboard</h1>
      </div>
      <button className="mr-4">
        <CogIcon className="h-6 w-6 stroke-current text-white" />
      </button>

    </header>
  );
};

export default Header;
