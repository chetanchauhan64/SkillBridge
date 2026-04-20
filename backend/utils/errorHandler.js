/**
 * errorHandler.js — Centralised async error handler utility
 *
 * Wraps Express route handlers in a try/catch so individual
 * controllers don't need to repeat boilerplate error handling.
 * Passes all unhandled errors to Express's global error handler.
 *
 * Usage in routes:
 *   import { asyncHandler } from "../utils/errorHandler.js";
 *
 *   router.get("/", asyncHandler(async (req, res) => {
 *     const gigs = await prisma.gig.findMany();
 *     res.json(gigs);
 *   }));
 *
 * Contributed by: Chetan Chauhan
 */

/**
 * Wraps an async Express handler and forwards any thrown error
 * to Express's `next()` — which triggers the global error middleware.
 *
 * @param {Function} fn - Async Express handler (req, res, next) => Promise
 * @returns {Function} Standard Express middleware
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Creates a structured API error response.
 * Use this for predictable, user-facing errors.
 *
 * @param {import("express").Response} res
 * @param {number} statusCode - HTTP status code (400, 401, 403, 404, 500…)
 * @param {string} message - Human-readable error message
 * @param {object} [details] - Optional extra fields (validation errors, etc.)
 */
export const sendError = (res, statusCode, message, details = {}) => {
  res.status(statusCode).json({
    error: message,
    ...details,
  });
};
