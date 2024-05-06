### 🎉 Mobilicis Assignment 🎉

preview [Moblicis assignment](https://mobilicis-client-five.vercel.app).
This website shows my skills , experience and serves as a platform for potential employers and collaborators to learn more about me and my work.

![mobilicis-client-five vercel app_auth_login](https://github.com/Nayanchandrakar/Mobilicis-server/assets/100008163/f07c2c81-e4ac-426d-b218-44425a19681f)

`Prerequisites`

- Node.js v20.12.0
- npm
- pnpm

` Frontend Built With`

- Next JS
- Tailwind Css
- Typescript
- shadcn UI
- Zod

` Backend Built With`

- Node JS
- Express JS
- Mongodb
- Typescript
- Zod
- Helmet & Morgan

## Frontend Setup

To install and run the application locally, follow these steps:

1. Clone the repository using the following command:

```
git clone -b client https://github.com/Nayanchandrakar/Mobilicis-server.git ./client
```

2.Navigate to the project directory:

```
cd client
```

3.Install the required packages:

```
npm install or yarn add
```

4.Add Environment varibales in .env file:

```
NEXT_PUBLIC_SERVER_URL=
```

5.Start the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Backend Setup

To install and run the server locally, follow these steps:

1. Clone the repository using the following command:

```
git clone -b master https://github.com/Nayanchandrakar/Mobilicis-server.git ./server
```

2.Navigate to the project directory:

```
cd server
```

3.Install the required packages:

```
npm install or yarn add
```

4.Add Environment varibales in .env file:

```
DATABASE_URL=
JWT_SECRET=
CLIENT_URL=
MAIL_PORT=465
MAIL_USER= your_gmail_acount
MAIL_PASSWORD=your_gmail_app_password
```

5.Start the server:

```
npm start
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## Backend API Structure

#### Authentication Routes

⭐ To check whether api is working or not:

`Method`

- GET

```
http://localhost:5000
```

<hr>

⭐ For registering a new user:

`Method`

- POST

```
http://localhost:5000/auth/register
```

`Body`

- user name
- Gmail address or Email
- password

<hr>

⭐ Route for verifying registered user Email address:

`Method`

- GET

```
http://localhost:5000/auth/verify-token/:token
```

`Params`

- Takes token as a parameter

<hr>

⭐ Route for login existing user

`Method`

- GET

```
http://localhost:5000/auth/login
```

`Body`

- Email address
- Password

<hr>

⭐ Route for Getting the current logged in user Data

`Method`

- GET

```
http://localhost:5000/auth/user
```

`Params`

- user id token

<hr>

⭐ Route for Getting the current logged in user Data

`Method`

- GET

```
http://localhost:5000/auth/user
```

`Aurhorization Bearer`

- user id token

<hr>

⭐ Route for Enabling and disabling 2FA authentication.

`Method`

- POST

```
http://localhost:5000/auth/twofactor
```

`Aurhorization Bearer`

- user id token

`Body`

- twoFactor :boolean

<hr>

⭐ Logout the user and track it in database.

`Method`

- GET

```
http://localhost:5000/auth/logout
```

`Aurhorization Bearer`

- user id token

<hr>

#### Analytics Route

⭐ Route for fetching all the user analytics and sessions.

`Method`

- GET

```
http://localhost:5000/analytics/get
```

`Aurhorization Bearer`

- user id token

<hr>

#### Activity Track Routes

⭐ Route for fetching all the user activities.

`Method`

- GET

```
http://localhost:5000/activity/get
```

`Aurhorization Bearer`

- user id token

<hr>

⭐ For deleting the user activities.

`Method`

- DELETE

```
http://localhost:5000/activity/delete
```

`Aurhorization Bearer`

- user id token
- takes activity id

<hr>

#### User Session Routes

⭐ Responses a Single user current Session.

`Method`

- GET

```
http://localhost:5000/session/single
```

`Aurhorization Bearer`

- user id token
