import React, { useState } from "react";
import { FiMessageCircle } from "react-icons/fi"; // Ícono de mensaje
import ChatBot from "./ChatBot"; // El chatbot con tu prompt

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Botón flotante con ícono */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        aria-label="Abrir chat"
      >
        <FiMessageCircle size={24} />
      </button>

      {/* Ventana flotante del chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-3 min-w-[200px] w-[350px] max-h-[500px] z-50 shadow-xl rounded-lg border bg-white">
          <ChatBot />
        </div>
      )}
    </>
  );
}
