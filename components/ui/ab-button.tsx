import React, { MouseEventHandler } from 'react';

interface Props {
    label: string
    onClick:  MouseEventHandler
    className?: string
}

const ABButton = ({ label = 'A', onClick, className = '' }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`gba-button p-3 sm:p-4 text-[#9BBC0F] hover:opacity-90 transition-opacity ${className}`}
    >
      {label}
    </button>
  );
};

export default ABButton;

