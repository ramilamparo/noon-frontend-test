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
npm run dev
# or
yarn dev
```

# Required environment variables

You can create a .env in the root project directory and create the following records.

```
SECRET=Your_Secret_Key_To_Encrypt_Password
```

# The backend API

The RESTful is integrated within the same codebase as NextJS.

## Authentication API

When a user tries to login, the server responds with a session cookie which it will then use to identify the user in further requests.

### `POST /auth/login`

Once logged in, the server responds with a `set-cookie` header that will be used for identifying the user.

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
	"success": true, // or false, if incorrect password.
	"message": "Successfully logged in." // Additional details.
}
```

### `POST /auth/signup`

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
	"success": true, // or false, if something goes wrong...
	"message": "Successfully signed up." // Additional details.
}
```

### `POST /auth/logout`

Invalidates the cookie server-side. Disabling access from `/me/*` routes.

#### Body

_NONE_

#### Response

```json
{
	"success": true, // or false, if something goes wrong...
	"message": "Successfully logged out." // Additional details.
}
```

## Posts API

### `GET /posts`

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
			"image": "https://unsplash.com/photos/9pO3LgH-9-Y",
			"description": "Here are the top anime hairstyles according to...",
			"favoriteCount": 398
		}
	]
}
```

### `POST /posts`

> **WARNING**: To protect this app from illegal images, I decided to only allow images hosted on unsplash.org.

> **WARNING**: User needs to be signed in.

Create a new post.

#### Body

```json
{
	"title": "Top 10 Anime Hairstyles",
	"image": "https://unsplash.com/photos/9pO3LgH-9-Y",
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
		"image": "https://unsplash.com/photos/9pO3LgH-9-Y",
		"description": "Here are the top anime hairstyles according to...",
		"favoriteCount": 398
	}
}
```

## Favorites API

### `GET /me/favorites`

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
			"image": "https://unsplash.com/photos/9pO3LgH-9-Y",
			"description": "Here are the top anime hairstyles according to...",
			"favoriteCount": 398
		}
	]
}
```

### `POST /me/favorites`

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

### `DELETE /me/favorites/:id`

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

## Home page

Shows the last 100 posts.

## Favorites Page

> **WARNING**: User needs to be signed in.

### `/me/favorites`

Shows posts that have been favorited by the user.

## Authentication page

### `/login`

Shows the login page where the user could sign in or sign up.
