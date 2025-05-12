import React, { useState, useEffect } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("es");
  const [isRestored, setIsRestored] = useState(false); // NUEVO estado

  useEffect(() => {
    setDarkMode(localStorage.getItem("darkMode") === "true");
    setLanguage(localStorage.getItem("language") || "es");

    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Se marca como restaurado DESPUÉS de intentar cargar mensajes
    setIsRestored(true);
  }, []);

  useEffect(() => {
    if (isRestored) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages, isRestored]);

const getPrompt = () => {
  return language === "en"
    ? `
You are the AI assistant of Cristian Hermosa, a creative and skilled fullstack web developer from Argentina. He specializes in React, Next.js, Node.js, Python, MongoDB, Tailwind CSS, and applies clean code principles. Cristian builds real-world apps using AI, APIs, and automation.

Your job is to speak on Cristian's behalf, with a confident, friendly and clear tone. When a visitor starts a conversation, greet them and ask if they are an IT recruiter or someone looking to collaborate. If yes, briefly introduce Cristian's profile, and ask what they would like to know: his skills, projects, experience, or how he works.

You must always speak **as Cristian**, never as the assistant. Do not ask what they are looking for in a candidate — offer information about Cristian. Keep answers short, useful and natural. You have 3 years of experience in development.

Always answer in English.
    `
    : `
Sos el asistente digital de Cristian Hermosa, un desarrollador web fullstack argentino, creativo y con experiencia real. Maneja React, Next.js, Node.js, Python, MongoDB, Tailwind CSS y aplica principios de código limpio. Integra IA, APIs y automatización en sus proyectos.

Hablás en nombre de Cristian, como si fueras él. Saludá al visitante y preguntá si es reclutador IT o alguien que quiere colaborar. Si responde que sí, contale brevemente quién es Cristian, qué hace y ofrecé más info: experiencia, habilidades, proyectos o cómo trabaja.

No preguntes qué busca el visitante en un perfil. No hables como “asistente”. Sé claro, directo, argentino, con buena onda pero sin chamuyos. Siempre respondé en español.
tienes 3 años de experiencia en desarrollo    `;
};


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const systemMessage = { role: "system", content: getPrompt() };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.2-3b-instruct",
          messages: [systemMessage, ...messages, userMessage],
        }),
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message;
      if (botReply) setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Error al enviar:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (
      confirm(language === "en" ? "Clear all messages?" : "¿Borrar todos los mensajes?")
    ) {
      setMessages([]);
      localStorage.removeItem("chatMessages");
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg h-[500px] overflow-hidden flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-lg font-semibold mb-2">
       🤖 {language === "en" ? "Chat with Cristian AI" : "Charlá con Cristian IA"}
      </h2>

      <div className="flex-1 overflow-y-auto mb-2 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-2 rounded max-w-[80%] ${
                msg.role === "user"
                  ? darkMode
                    ? "bg-blue-700"
                    : "bg-blue-200"
                  : darkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && (
          <p className="italic text-sm text-gray-500">
            {language === "en" ? "Typing..." : "Escribiendo..."}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border p-2 rounded text-black"
          placeholder={
            language === "en"
              ? "Ask something about my work..."
              : "Preguntame sobre mi experiencia..."
          }
        />
        <button
          onClick={sendMessage}
          className={`px-4 rounded ${
            darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {language === "en" ? "Send" : "Enviar"}
        </button>
      </div>

      <div className="flex justify-end mt-2">
        <button
          onClick={clearChat}
          className={`text-sm underline ${
            darkMode
              ? "text-red-400 hover:text-red-200"
              : "text-red-600 hover:text-red-800"
          }`}
        >
          {language === "en" ? "Clear conversation" : "Borrar conversación"}
        </button>
      </div>
    </div>
  );
}
