/**
 * Types for user ban management system
 */

export interface BannedUser {
  /** Unique identifier for the user (email, username, or ID) */
  identifier: string;
  /** Reason for the ban */
  reason: string;
  /** Timestamp when the user was banned */
  bannedAt: Date;
  /** Optional: Timestamp when the ban expires (undefined for permanent bans) */
  expiresAt?: Date;
  /** Admin who issued the ban */
  bannedBy: string;
}

export interface BanCheckResult {
  /** Whether the user is currently banned */
  isBanned: boolean;
  /** Details about the ban if user is banned */
  banDetails?: BannedUser;
  /** Message explaining the ban status */
  message: string;
}
