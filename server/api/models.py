from django.db import models
 
 
class User(models.Model):
    nickname = models.CharField(max_length=20, verbose_name='닉네임')
    id = models.CharField(max_length=20, verbose_name='아이디', primary_key=True, unique=True)
    password = models.CharField(max_length=20, verbose_name='비밀번호')
   
    class Meta:
        db_table = 'User'