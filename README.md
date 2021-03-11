### Testing with postman

```
import the file in Postman located at ./export/heroku backend_test.postman_collection.json
```

### Link Dev with heroku

```
GROUP: Authentication
[1] - Register
[POST] : https://adamnasrudin.herokuapp.com/api/v1/auth/register
[2] - Login
[POST] : https://adamnasrudin.herokuapp.com/api/v1/auth/login


GROUP: User
[1] - List Users
[GET] : https://adamnasrudin.herokuapp.com/api/v1/users
[2] - Detail User
[GET] : https://adamnasrudin.herokuapp.com/api/v1/users/:id
[3] - Update User
[PUT] : https://adamnasrudin.herokuapp.com/api/v1/users/:id/update
[4] - Delete User
[DELETE] : https://adamnasrudin.herokuapp.com/api/v1/users/:id/delete

```

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
    "status": "success",
    "message": "Find All successfully",
    "data": [
        {
            "_id": "6049a8bc48b67100153203ff",
            "accountNumber": "11032021",
            "identityNumber": "3275060309090099199",
            "userName": "adamnasrudin",
            "emailAddress": "adamnasrudin@gmail.com",
            "password": " ",
            "createdAt": "2021-03-11T05:21:00.095Z",
            "updatedAt": "2021-03-11T05:21:00.095Z",
            "__v": 0
        },
        {
            "_id": "6049bfee0b823c001518ff3b",
            "accountNumber": "1233",
            "identityNumber": "327s506",
            "userName": "adamnasrudin",
            "emailAddress": "adamnasrudi1n@gmail.com",
            "password": " ",
            "createdAt": "2021-03-11T06:59:58.673Z",
            "updatedAt": "2021-03-11T07:36:05.650Z",
            "__v": 0
        },
        {
            "_id": "6049e8c2b9c3a2001569b2b0",
            "accountNumber": "11032021000001",
            "identityNumber": "327506030909002121",
            "userName": "adamcodeid",
            "emailAddress": "adamcodeid@gmail.com",
            "password": " ",
            "createdAt": "2021-03-11T09:54:10.335Z",
            "updatedAt": "2021-03-11T09:54:10.335Z",
            "__v": 0
        }
    ],
    "total_data": 3,
    "data_perPage": 5,
    "current_page": 1,
    "total_page": 1
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
