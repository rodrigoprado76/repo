from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# Mantenha suas outras importações abaixo...

urlpatterns = [
    # Rota para fazer login e receber o Token
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Rota para renovar o token expirado automaticamente
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Mantenha sua rota de cadastro aqui embaixo...
]

from django.urls import path
from django.http import JsonResponse

def endpoint_teste(request):
    return JsonResponse({"mensagem": "Olá, Rodrigo! Conexão Node + Django feita com sucesso!"})

urlpatterns = [
    # Removemos a linha do admin daqui para destravar o servidor
    path('api/teste/', endpoint_teste),
]
