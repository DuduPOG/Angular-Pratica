from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .auth_serializers import RegisterSerializer

class SignupView(APIView):
    permission_classes=[]
    def post(self,request):
        s=RegisterSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        s.save()
        return Response({'detail':'Usuário criado'},status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes=[]
    def post(self,request):
        user=authenticate(username=request.data.get('username'),password=request.data.get('password'))
        if not user:
            return Response({'detail':'Credenciais inválidas'},status=401)
        refresh=RefreshToken.for_user(user)
        return Response({'refresh':str(refresh),'access':str(refresh.access_token)})
