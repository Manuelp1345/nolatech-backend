import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 45,
  message: "Demasiadas solicitudes, por favor intenta de nuevo más tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});
