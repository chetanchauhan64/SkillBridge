/**
 * formatCurrency.js — Shared formatting and helper utilities
 *
 * Centralises display formatting logic so individual components
 * don't inline their own number/date/string formatting.
 *
 * Usage:
 *   import { formatINR, formatUSD, formatRelativeTime, truncate } from "../utils/formatCurrency";
 *
 * Contributed by: Chetan Chauhan
 */

/**
 * Format a number as Indian Rupees (₹).
 * @param {number} amount - Amount in paise or rupees
 * @param {boolean} fromPaise - Set true if amount is in paise (Razorpay returns paise)
 * @returns {string} e.g. "₹1,499.00"
 */
export function formatINR(amount, fromPaise = false) {
  const value = fromPaise ? amount / 100 : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number as US Dollars ($).
 * @param {number} amount
 * @returns {string} e.g. "$24.99"
 */
export function formatUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Converts a date string or Date object to a human-friendly relative label.
 * @param {string|Date} date
 * @returns {string} e.g. "2 days ago", "just now", "3 months ago"
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
}

/**
 * Truncate a string to a maximum length and append ellipsis.
 * @param {string} str
 * @param {number} maxLength - Default 120
 * @returns {string}
 */
export function truncate(str, maxLength = 120) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalise(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
