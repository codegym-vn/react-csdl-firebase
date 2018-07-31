# Sử dụng Firebase để xây dựng chức năng đăng ký, đăng nhập

## Firebase
Đăng kí tài khoản firebase sau đó tạo 1 project và copy config vào file: `src/config/firebase.json` như sau:
```
{
  "apiKey": "xxxxx",
  "authDomain": "project-xxx.firebaseapp.com",
  "databaseURL": "https://project-xxx.firebaseio.com",
  "projectId": "project-xxx",
  "storageBucket": "project-xxx.appspot.com",
  "messagingSenderId": "xxx"
}
```

- Bật chế độ xác thực thông qua email và password
![Email/password](/demo/auth-password.png)

## Ảnh demo

![Login](/demo/login.jpeg)

![Register](/demo/register.jpeg)

![Home page](/demo/home.jpeg)