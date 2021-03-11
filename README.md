# Api Spec

### GROUP: Authentication

- [1] - Register
- [POST] : {root.api}/api/{version}/auth/register

```json
Request:
{
    "account_number": "1233",
    "identity_number": "327s506",
    "username": "adam",
    "email_address": "adam@gmail.com",
    "password": "password"
}

Response:
{
    "status": "success",
    "message": "User was registered successfully!",
    "data": {
        "id": "6049a0b54b732c245cd7bd8b",
        "accountNumber": "1233",
        "identityNumber": "327s506",
        "userName": "adam",
        "emailAddress": "adam@gmail.com"
    }
}
```

- [2] - Login
- [POST] : {root.api}/api/{version}/auth/login

```json
Request:
{
    "email_address": "adam@gmail.com",
    "password": "password"
}

Response:
{
    "status": "success",
    "message": "Login successfuly",
    "data": {
        "id": "6049a0b54b732c245cd7bd8b",
        "userName": "adam",
        "emailAddress": "adam@gmail.com",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDlhMGI1NGI3MzJjMjQ1Y2Q3YmQ4YiIsImlhdCI6MTYxNTQzODA3MCwiZXhwIjoxNjE1NTI0NDcwfQ.VOzn6gg5XOItF5mSHUG01tiHqZIAqsYU0nQK0VU63UQ"
    }
}
```

### GROUP: User

- [1] - List users
- [GET] : {root.api}/api/{version}/users

```
Headers :

    - key : Authorization
    - Value : token

params :
    - key : account_number  Value : account number
    - key : identity_number  Value : identity number
```

```json
Response:
{
    "meta": {
        "message": "Avatar successfuly uploaded",
        "code": 200,
        "status": "success"
    },
    "data": {
        "is_uploaded": true
    }
}
```

- [2] - User Detail
- [GET] : {root.api}/api/{version}/users/:id

```
Headers :
    - key : Authorization
    - Value : token
```

```json

Response:
{
    "status": "success",
    "message": "Find user detail successfully",
    "data": {
        "id": "60497f02ead56b0f545ee5ca",
        "accountNumber": "1233",
        "identityNumber": "333",
        "userName": "adamnasrudin",
        "emailAddress": "adamnasrudin@gmail.com"
    }
}
```

- [3] - Update user
- [PUT] : {root.api}/api/{version}/users/:id/update

```json
Headers :

    - key : Authorization
    - Value : token
Request :
{
    "account_number": "1233",
    "identity_number": "327s506",
    "username": "updateuser",
    "email_address": "adaaxzzxsda@gmail.com",
    "password": "adamnasrudin"
}

Response:
{
    "status": "success",
    "message": "Updated successfully"
}
```

- [3] - Delete user
- [DELETE] : {root.api}/api/{version}/users/:id/delete

```json
Headers :
    - key : Authorization
    - Value : token

Response:
{
    "status": "success",
    "message": "Deleted successfully!",
    "data": {
        "id": "60497c843ddd49373cbf924e",
        "accountNumber": "111",
        "identityNumber": "123",
        "userName": "adamnadaasrudin",
        "emailAddress": "adaaxzzxsda@gmail.com"
    }
}
```
