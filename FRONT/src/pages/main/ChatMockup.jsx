// Se añaden los imports que este componente necesita
import React, { useState, useRef, useEffect } from "react";
import { evaluarRiesgo } from "../../services/risk_service";

// Este es el componente del chat
function ChatMockup() {
const [messages, setMessages] = useState([
    { id: 1, text: "Hola! Soy Enrique, tu tutor virtual.", sender: "other" },
    {
    id: 2,
    text: "Puedes hacerme preguntas o cargar tus archivos para que te ayude.",
    sender: "other",
    },
]);
const [newMessage, setNewMessage] = useState("");
const messagesEndRef = useRef(null);

// Función para añadir mensajes
const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

// --- FUNCIÓN PRINCIPAL PARA ENVIAR MENSAJES ---
const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMsg = {
    id: messages.length + 1,
    text: newMessage,
    sender: "me",
    };
    addMessage(userMsg);
    setNewMessage("");

    // 🔍 Detectar si el mensaje contiene asistencia y promedio (en cualquier orden)
const regex =
/asistencia\s*[:=]?\s*(\d+(?:\.\d+)?)|promedio\s*[:=]?\s*(\d+(?:\.\d+)?)/gi;

let asistencia = null;
let promedio = null;
let match;
while ((match = regex.exec(newMessage)) !== null) {
if (match[1]) asistencia = parseFloat(match[1]);
if (match[2]) promedio = parseFloat(match[2]);
}

// 🧠 Solo activar el modelo si hay al menos ambos valores numéricos
if (asistencia !== null && promedio !== null) {
const tasaDesercion = 0.2;
const result = await evaluarRiesgo(asistencia, promedio, tasaDesercion);

if (result.error) {
    addMessage({
    id: Date.now(),
    text:
        "⚠️ No pude calcular tu riesgo ahora mismo. Verifica que el servidor esté activo.",
    sender: "other",
    });
} else {
    const prob = Math.round(result.probabilidad * 100);
    const nivel =
    prob >= 70 ? "Alto ⚠️" : prob >= 40 ? "Medio 🟡" : "Bajo 🟢";
    const color =
    prob >= 70
        ? "bg-red-100 border-red-300 text-red-800"
        : prob >= 40
        ? "bg-yellow-100 border-yellow-300 text-yellow-800"
        : "bg-green-100 border-green-300 text-green-800";

    addMessage({
    id: Date.now(),
    sender: "other",
    text: (
        <div className={`border rounded-2xl p-4 mt-3 shadow-sm ${color}`}>
        <p className="font-semibold text-lg">📊 Evaluación de Riesgo</p>
        <p>Probabilidad de deserción: <b>{prob}%</b></p>
        <p>Nivel de riesgo: <b>{nivel}</b></p>
        <p className="text-sm italic text-gray-600">
            (Basado en tu asistencia y promedio)
        </p>
        </div>
    ),
    });
}
return;
}


    // 💬 Si el mensaje NO trata de riesgo → usa el backend de chat
    try {
    const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
    });

    const data = await response.json();

    addMessage({
        id: Date.now(),
        text:
        data.response ||
        "🤔 No entendí muy bien, ¿podrías explicarlo mejor?",
        sender: "other",
    });
    } catch (error) {
    console.error(error);
    addMessage({
        id: Date.now(),
        text: "❌ No se pudo conectar con el servidor de chat.",
        sender: "other",
    });
    }
};

// --- Mantiene el scroll abajo siempre ---
const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
    scrollToBottom();
}, [messages]);

return (
    <div className="flex flex-col w-full h-[500px] rounded-lg shadow-xl bg-white font-sans">
    {/* --- 1. Cabecera (Header) --- */}
    <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h3 className="text-xl font-semibold text-gray-800">Chat con Enrique</h3>
        <p className="text-sm text-green-500">En línea</p>
    </div>

    {/* --- 2. Cuerpo (Mensajes) --- */}
    <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((message) => (
        <div
            key={message.id}
            className={`flex mb-3 ${
            message.sender === "me" ? "justify-end" : "justify-start"
            }`}
        >
            <div
            className={`rounded-lg py-2 px-4 max-w-[80%] break-words ${
                message.sender === "me"
                ? "bg-teal-800 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
            >
            {typeof message.text === "string" ? message.text : message.text}
            </div>
        </div>
        ))}
        <div ref={messagesEndRef} />
    </div>

    {/* --- 3. Pie (Input de Mensaje) --- */}
    <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        <button
            type="submit"
            className="px-5 py-3 bg-orange-900 hover:bg-teal-900 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
        >
            Enviar
        </button>
        </form>
    </div>
    </div>
);
}

// ¡Muy importante! Exportamos el componente
export default ChatMockup;
