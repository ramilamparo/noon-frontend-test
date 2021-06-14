# Table of Contents

- [Running the app](#running-the-app)
- [Required environment variables](#required-environment-variables)
- [The backend API](#the-backend-api)
  - [Authentication API](#authentication-api)
  - [Posts API](#posts-api)
  - [Favorites API](#favorites-api)
- [The frontend](#the-frontend)
  - [Home page](#home-page)
  - [Favorites page](#favorites-page)
  - [Authentication page](#authentication-page)

# Running the app

To run in development mode, use:

```bash
npm install # Installs dependencies
npm run migrate:dev # Generates sqlite database.
npm run dev # Runs app in development mode.
```

To run in production mode, use:

```bash
npm install # Installs dependencies
npm run build
npm run migrate:prod # Generates postgres database.
npm run start
```

To run in production mode using docker,

Run the script in the project root directory.

`./build --db-pass postgres --db-user postgres --db-name noon-test --port 80 --secret my_secret_ --next-api-endpoint my-website.example.com`

# Required environment variables

You can create a .env in the root project directory and create the following records.

In development mode use:

```
SECRET=my_secret_
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
```

In production mode use:

```
SECRET=my_secret_
NEXT_PUBLIC_API_ENDPOINT=mywebsite.example.com
DATABASE_NAME=noon-test
DATABASE_USER=postgres
DATABASE_PASSWORD=my_password
DATABASE_HOST=psql.example.com
```

# The backend API

The RESTful is integrated within the same codebase as NextJS.

- JWT used for authentication token. The token must be used in each request as a header to identify the user. `Authorization: Bearer <token>`
- Passwords are encrypted in Bcrypt.
- sqlite is used as a database in dev mode, postgres in prod.
- ObjectionJS as an ORM

## Authentication API

### `POST /api/auth/login`

Once logged in, the server responds with a JWT that will be used for identifying the user.

User needs to be signed up first before logging in.

#### Body

```json
{
	"username": "john.doe@example.com",
	"password": "hunter2"
}
```

#### Response

```json
{
	"success": true,
	"message": "Successfully logged in.",
	"data": "<JWT_TOKEN>"
}
```

### `POST /api/auth/signup`

Signs up the user with the provided username, and password.

`username` field not need to be an email.

#### Body

```json
{
	"username": "john.doe@example.com",
	"password": "hunter2"
}
```

#### Response

```json
{
	"success": true,
	"message": "Successfully signed up."
}
```

#### Body

_NONE_

#### Response

```json
{
	"success": true,
	"message": "Successfully logged out."
}
```

## Posts API

### `GET /api/posts`

Get all posts.

#### Response

```json
{
	"success": true,
	"message": "Successfully found posts.!",
	"data": [
		{
			"id": 1,
			"title": "Top 10 Anime Hairstyles",
			"imageSrc": "https://images.unsplash.com/photos/9pO3LgH-9-Y",
			"description": "Here are the top anime hairstyles according to...",
			"favoriteCount": 398
		}
	]
}
```

### `POST /api/posts`

> **WARNING**: To protect this app from illegal images, I decided to only allow images hosted on unsplash.org.

> **WARNING**: User needs to be signed in.

Create a new post.

#### Body

```json
{
	"title": "Top 10 Anime Hairstyles",
	"imageSrc": "https://images.unsplash.com/photos/9pO3LgH-9-Y",
	"description": "Here are the top anime hairstyles according to..."
}
```

#### Response

```json
{
	"success": true,
	"message": "Successfully found posts!",
	"data": {
		"id": 1,
		"title": "Top 10 Anime Hairstyles",
		"imageSrc": "https://images.unsplash.com/photos/9pO3LgH-9-Y",
		"description": "Here are the top anime hairstyles according to...",
		"favoriteCount": 398
	}
}
```

## Favorites API

### `GET /api/me/favorites`

> **WARNING**: User needs to be signed in.

Returns all favorited posts by the user.

#### Response

```json
{
	"success": true,
	"message": "Successfully found posts.!",
	"data": [
		{
			"title": "Top 10 Anime Hairstyles",
			"imageSrc": "https://images.unsplash.com/photos/9pO3LgH-9-Y",
			"description": "Here are the top anime hairstyles according to...",
			"favoriteCount": 398
		}
	]
}
```

### `POST /api/me/favorites`

> **WARNING**: User needs to be signed in.

Adds the post to user favorites.

#### Body

```json
{
	"postId": 1
}
```

#### Response

```json
{
	"success": true,
	"message": "Successfully favorited post."
}
```

### `DELETE /api/me/favorites/:id`

> **WARNING**: User needs to be signed in.

Deletes post from user favorites.

#### Response

```json
{
	"success": true,
	"message": "Successfully unfavorited post."
}
```

# The frontend

- NextJS used as the React framework.
- Used styled-components for styling.
- Redux used for app state management.

## Home page

Shows the last 100 posts.

How to create a post:

- Create an account
- Login with the account
- Go to the home page
- Fill in the title, image link, and description for the post.
- Submit!

> **NOTE:** Please only use image links hosted on images.unsplash.com
> I made this decision to stop users from posting undesirable images.

To get a link for an image in,

- Go to unsplash.com
- Right click on the image.
- Select ‘Copy Image Link’

## Favorites Page

> **WARNING**: User needs to be signed in.

### `/me/favorites`

Shows posts that have been favorited by the user.

## Authentication page

### `/login`

Shows the login page where the user could sign in or sign up.

### `/signup`

Shows the login page where the user could sign in or sign up.
