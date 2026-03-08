import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev';
export const OWNER_EMAIL = process.env.OWNER_EMAIL ?? 'danishhussainshahidoficial@gmail.com';

export { resend };
