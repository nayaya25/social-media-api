# API Documentation

## Introduction
This document provides details about the endpoints available in the API.

## Project Setup
- Ensure you have node v17++ installed
- Ensure ypu have mongoDb installed
- create .env file with the following variables
  - PORT
  - MONGODB_URI
  - JWT_SECRET
- navigate to the root folder and run
  ```shell
    npm install
  ```
- to start the development server run
  ```shell
    npm run dev
  ```
- to start the server run first run
  ```shell
    npm run build
  ```
  then run
  ```shell
    npm run start
  ```
## Base URL
http://localhost:3000/api/v1

## Authentication
API requests require authentication using Token. Include the Token in the request headers as follows:
Authorization: Bearer YOUR_TOKEN

## Rate Limiting
The API has rate limiting enabled to prevent abuse. Users are allowed a maximum of 1000 requests per hour.

## Error Responses
In case of errors, the API returns the appropriate HTTP status code along with an error message in the response body.

Example:

```json
{
  "message": "Post Not Found"
}
```
------------------------------------------------------------------------------------------

#### Register a User

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Create a user)</code></summary>


##### Pre-Condtion
<summary>
 None
</summary>

##### Parameters

> | name     |  type     | data type | description                                                           |
> |----------|-----------|-----------|-----------------------------------------------------------------------|
> | username |  required | string    | N/A  |
> | email    |  required | string    | N/A  |
> | password |  required | string    | N/A  |


##### Responses

> | http code | content-type | response                                             |
> |-----------|----|------------------------------------------------------|
> | `201`     | `application/json` | `New User Object`                                    |
> | `401`     | `application/json` | `{"message":"Invalid Credentials"}`                  |
> | `422`     | `application/json` | `{"message":[ { password: "Passwors is required"} ]` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @user.json http://localhost:3000/api/v1/auth/register
> ```
</details>

------------------------------------------------------------------------------------------

#### User Login

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Login a user)</code></summary>


##### Pre-Condtion
<summary>
 None
</summary>

##### Parameters

> | name     |  type     | data type | description                                                           |
> |----------|-----------|-----------|-----------------------------------------------------------------------|
> | email    |  required | string    | N/A  |
> | password |  required | string    | N/A  |


##### Responses

> | http code | content-type | response                                             |
> |-----------|----|------------------------------------------------------|
> | `200`     | `application/json` | `{"token" : "JWT TOKEN"}`                            |
> | `400`     | `application/json` | `{"message":"Invalid Credentials"}`                  |
> | `422`     | `application/json` | `{"message":[ { password: "Passwors is required"} ]` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @user.json http://localhost:3000/api/v1/auth/login
> ```
</details>

------------------------------------------------------------------------------------------

#### Create a Post

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Create a post)</code></summary>


##### Pre-Condtion
<summary>
 Authorization header set with (Bearer TOKEN)
</summary>

##### Parameters

> | name   | type     | data type          | description                  |
> |--------|----------|--------------------|------------------------------|
> | userId | required | string             | User Id of the owner of post |
> | text   | required | string             | The text to post             |
> | media  | optional | media(image,video) | Any optional media           |


##### Responses

> | http code | content-type | response                                     |
> |-----------|----|----------------------------------------------|
> | `200`     | `application/json` | `{"message" : "Post created successfully"}`  |
> | `400`     | `application/json` | `{"message":"Bad Request"}`                  |
> | `401`     | `application/json` | `{"message":"Missing Token"}`                |
> | `422`     | `application/json` | `{"message":[ { text: "Text is required"} ]` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:3000/api/v1/posts/create
> ```
</details>

------------------------------------------------------------------------------------------

#### Like a Post

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Like a post)</code></summary>

##### Pre-Condtion
<summary>
 Authorization header set with (Bearer TOKEN)
</summary>

##### Parameters

> | name   | type     | data type     | description    |
> |--------|----------|---------------|----------------|
> | postId | required | param(string) | Id of the post |


##### Responses

> | http code | content-type | response                                 |
> |-----------|----|------------------------------------------|
> | `200`     | `application/json` | `{"message" : "Post liked successfully"}` |
> | `404`     | `application/json` | `{"message":"Post Not found"}`           |
> | `400`     | `application/json` | `{"message":"Missing Param: postId"}`    |
> | `500`     | `application/json` | `{"message": "Internal Server Error" ]`  |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:3000/api/v1/posts/6617c481784018cf3605620a/like
> ```
</details>

