from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nome
