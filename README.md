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
    "password": "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "token" : "string, unique"
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
    "phoneNumber": "string",
    "password": "string",
    "confirmPassword": "string",
    "company": "string",
    "jobTitle": "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Validation Reset Password

- Method : POST
- Endpoint : `/auth/reset/password`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "email": "string, unique",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "validate" : {
        "id": "integer, PK",
        "email": "string, unique",
        "name": "string"
    }
}
```

### Reset Password

- Method : PUT
- Endpoint : `/auth/reset/password/{id_user}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "newPassword": "string",
    "confirmPassword": "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

## Home API

## List User

Request :
- Method : GET
- Endpoint : `/home`
- Header :
    - Accept: application/json
- Query Param :
    - search[column]: string,
    - page: number || `1`,
    - limit: number || `10`,
    - sortBy: string || `createdAt`,
    - sortType: string || `DESC`,

Response :
```json
{
    "status" : "string",
    "message" : "string",
    "pageInfo" : {
        "count" : "number",
        "pages" : "number",
        "limit" : "number",
        "nextLink" : "string",
        "prevLink" : "string",
    },
    "results" : [
        {
            "id" : "integer, PK",
            "name" : "string",
            "email": "string, unique",
            "jobTitle" : "string",
            "company" : "string",
            "address" : "string",
            "photo" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
            "WorkSkill": [
                {
                    "id": "integer",
                    "workerId": "integer",
                    "Skill": {
                        "id": "integer, PK",
                        "name": "string",
                        "createdAt" : "date",
                        "updatedAt" : "date",
                    }
                },
                {
                    "id": "integer",
                    "workerId": "integer",
                    "Skill": {
                        "id": "integer, PK",
                        "name": "string",
                        "createdAt" : "date",
                        "updatedAt" : "date",
                    }
                }
            ],
            "SkillAmount": "integer"
        },
        {
            "id" : "integer, PK",
            "name" : "string",
            "email": "string, unique",
            "jobTitle" : "string",
            "company" : "string",
            "address" : "string",
            "photo" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
            "WorkSkill": [
                {
                    "id": "integer",
                    "workerId": "integer",
                    "Skill": {
                        "id": "integer, PK",
                        "name": "string",
                        "createdAt" : "date",
                        "updatedAt" : "date",
                    }
                },
                {
                    "id": "integer",
                    "workerId": "integer",
                    "Skill": {
                        "id": "integer, PK",
                        "name": "string",
                        "createdAt" : "date",
                        "updatedAt" : "date",
                    }
                }
            ],
            "SkillAmount": "integer"
        },
    ]
}
```

### Details User

Request :
- Method : GET
- Endpoint : `/home/{id_user}`
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
        "phoneNumber": "string",
        "jobTitle" : "string",
        "company" : "string",
        "address" : "string",
        "instagram" : "string",
        "github" : "string",
        "linkedin" : "string",
        "bio" : "string",
        "photo" : "string",
        "createdAt" : "date",
        "updatedAt" : "date",
        "WorkSkill": [
            {
                "id": "integer",
                "workerId": "integer",
                "Skill": {
                    "id": "integer, PK",
                    "name": "string",
                    "createdAt" : "date",
                    "updatedAt" : "date",
                }
            },
            {
                "id": "integer",
                "workerId": "integer",
                "Skill": {
                    "id": "integer, PK",
                    "name": "string",
                    "createdAt" : "date",
                    "updatedAt" : "date",
                }
            }
        ],
        "WorkExperience": [
            {
                "id" : "integer, PK",
                "userId" : "integer",
                "companyId" : "integer",
                "position" : "string",
                "startAt" : "date",
                "finishAt" : "date",
                "description" : "string",
                "createdAt" : "date",
                "updatedAt" : "date",
                "Company" : {
                    "id" : "integer, PK",
                    "name" : "string",
                    "field" : "string",
                    "city" : "string",
                    "photo" : "string",
                    "authorId": "integer",
                    "createdAt" : "date",
                    "updatedAt" : "date",
                }
            },
            {
                "id" : "integer, PK",
                "userId" : "integer",
                "companyId" : "integer",
                "position" : "string",
                "startAt" : "date",
                "finishAt" : "date",
                "description" : "string",
                "createdAt" : "date",
                "updatedAt" : "date",
                "Company" : {
                    "id" : "integer, PK",
                    "name" : "string",
                    "field" : "string",
                    "city" : "string",
                    "photo" : "string",
                    "authorId": "integer",
                    "createdAt" : "date",
                    "updatedAt" : "date",
                }
            },
        ],
        "Portofolio": [
            {
                "id" : "integer, PK",
                "userId" : "integer",
                "name" : "string",
                "publicLink" : "string",
                "repoLink" : "string",
                "company" : "string",
                "type" : "boolean",
                "photo" : "string",
                "description" : "string",
                "createdAt" : "date",
                "updatedAt" : "date",
            },
            {
                "id" : "integer, PK",
                "userId" : "integer",
                "name" : "string",
                "publicLink" : "string",
                "repoLink" : "string",
                "company" : "string",
                "type" : "boolean",
                "photo" : "string",
                "description" : "string",
                "createdAt" : "date",
                "updatedAt" : "date",
            },
        ]
    },
}
```

## Worker API

### Get Account

Request :
- Method : GET
- Endpoint : `/worker/account`
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
        "phoneNumber": "string",
        "jobTitle" : "string",
        "company" : "string",
        "address" : "string",
        "instagram" : "string",
        "github" : "string",
        "linkedin" : "string",
        "bio" : "string",
        "photo" : "string",
    },
}
```

