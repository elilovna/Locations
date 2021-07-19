import * as React from 'react';
import background from '../assets/background.jpg'

export const Front = () => {
  return <div style={{
    backgroundImage: `url(${background})`,
  }} className="bg-cover bg-center bg-no-repeat w-full h-screen">
      something here 
  </div>
}
