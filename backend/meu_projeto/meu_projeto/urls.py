from django.urls import path
from django.http import JsonResponse

def endpoint_teste(request):
    return JsonResponse({"mensagem": "Olá, Rodrigo! Conexão Node + Django feita com sucesso!"})

urlpatterns = [
    # Removemos a linha do admin daqui para destravar o servidor
    path('api/teste/', endpoint_teste),
]
