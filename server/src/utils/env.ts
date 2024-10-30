import { z } from "zod"

export const PORT = z.coerce.number().parse(process.env.PORT || 3333);
export const APP_ENV = z.string().parse(process.env.APP_ENV || 'env');
export const SECRET = z.string().parse(process.env.SECRET);

export const GOOGLE_APPLICATION_CREDENTIALS = z.string().parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
export const FIREBASE_API_KEY = z.string().parse(process.env.FIREBASE_API_KEY);
export const FIREBASE_AUTH_DOMAIN = z.string().parse(process.env.FIREBASE_AUTH_DOMAIN);
export const FIREBASE_PROJECT_ID = z.string().parse(process.env.FIREBASE_PROJECT_ID);
export const FIREBASE_STORAGE_BUCKET = z.string().parse(process.env.FIREBASE_STORAGE_BUCKET);
export const FIREBASE_MESSAGING_SENDER_ID = z.string().parse(process.env.FIREBASE_MESSAGING_SENDER_ID);
export const FIREBASE_APP_ID = z.string().parse(process.env.FIREBASE_APP_ID);

export const TWILIO_ACCOUNT_SID = z.string().parse(process.env.ACCOUNT_SID)
export const TWILIO_AUTH_TOKEN = z.string().parse(process.env.AUTH_TOKEN)