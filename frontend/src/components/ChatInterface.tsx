import React, { useState } from 'react';
import { sendMessageToChatbot } from '../services/api';

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return; // nao enviar msgs vazias

        // aguarda resposta da msg do user
        setMessages([...messages, { user: input, bot: '' }]);
        setLoading(true);

        try {
            const response = await sendMessageToChatbot(input);
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].bot = response.bot_response;
                return updatedMessages;
            });
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar mensagem. Verifique sua conexão ou tente novamente.');
        } finally {
            setInput('');
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial' }}>
            <h1>Chat com o Bot</h1>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll', backgroundColor: '#00000' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '15px' }}>
                        <p><strong>Você:</strong> {msg.user}</p>
                        {msg.bot ? <p><strong>Bot:</strong> {msg.bot}</p> : <p><em>Esperando resposta...</em></p>}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    style={{ flexGrow: 1, padding: '10px', fontSize: '16px' }}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{ padding: '10px 20px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
