
import React from 'react';
import type { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  index: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, index }) => {
  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/20"
      style={{ animation: `fadeInUp 0.5s ${index * 100}ms ease-out forwards`, opacity: 0 }}
    >
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <h3 className="text-xl font-bold text-purple-300 mb-2">{idea.titel}</h3>
      <p className="text-gray-300 text-base">{idea.beschrijving}</p>
    </div>
  );
};

export default IdeaCard;
