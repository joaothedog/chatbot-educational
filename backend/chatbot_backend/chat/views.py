from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MessageSerializer
from decouple import config
import openai

class ChatbotView(APIView):
    def post(self, request):
        user_message = request.data.get('message')
        
        # integrar com openai
        openai.api_key = config('OPENAI_API_KEY')
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_message}]
        )
        
        bot_response = response['choices'][0]['message']['content']
        
        # salva no banco
        serializer = MessageSerializer(data={
            'user_message': user_message,
            'bot_response': bot_response,
        })
        
        if serializer.is_valid():
            serializer.save()
        
        return Response({'bot_response': bot_response}, status=status.HTTP_200_OK)