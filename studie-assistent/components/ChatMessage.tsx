import React from 'react';
import type { ChatMessage } from '../types';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const isError = message.role === 'error';

  const wrapperClasses = `flex w-full mb-4 animate-fadeIn`;
  const messageClasses = `rounded-2xl p-4 max-w-lg lg:max-w-xl shadow-md`;

  if (isError) {
    return (
      <div className={wrapperClasses + " justify-center"}>
        <div className="bg-red-900/70 border border-red-500 text-red-200 p-4 rounded-lg text-center">
            <p className="font-bold">Fout</p>
            <p>{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClasses + (isAssistant ? " justify-start" : " justify-end")}>
      <div
        className={
          messageClasses +
          (isAssistant
            ? ' bg-gray-700/80 text-white'
            : ' bg-purple-600 text-white')
        }
      >
        <p className="text-base whitespace-pre-wrap">{message.content}</p>
      </div>
       <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ChatMessageComponent;
