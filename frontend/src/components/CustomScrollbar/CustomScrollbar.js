// CustomScrollbar.js
import React from 'react';

const CustomScrollbar = () => {
  return (
    <div
      className="h-screen overflow-y-scroll scrollbar-thumb-secondary scrollbar-track-tetriary"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--secondary) var(--tetriary)',
      }}
    >
      {/* Your content goes here */}
    </div>
  );
};

export default CustomScrollbar;
