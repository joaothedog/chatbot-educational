import axios from 'axios';

const api = await axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export const sendMessageToChatbot = async (message: string) => {
    try {
        const response = await api.post('chat/', { message });
        return response.data;
    } catch (error: any) {
        console.error('Mensagem de erro:', error.response || error);
        throw new Error(error.response?.data?.detail || 'Ocorreu um erro')
    }
}

export default api;