# API REST Server
## Back-end API REST NodeJS + TypeScript + SQLITE + JSON WEB TOKEN.

### Response in JSON format. 
### Required register or login to recieve token given in json. 
### Authentication mode: Bearer. Insert Authentication Bearer token to obtain data.

```
Todo:
    - Store JSON WEB TOKEN in cookie.
```
<br>
Located in: http://localhost:8000

```
SQLITE INFO:
    product: {
        id
        name
        amount
        price
    },
    user: {
        id
        email (unique)
        password
    }
```

```
API INFO:
    - endpoints: {
        User:
        /api/register: Required Body JSON with valid user

        /api/login: Required Body JSON with valid user

        Product:
        /api/post: 
            Required Body JSON with valid product
            Required Authentication Bearer Token

        /api/get:
            Required Authentication Bearer Token
            No Body required

        /api/update/:name:
                Required valid name in url to update
                Required Body JSON with valid user data to update on url :name product
                Authentication Bearer Token

        /api/delete: 
                Required valid name in url to delete
                Authentication Bearer Token
                No Body required
    }
```

## Project setup
```
npm install
```
### Builds project.
```
npm run build
```
### Run server with --respawn
```
npm run dev
```
### Transpile to ./dist/
```
npm run start
```
