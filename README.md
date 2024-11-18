# birthday-app-deno

App to text you birthday reminders.

### Service Breakdown
 Service  | Runtime           | Host        | Framework 
----------|-------------------|-------------|-----------
 Client   | Node (Typescript) | Vercel      | Vite      
 Server   | Deno 2.0          | Deno Deploy | Hono      
 Database | N/A               | Supabase    | Postgres  

## Installation

Instructions for installing the `birthday-app-deno` client and server assume you are in the respective directories.

### Client

1. Install Node
    - https://nodejs.org/en/download/package-manager/
2. Install Yarn
    - https://classic.yarnpkg.com/en/docs/install
3. Install packages using Yarn
   ```
      yarn install
   ```
4. Create a `.env` file
    - TBD

### Server

1. Install Deno
    - https://docs.deno.com/runtime/getting_started/installation/
2. Create a `.env` file
    - PORT
        - Input your desired value
    - DATABASE_URL
        - Project Settings -> Database -> Connection String -> Copy
3. Download the cert file
    - Project Settings -> Database -> SSL Configuration -> Download certificate

## Run Application

### Client

```
yarn dev
```

### Server

```
deno run dev
```
