# Nook Deploy (CECS3214 Homework #11)

Leonardo J. Rivera Morales, #146460

A small Express app for Nala's Nook used to practice Git, GitHub pull requests, and deploying a Node.js app. The home page shows values that come from environment variables, so it's easy to confirm they were set correctly on the hosting platform.

## Run locally

```
npm install
copy .env.example .env
npm start
```

Open http://localhost:3000. The JSON health check is at `/api/status`.

## Environment variables

| Name | Purpose |
|---|---|
| `SHOP_NAME` | Name shown in the header and page title |
| `NOOK_MESSAGE` | Message shown on the home page |
| `PORT` | Set automatically by the hosting platform |

## Deployment

Deployed on Render as a free web service connected to this GitHub repository. Render runs `npm install` to build and `npm start` to start the app, and redeploys automatically on every push to `main`. `SHOP_NAME` and `NOOK_MESSAGE` are set in the Render dashboard under Environment.

The assignment asks for Heroku, which no longer offers a free tier, so Render was used instead. The process is the same: connect the repository, set the environment variables, and deploy to a public URL. The `Procfile` is kept so the app can also run on Heroku without changes.
