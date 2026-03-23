import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing required environment variable: RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// FROM_EMAIL falls back to Resend's sandbox address (valid for dev/staging)
export const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';

if (!process.env.OWNER_EMAIL) {
    throw new Error('Missing required environment variable: OWNER_EMAIL');
}

export const OWNER_EMAIL = process.env.OWNER_EMAIL;

export { resend };
