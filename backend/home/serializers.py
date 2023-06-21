from django.contrib.auth import get_user_model,authenticate
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username','password','email','name')
        extra_kwargs = {'password':{'write_only':True,'min_length':8}}

    def create(self,validate_data):
        return get_user_model().objects.create(**validate_data)
    
class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        style={'input_type':'password'},
        trim_whitespace = False
    )
    def validate(self, attrs):
        email = attrs.get('email')
        username = attrs.get('username')
        password = attrs.get('password')
        name = attrs.get('name')

        user = authenticate(
            request=self.context.get('request'),
            email = email,
            username = username,
            name = name,
            password = password
        )
        if not user:
            raise serializers.ValidationError("Invalid User Credentials")
        attrs['user'] = user
        return attrs
