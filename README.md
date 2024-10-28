# birthday-app-deno

App to text you birthday reminders built with Deno 2.0

## Local Setup

1. .env file
   - PORT
   - DATABASE_URL
2. Cert file from Database settings in database hosting service.

## Run Server

```
deno --cert ./prod-ca-2021.crt -ERNS --env --watch server.ts
```
