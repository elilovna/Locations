import * as React from 'react';
import background from '../assets/background.jpg';

export const Front = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: 'calc(100vh - 52px)'
      }}
      className="bg-cover bg-center bg-no-repeat w-full"
    >
      something here
    </div>
  );
};
