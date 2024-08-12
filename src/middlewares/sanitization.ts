import mongoSanitize from "express-mongo-sanitize";

export const sanitizationMiddleware = mongoSanitize({
  replaceWith: "_",
});

// Use the middleware in the application
export default sanitizationMiddleware;