### Update Account

Request :
- Method : PUT/PATCH
- Endpoint : `/worker/account`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "email" : "string",
    "phoneNumber" : "string",
    "instagram" : "string",
    "github" : "string",
    "linkedin" : "string",
    "jobTitle" : "string",
    "address" : "string",
    "company" : "string",
    "bio" : "string",
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
- Endpoint : `/worker/skill`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
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
- Endpoint : `/worker/skill/{id_skill}`
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
        "description" : "string",
        "createdAt" : "date",
        "updatedAt" : "date",
    },
}
```

### List Skill

Request :
- Method : GET
- Endpoint : `/worker/skill`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "results" : [
        {
            "id" : "integer, PK",
            "name" : "string",
            "description" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
        },
        {
            "id" : "integer, PK",
            "name" : "string",
            "description" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
        }
    ]
}
```

### Post WorkerSkill

Request :
- Method : POST
- Endpoint : `/worker/list/skill`
- Header :
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### List WorkerSkill

Request :
- Method : GET
- Endpoint : `/worker/list/skill`
- Header :
    - Accept: application/json
- Query Param :
    - page: number || `1`,
    - limit: number || `10`,
    - sortBy: string || `createdAt`,
    - sortType: string || `DESC`,

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "pageInfo" : {
        "count" : "number",
        "pages" : "number",
        "limit" : "number",
        "nextLink" : "string",
        "prevLink" : "string",
    },
    "results" : [
        {
            "id" : "integer, PK",
            "workerId": "integer",
            "skillId" : "integer",
            "Skill" : {
                "id" : "integer, PK",
                "name" : "string",
                "description" : "string",
                "createdAt" : "date",
                "updatedAt" : "date",
            }
        },
        {
            "id" : "integer, PK",
            "workerId": "integer",
            "skillId" : "integer",
            "Skill" : {
                "id" : "integer, PK",
                "name" : "string",
                "description" : "string",
                "createdAt" : "date",
                "updatedAt" : "date",
            }
        },
    ]
}
```

### Post WorkExperience

Request :
- Method : POST
- Endpoint : `/worker/experience`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "companyName" : "string",
    "position" : "string",
    "startAt" : "date",
    "finishAt" : "date",
    "description" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Update WorkExperience

Request :
- Method : PUT/PATCH
- Endpoint : `/worker/experience/{id_experience}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "companyName" : "integer",
    "position" : "string",
    "startAt" : "date",
    "finishAt" : "date",
    "description" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Get WorkExperience

