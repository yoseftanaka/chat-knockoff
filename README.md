# Assumptions

- This project assumes that there is no group chat
- "Conversation" assumes the meaning of the interaction between 2 users
- User story 2 assumes similar to user story 1 (only the receiver and sender swap role) hence there is no extra API
- "Messages" assumes the meaning of the bubble chat

# Prerequisites

- User should have already installed and ready to use mysql
- User should have already installed and ready to use npm

# Installation Guide

- install pm2
  ```
  npm install pm2@latest -g
  ```
- enter the project folder and let npm install dependencies
  ```
  npm i
  ```
- build the project
  ```
  npm run build
  ```
- run project using pm2 (application name can be anything)
  ```
  pm2 start dist/main.js --name <application_name>
  ```
- server should run on localhost:3000

# API Contract

- ## Login

  endpoint: /users/login\
  method: POST\
  body:

  ```
  {
    "username": "string",
    "password": "string"
  }
  ```

  response:

  ```
  {
    "access_token": "string"
  }
  ```

- ## Register / Signup

  endpoint: /users/register\
  method: POST\
  body:

  ```
  {
    "name": "string",
    "username": "string",
    "password": "string"
  }
  ```

- ## List Conversation

  endpoint: /users/list/involved-conversation\
  method: GET\
  query parameter:

  - viewerId: string

  header:

  - Authorization: Bearer {{jwt token}}

  response:

  ```
  {
    "data": [
        {
            "text": "string",
            "unreadMessages": "string number",
            "name": "string"
        }
    ]
  }
  ```

- ## Post Message

  endpoint: /messages\
  method: POST\
  header:

  - Authorization: Bearer {{jwt token}}\

  body:

  ```
  {
    "senderId": "string",
    "recipientId": "string",
    "text": "string"
  }
  ```

- ## Get Messages

  endpoint: /messages/list\
  method: GET\

  header:

  - Authorization: Bearer {{jwt token}}

  body:

  ```
  {
    "searchedUserId": "string",
    "viewerId": "string"
  }
  ```

  response:

  ```
  {
    "data": [
        {
            "text": "string"
        }
    ]
  }
  ```
