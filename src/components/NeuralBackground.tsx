import React from 'react';

export const NeuralBackground: React.FC = () => {
  return (
    <div className="neural-bg fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="neural-grid absolute inset-0 w-full h-full"></div>
    </div>
  );
};
