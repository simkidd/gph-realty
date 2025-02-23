import { z } from "zod";

export type ApiError = {
  error: string;
  details?: unknown;
  status?: number;
  message?: string;
};

export type ValidationError = ApiError & {
  error: "Validation Error";
  details: z.ZodFormattedError<unknown>;
};

export type ServerError = ApiError & {
  error: "Server Error";
  message?: string;
};