Request :
- Method : GET
- Endpoint : `/worker/experience/{id_experience}`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "results" : {
        "id" : "integer, PK",
        "userId" : "integer",
        "companyId" : "integer",
        "position" : "string",
        "startAt" : "date",
        "finishAt" : "date",
        "description" : "string",
        "createdAt" : "date",
        "updatedAt" : "date",
        "Company" : {
            "id" : "integer, PK",
            "name" : "string",
            "field" : "string",
            "city" : "string",
            "photo" : "string",
            "authorId": "integer",
            "createdAt" : "date",
            "updatedAt" : "date",
        }
    },
}
```

### List WorkExperience

Request :
- Method : GET
- Endpoint : `/worker/experience`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,
    - page: number || `1`,
    - limit: number || `10`,
    - sortBy: string || `createdAt`,
    - sortType: string || `DESC`,

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "pageInfo" : {
        "count" : "number",
        "pages" : "number",
        "limit" : "number",
        "nextLink" : "string",
        "prevLink" : "string",
    },
    "results" : [
        {
            "id" : "integer, PK",
            "userId" : "integer",
            "companyId" : "integer",
            "position" : "string",
            "startAt" : "date",
            "finishAt" : "date",
            "description" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
            "Company" : {
                "id" : "integer, PK",
                "name" : "string",
                "field" : "string",
                "city" : "string",
                "photo" : "string",
                "authorId": "integer",
                "createdAt" : "date",
                "updatedAt" : "date",
            }
        },
        {
            "id" : "integer, PK",
            "userId" : "integer",
            "companyId" : "integer",
            "position" : "string",
            "startAt" : "date",
            "finishAt" : "date",
            "description" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
            "Company" : {
                "id" : "integer, PK",
                "name" : "string",
                "field" : "string",
                "city" : "string",
                "photo" : "string",
                "authorId": "integer",
                "createdAt" : "date",
                "updatedAt" : "date",
            }
        },
    ]
}
```

### Delete WorkExperience

Request :
- Method : DELETE
- Endpoint : `/worker/experience/{id_experience}`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string",
}
```

### Post Portofolio

Request :
- Method : POST
- Endpoint : `/worker/portofolio`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "publicLink" : "string",
    "repoLink" : "string",
    "company" : "string",
    "type" : "boolean",
    "photo" : "string",
    "description" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Update Portofolio

Request :
- Method : PUT/PATCH
- Endpoint : `/worker/portofolio`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "publicLink" : "string",
    "repoLink" : "string",
    "company" : "string",
    "type" : "boolean",
    "photo" : "string",
    "description" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Get Portofolio

Request :
- Method : GET
- Endpoint : `/worker/portofolio/{id_portofolio}`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "results" : {
        "id" : "integer, PK",
        "userId" : "integer",
        "name" : "string",
        "publicLink" : "string",
        "repoLink" : "string",
        "company" : "string",
        "type" : "boolean",
        "photo" : "string",
        "description" : "string",
        "createdAt" : "date",
        "updatedAt" : "date",
    },
}
```

### List Portofolio

Request :
- Method : GET
- Endpoint : `/worker/portofolio`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,
    - page: number || `1`,
    - limit: number || `10`,
    - sortBy: string || `createdAt`,
    - sortType: string || `DESC`,

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "pageInfo" : {
        "count" : "number",
        "pages" : "number",
        "limit" : "number",
        "nextLink" : "string",
        "prevLink" : "string",
    },
    "results" : [
        {
            "id" : "integer, PK",
            "userId" : "integer",
            "name" : "string",
            "publicLink" : "string",
            "repoLink" : "string",
            "company" : "string",
            "type" : "boolean",
            "photo" : "string",
            "description" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
        },
        {
            "id" : "integer, PK",
            "userId" : "integer",
            "name" : "string",
            "publicLink" : "string",
            "repoLink" : "string",
            "company" : "string",
            "type" : "boolean",
            "photo" : "string",
            "description" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
        },
    ]
}
```

### Delete Portofolio

Request :
- Method : DELETE
- Endpoint : `/worker/portofolio/{id_portofolio}`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string",
}
```

### Home Worker

