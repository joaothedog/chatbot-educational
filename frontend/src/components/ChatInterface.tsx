import React, { useState } from 'react';
import { sendMessageToChatbot } from '../services/api';

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<{user: string; bot: string }[]>([])
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if(!input.trim()) return;

        setLoading(true);
        try {
            const response = await sendMessageToChatbot(input);
            setMessages([...messages, {user: input, bot: response.bot_response}]);
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar a mensagem!');
        } finally {
            setInput('');
            setLoading(false);
        }
    };

    return(
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>Usuário:</strong> {msg.user}</p>
                        <p><strong>Robô:</strong> {msg.bot}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem para o robô"
            />
            <button onClick={sendMessage} disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
            </button>
        </div>
    );
}

export default ChatInterface;