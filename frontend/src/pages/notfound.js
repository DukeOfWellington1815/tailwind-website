import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600">Oops! The page you are looking for does not exist.</p>
      {/* <img
        className="w-64 h-64 mt-8"
        src="/path/to/your/error-image.png"
        alt="Error Illustration"
      /> */}
    </div>
  );
};

export default NotFound;