------------------------------------------------------------------------------------------

#### Comment on a Post

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Comment on a post)</code></summary>


##### Pre-Condtion
<summary>
 Authorization header set with (Bearer TOKEN)
</summary>

##### Parameters

> | name   | type     | data type     | description    |
> |--------|----------|---------------|----------------|
> | postId | required | param(string) | Id of the post |
> | text   | required | body(string)  | The comment    |



##### Responses

> | http code | content-type | response                                |
> |-----------|----|-----------------------------------------|
> | `200`     | `application/json` | `{"message" : "Post Commented successfully"}` |
> | `404`     | `application/json` | `{"message":"Post Not found"}`          |
> | `400`     | `application/json` | `{"message":"Missing Param: postId"}`   |
> | `500`     | `application/json` | `{"message": "Internal Server Error" ]` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:3000/api/v1/posts/6617c481784018cf3605620a/comment
> ```
</details>

------------------------------------------------------------------------------------------

#### Get Number of Likes & Comments

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(Number of likes/comments on a post)</code></summary>

##### Pre-Condtion
<summary>
 Authorization header set with (Bearer TOKEN)
</summary>


##### Parameters

> | name   | type     | data type     | description    |
> |--------|----------|---------------|----------------|
> | postId | required | param(string) | Id of the post |



##### Responses

> | http code | content-type | response                                                                          |
> |-----------|----|-----------------------------------------------------------------------------------|
> | `200`     | `application/json` | `{"message": "Counts Fetched","data": {"numberOfLikes": 1,"numberOfComments": 6}}` |
> | `404`     | `application/json` | `{"message":"Post Not found"}`                                                    |
> | `400`     | `application/json` | `{"message":"Missing Param: postId"}`                                             |
> | `500`     | `application/json` | `{"message": "Internal Server Error" ]`                                           |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" --data @post.json http://localhost:3000/api/v1/posts/6617c481784018cf3605620a/likes-comments-count
> ```
</details>


------------------------------------------------------------------------------------------

#### Follow a User

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(Follow a User)</code></summary>


##### Pre-Condtion
<summary>
 Authorization header set with (Bearer TOKEN)
</summary>

##### Parameters

> | name   | type     | data type    | description          |
> |--------|----------|--------------|----------------------|
> | userId | required | body(string) | Id of user to follow |



##### Responses

> | http code | content-type | response                                                         |
> |-----------|----|------------------------------------------------------------------|
> | `200`     | `application/json` | `{"message": "User Followed Successfully"}`                      |
> | `404`     | `application/json` | `{"message":"The User You are trying to follow is unavailable"}` |
> | `400`     | `application/json` | `{"message":"Missing Param: userId"}`                            |
> | `500`     | `application/json` | `{"message": "Internal Server Error" ]`                          |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" --data userId='ecbdueii3672bdb' http://localhost:3000/api/v1/users/follow
> ```
</details>


------------------------------------------------------------------------------------------

#### Get Posts by Followed Users

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(GET posts by users followed)</code></summary>


##### Pre-Condtion
<summary>
 Authorization header set with (Bearer TOKEN)
</summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |



##### Responses

> | http code | content-type | response                                               |
> |-----------|----|--------------------------------------------------------|
> | `200`     | `application/json` | `{"message": "Posts by following fetched", data: [{}]` |
> | `404`     | `application/json` | `{"message":"You are not following any Users"}`        |
> | `401`     | `application/json` | `{"message":"Mising Token"}`                           |
> | `500`     | `application/json` | `{"message": "Internal Server Error" ]`                |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/v1/posts/following
> ```
</details>