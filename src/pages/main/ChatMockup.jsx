// Se añaden los imports que este componente necesita
import React, { useState, useRef, useEffect } from 'react'; 

// Este es el componente del chat
function ChatMockup() {
    
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hola! Soy Enrique, tu tutor virtual.', sender: 'other' },
        { id: 2, text: 'Puedes hacerme preguntas o cargar tus archivos para que te ayude.', sender: 'other' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'me',
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

            {/* --- 2. Cuerpo (Lista de Mensajes) --- */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex mb-3 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`rounded-lg py-2 px-4 max-w-[80%] break-words ${
                                message.sender === 'me'
                                    ? 'bg-teal-800 text-white' // Estilo "Enviado"
                                    : 'bg-gray-300 text-gray-800' // Estilo "Recibido"
                            }`}
                        >
                            {message.text}
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
                        className="px-5 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}

// ¡Muy importante! Exportamos el componente para que otros archivos puedan usarlo
export default ChatMockup;