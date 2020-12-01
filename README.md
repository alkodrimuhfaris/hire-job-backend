# API Spec

## Authentication

All API must use this authentication

Request :
- Header :
    - X-Api-Key : "your secret api key"

### Login

- Method : POST
- Endpoint : `/auth/login`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "email": "string, unique",
    "password": "string"
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Register

- Method : POST
- Endpoint : `/auth/signup/{id_roles}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name": "string",
    "email": "string, unique",
    "noHp": "string",
    "password": "string",
    "perusahaan": "string",
    "jabatan": "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

## Employe API

### Get Account

Request :
- Method : GET
- Endpoint : `/employe/account`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "results" : {
        "id" : "integer, PK",
        "name" : "string",
        "email": "string, unique",
        "noHp": "string",
        "jobTitle" : "string",
        "domisili" : "string",
        "workplace" : "string",
        "description" : "string",
        "photo" : "string",
    },
}

### Update Account

Request :
- Method : PUT/PATCH
- Endpoint : `/employe/account`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "jobTitle" : "string",
    "domisili" : "string",
    "workplace" : "string",
    "description" : "string",
    "photo" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Post Skill

Request :
- Method : POST
- Endpoint : `/employe/skill`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "skill" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Get Skill

Request :
- Method : GET
- Endpoint : `/employe/skill`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "results" : [
        {
            "id" : "integer, PK",
            "userId" : "integer, FK",
            "name" : "string",
            "description" : "string",
        },
        {
            "id" : "integer, PK",
            "userId" : "integer, FK",
            "name" : "string",
            "description" : "string",
        }
    ]
}
```