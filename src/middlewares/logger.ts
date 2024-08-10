import { Request, Response, NextFunction } from "express";

export const logRequestDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, method, query, body } = req;
  console.info(`[${new Date().toLocaleString()}] Request Details: %o`, {
    url,
    method,
    query,
    body,
  });
  const oldSend = res.send;
  // @ts-expect-error: Overriding res.send to log response details
  res.send = function (...args: string[]) {
    console.info("Response: %o", args[0]);
    // @ts-expect-error: Calling the original res.send method
    oldSend.apply(res, args);
  };

  next();
};