Request :
- Method : GET
- Endpoint : `/worker/home`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,
    - page: number || `1`,
    - limit: number || `10`,
    - sortBy: string || `name`,
    - sortType: string || `DESC`,

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "pageInfo" : {
        "count" : "number",
        "pages" : "number",
        "limit" : "number",
        "nextLink" : "string",
        "prevLink" : "string",
    },
    "results" : [
        {
            "id" : "integer, PK",
            "name" : "string",
            "email": "string, unique",
            "phoneNumber": "string",
            "jobTitle" : "string",
            "company" : "string",
            "address" : "string",
            "instagram" : "string",
            "github" : "string",
            "linkedin" : "string",
            "bio" : "string",
            "photo" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
            "Company" : {
                "id" : "integer, PK",
                "authorId" : "integer",
                "name" : "string",
                "field" : "string",
                "city" : "string",
                "photo" : "string",
                "createdAt" : "date",
                "updatedAt" : "date",
            },
        },
        {
            "id" : "integer, PK",
            "name" : "string",
            "email": "string, unique",
            "phoneNumber": "string",
            "jobTitle" : "string",
            "company" : "string",
            "address" : "string",
            "instagram" : "string",
            "github" : "string",
            "linkedin" : "string",
            "bio" : "string",
            "photo" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
            "Company" : {
                "id" : "integer, PK",
                "authorId" : "integer",
                "name" : "string",
                "field" : "string",
                "city" : "string",
                "photo" : "string",
                "createdAt" : "date",
                "updatedAt" : "date",
            },
        },
    ]
}
```

## Recruiter API

### Get Account

Request :
- Method : GET
- Endpoint : `/recruiter/account`
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
        "phoneNumber": "string",
        "jobTitle" : "string",
        "company" : "string",
        "address" : "string",
        "instagram" : "string",
        "github" : "string",
        "linkedin" : "string",
        "bio" : "string",
        "photo" : "string",
    },
}
```

### Update Account

Request :
- Method : PUT/PATCH
- Endpoint : `/recruiter/account`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "email" : "string",
    "phoneNumber" : "string",
    "instagram" : "string",
    "github" : "string",
    "linkedin" : "string",
    "jobTitle" : "string",
    "address" : "string",
    "company" : "string",
    "bio" : "string",
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

### Post Company

Request :
- Method : POST
- Endpoint : `/recruiter/company`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "field" : "string",
    "city" : "string",
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

### Get Company

Request :
- Method : GET
- Endpoint : `/recruiter/company`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "results" : {
        "id" : "integer, PK",
        "authorId" : "integer",
        "name" : "string",
        "field" : "string",
        "city" : "string",
        "photo" : "string",
        "createdAt" : "date",
        "updatedAt" : "date",
    },
}
```

### Home Recruiter

Request :
- Method : GET
- Endpoint : `/recruiter/home`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,
    - page: number || `1`,
    - limit: number || `10`,
    - sortBy: string || `name`,
    - sortType: string || `DESC`,

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "pageInfo" : {
        "count" : "number",
        "pages" : "number",
        "limit" : "number",
        "nextLink" : "string",
        "prevLink" : "string",
    },
    "results" : [
        {
            "id" : "integer, PK",
            "name" : "string",
            "email": "string, unique",
            "phoneNumber": "string",
            "jobTitle" : "string",
            "company" : "string",
            "address" : "string",
            "instagram" : "string",
            "github" : "string",
            "linkedin" : "string",
            "bio" : "string",
            "photo" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
            "skill" : [
                {
                    "id": "integer, PK",
                    "name": "string"
                },
                {
                    "id": "integer, PK",
                    "name": "string"
                },
                {
                    "id": "integer, PK",
                    "name": "string"
                }
            ],
            "countSkill": "integer"
        },
        {
            "id" : "integer, PK",
            "name" : "string",
            "email": "string, unique",
            "phoneNumber": "string",
            "jobTitle" : "string",
            "company" : "string",
            "address" : "string",
            "instagram" : "string",
            "github" : "string",
            "linkedin" : "string",
            "bio" : "string",
            "photo" : "string",
            "createdAt" : "date",
            "updatedAt" : "date",
            "skill" : [
                {
                    "id": "integer, PK",
                    "name": "string"
                },
                {
                    "id": "integer, PK",
                    "name": "string"
                },
                {
                    "id": "integer, PK",
                    "name": "string"
                }
            ],
            "countSkill": "integer"
        },
    ]
}

## Message API


### Post Message

Request :
- Method : POST
- Endpoint : `/message/chat/{id_recruiter}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "message" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Update Message

Request :
- Method : PUT/PATCH
- Endpoint : `/message/chat/{id_message}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "message" : "string",
}
```

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Delete Message

