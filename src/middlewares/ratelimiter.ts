import rateLimit from 'express-rate-limit';

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const maxGlobal = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;
const maxAuth = Number(process.env.AUTH_RATE_LIMIT_MAX) || 5;

export const globalRateLimiter = rateLimit({
  windowMs,
  max: maxGlobal,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Muitas requisições originadas deste IP. Tente novamente mais tarde.',
  },
});

export const authRateLimiter = rateLimit({
  windowMs,
  max: maxAuth,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Muitas tentativas de autenticação. Tente novamente em 15 minutos.',
  },
});