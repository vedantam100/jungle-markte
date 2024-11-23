import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 fixed inset-0 z-50">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
  );
};

export default LoadingScreen;