Request :
- Method : DELETE
- Endpoint : `/message/chat/{id_message}`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string"
}
```

### Get Message

Request :
- Method : GET
- Endpoint : `/message/chat/{id_message}`
- Header :
    - Accept: application/json

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "results" : {
        "id": "integer, PK",
        "sender": "integer",
        "recipient": "integer",
        "message" : "string",
        "isLates" : "boolean",
        "unread" : "boolean",
        "createdAt": "date",
        "updatedAt": "date",
        "SenderDetails" : {
            "id": "integer, PK",
            "name": "string",
            "email": "string",
            "phoneNumber": "string",
            "jobTitle": "string",
            "photo": "string"
        },
        "RecipientDetails" : {
            "id": "integer, PK",
            "name": "string",
            "email": "string",
            "phoneNumber": "string",
            "jobTitle": "string",
            "photo": "string"
        }
    }
}
```

### List Message

Request :
- Method : GET
- Endpoint : `/message/list/chat/{id_recipient}`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,
    - page: number || `1`,
    - limit: number || `10`,
    - sortBy: string || `createdAt`,
    - sortType: string || `DESC`,

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "pageInfo" : {
        "count" : "number",
        "pages" : "number",
        "limit" : "number",
        "nextLink" : "string",
        "prevLink" : "string",
    },
    "results" : [
        {
            "id": "integer, PK",
            "sender": "integer",
            "recipient": "integer",
            "message" : "string",
            "isLates" : "boolean",
            "unread" : "boolean",
            "createdAt": "date",
            "updatedAt": "date",
            "SenderDetails" : {
                "id": "integer, PK",
                "name": "string",
                "email": "string",
                "phoneNumber": "string",
                "jobTitle": "string",
                "photo": "string"
            },
            "RecipientDetails" : {
                "id": "integer, PK",
                "name": "string",
                "email": "string",
                "phoneNumber": "string",
                "jobTitle": "string",
                "photo": "string"
            }
        },
        {
            "id": "integer, PK",
            "sender": "integer",
            "recipient": "integer",
            "message" : "string",
            "isLates" : "boolean",
            "unread" : "boolean",
            "createdAt": "date",
            "updatedAt": "date",
            "SenderDetails" : {
                "id": "integer, PK",
                "name": "string",
                "email": "string",
                "phoneNumber": "string",
                "jobTitle": "string",
                "photo": "string"
            },
            "RecipientDetails" : {
                "id": "integer, PK",
                "name": "string",
                "email": "string",
                "phoneNumber": "string",
                "jobTitle": "string",
                "photo": "string"
            }
        }
    ]
}
```

### List Person Message

Request :
- Method : GET
- Endpoint : `/message/list/person`
- Header :
    - Accept: application/json
- Query Param :
    - search: string,
    - page: number || `1`,
    - limit: number || `10`,
    - sortBy: string || `createdAt`,
    - sortType: string || `DESC`,

Response :

```json 
{
    "status" : "string",
    "message" : "string",
    "pageInfo" : {
        "count" : "number",
        "pages" : "number",
        "limit" : "number",
        "nextLink" : "string",
        "prevLink" : "string",
    },
    "results" : [
        {
            "id": "integer, PK",
            "sender": "integer",
            "recipient": "integer",
            "message" : "string",
            "isLates" : "boolean",
            "unread" : "boolean",
            "createdAt": "date",
            "updatedAt": "date",
            "SenderDetails" : {
                "id": "integer, PK",
                "name": "string",
                "email": "string",
                "phoneNumber": "string",
                "jobTitle": "string",
                "photo": "string"
            },
            "RecipientDetails" : {
                "id": "integer, PK",
                "name": "string",
                "email": "string",
                "phoneNumber": "string",
                "jobTitle": "string",
                "photo": "string"
            }
        },
        {
            "id": "integer, PK",
            "sender": "integer",
            "recipient": "integer",
            "message" : "string",
            "isLates" : "boolean",
            "unread" : "boolean",
            "createdAt": "date",
            "updatedAt": "date",
            "SenderDetails" : {
                "id": "integer, PK",
                "name": "string",
                "email": "string",
                "phoneNumber": "string",
                "jobTitle": "string",
                "photo": "string"
            },
            "RecipientDetails" : {
                "id": "integer, PK",
                "name": "string",
                "email": "string",
                "phoneNumber": "string",
                "jobTitle": "string",
                "photo": "string"
            }
        }
    ]
}
```
