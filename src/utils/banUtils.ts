import { bannedUsers } from '../data/bannedUsers';
import type { BanCheckResult } from '../types/ban';

/**
 * Check if a user is currently banned
 *
 * @param identifier - The user identifier (email, username, or ID)
 * @returns BanCheckResult with ban status and details
 */
export function checkBanStatus(identifier: string): BanCheckResult {
  const bannedUser = bannedUsers.find(
    (user) => user.identifier.toLowerCase() === identifier.toLowerCase()
  );

  if (!bannedUser) {
    return {
      isBanned: false,
      message: 'User is not banned',
    };
  }

  // Check if ban has expired
  if (bannedUser.expiresAt) {
    const now = new Date();
    if (now > bannedUser.expiresAt) {
      return {
        isBanned: false,
        message: 'Ban has expired',
      };
    }
  }

  return {
    isBanned: true,
    banDetails: bannedUser,
    message: `User is banned: ${bannedUser.reason}`,
  };
}

/**
 * Check if a user is banned and throw an error if they are
 *
 * @param identifier - The user identifier (email, username, or ID)
 * @throws Error if user is banned
 */
export function assertNotBanned(identifier: string): void {
  const result = checkBanStatus(identifier);
  if (result.isBanned && result.banDetails) {
    throw new Error(
      `Access denied. ${result.banDetails.reason}. Banned since ${result.banDetails.bannedAt.toISOString()}`
    );
  }
}

/**
 * Get a list of all currently active bans
 *
 * @returns Array of banned users with active bans
 */
export function getActiveBans() {
  const now = new Date();
  return bannedUsers.filter((user) => {
    if (!user.expiresAt) return true; // Permanent ban
    return now <= user.expiresAt; // Temporary ban still active
  });
}

/**
 * Get a list of all expired bans
 *
 * @returns Array of banned users with expired bans
 */
export function getExpiredBans() {
  const now = new Date();
  return bannedUsers.filter((user) => {
    return user.expiresAt && now > user.expiresAt;
  });
}
