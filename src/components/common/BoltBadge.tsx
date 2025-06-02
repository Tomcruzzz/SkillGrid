import React from 'react';

const BoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50 transition-transform hover:scale-105"
    >
      <img
        src="/black_circle_360x360.png"
        alt="Powered by Bolt.new"
        className="w-12 h-12"
      />
    </a>
  );
};

export default BoltBadge;