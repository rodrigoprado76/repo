import json
from django.urls import path
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from meu_projeto.core.models import Cliente

# 1. Endpoint de teste simples (Liberado para testar conexão)
def endpoint_teste(request):
    return JsonResponse({"mensagem": "Olá, Rodrigo! Conexão Node + Django feita com sucesso!"})

# 2. Endpoint de Cadastro REAL (🔒 Protegido com Token JWT)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cadastrar_cliente(request):
    try:
        dados = json.loads(request.body)
        novo_cliente = Cliente.objects.create(
            nome=dados.get('nome'),
            email=dados.get('email')
        )
        return JsonResponse({"status": "sucesso", "id": novo_cliente.id}, status=201)
    except Exception as e:
        return JsonResponse({"status": "erro", "mensagem": str(e)}, status=400)

# 3. Lista ÚNICA de rotas do projeto
urlpatterns = [
    # Rota de teste antiga
    path('api/teste/', endpoint_teste),
    
    # Rotas de Login e segurança JWT
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Rota de cadastro nova protegida
    path('api/cadastro/', cadastrar_cliente),
]
