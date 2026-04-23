import type { BannedUser } from '../types/ban';

/**
 * List of banned users
 *
 * To ban a user, add their details to this array.
 * The identifier can be an email, username, or user ID depending on your authentication system.
 *
 * Example:
 * {
 *   identifier: 'user@example.com',
 *   reason: 'Spam posting',
 *   bannedAt: new Date('2026-04-22'),
 *   bannedBy: 'admin',
 * }
 *
 * For temporary bans, add an expiresAt date:
 * {
 *   identifier: 'user@example.com',
 *   reason: 'Violation of terms',
 *   bannedAt: new Date('2026-04-22'),
 *   expiresAt: new Date('2026-05-22'),
 *   bannedBy: 'admin',
 * }
 */
export const bannedUsers: BannedUser[] = [
  // Add banned users here
];
