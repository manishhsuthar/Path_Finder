from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, label='Confirm Password')
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True, max_length=30)
    last_name = serializers.CharField(required=True, max_length=30)
    role = serializers.ChoiceField(
        choices=['student', 'admin'],
        required=False,
        default='student'
    )

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'first_name', 'last_name', 'role')
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data.get('role', 'student')
        )
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        # The default validation mechanism of `TokenObtainPairSerializer`
        # uses the `authenticate` method of Django's auth framework.
        # By setting `username_field = 'email'`, the `authenticate` method
        # will use the email for authentication.
        data = super().validate(attrs)

        # Add custom claims to the response
        data.update({'email': self.user.email})
        data.update({'role': self.user.role})
        data.update({'first_name': self.user.first_name})
        data.update({'last_name': self.user.last_name})

        return data

