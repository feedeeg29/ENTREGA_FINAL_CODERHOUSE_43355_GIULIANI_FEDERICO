import dotenv from 'dotenv';

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
});

export const PORT = process.env.PORT || 8080

export const persistence = process.env.PERSISTENCE

export const secret = process.env.SECRET;

export const clientGitID = process.env.CLIENT_ID;

export const clientSecret = process.env.CLIENT_SECRET;

export const clientGitURL = process.env.GIT_CALLBACK_URL;

export const dbUser = process.env.DB_USER

export const dbPass = process.env.DB_PASSWORD

export const dbHost = process.env.HOST
