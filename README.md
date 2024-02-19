# Oh auth...

## Description

This is a small practice project to better understand the OAuth and OIDC (OpenID Connect) protocols. The project is a full stack application which utilizes an Auth0 application to manage authentication and authorization for my app. I have the steps built out in a manual way as opposed to using the Auth0 client library in order to better understand the process.

## Tech Stack
- React
- NestJS

## How does it work

This utilizes the [Authorization Code Flow with Proof Key for Code Exchange](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce) when interacting with Auth0. This process allows the frontend app to obtain an access token which can be used do authenticate users in the backend app which includes user permissions and an id token which contains information about the user.

The flow can be illustrated by the following diagram:

![PKCE Flow](./public/auth-sequence-auth-code-pkce.png)


## Set Up

Add a `.env.local` file to the `frontend` application with the following env variables:
- `REACT_APP_AUTH0_CLIENT_ID` - The Auth0 client id
- `REACT_APP_AUTH0_AUDIENCE` - The name given to the API in Auth0
- `REACT_APP_AUTH0_DOMAIN` - The url for the Auth0 project
- `REACT_APP_API_URL` - The url to the `backend` api

Add a `.env` file to the root directory of the `backend` folder and assign the following env variables:
- `AUTH0_SECRET` - this should be a base64 encoded string of the signing certifate for the Auth0 application. This is used to verify the signature of the access token sent from the frontend app.
