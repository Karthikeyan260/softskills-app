import { useState } from 'react';

export default function FastChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="bg-white shadow-lg rounded-lg w-80">
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">FastChatBot</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">&times;</button>
          </div>
          <iframe	className='h-96 w-96' src="https://app.fastbots.ai/embed/cm2e866m507rhn8bklawwg1j0"></iframe>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-indigo-600 text-white rounded-full p-3 shadow-lg">
          Chat
        </button>
      )}
    </div>
  );
}
