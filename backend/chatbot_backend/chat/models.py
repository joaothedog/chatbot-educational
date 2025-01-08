from django.db import models

class Message(models.Model):
    user_message = models.TextField()
    bot_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # esse parametro faz com que a data seja a atual do momento da pergunta/resposta