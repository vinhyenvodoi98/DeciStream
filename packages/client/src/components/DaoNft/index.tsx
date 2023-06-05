import React, { useState } from 'react';

interface VoteOption {
  id: number;
  label: string;
  count: number;
}

const DaoNft: React.FC = () => {
  return (
    <div className="p-4 bg-gray-200 my-4">
      <h2 className="text-xl font-bold mb-4">Vote</h2>
      <div className="mb-2">
        Total Votes: <span className="font-bold"></span>
      </div>
    </div>
  );
};

export default DaoNft;
