# User Ban System

This template includes a simple user ban management system that can be integrated with your authentication and authorization system.

## Overview

The ban system provides:
- Type-safe user ban data structures
- Configuration file for managing banned users
- Utility functions to check ban status
- Support for both permanent and temporary bans

## Files

- **`src/types/ban.ts`** - TypeScript type definitions for the ban system
- **`src/data/bannedUsers.ts`** - Configuration file containing the list of banned users
- **`src/utils/banUtils.ts`** - Utility functions for checking ban status

## Usage

### Adding a Banned User

Edit `src/data/bannedUsers.ts` and add a user to the `bannedUsers` array:

```typescript
export const bannedUsers: BannedUser[] = [
  {
    identifier: 'user@example.com',
    reason: 'Spam posting',
    bannedAt: new Date('2026-04-22'),
    bannedBy: 'admin',
  },
];
```

### Temporary Ban

To create a temporary ban, include an `expiresAt` date:

```typescript
{
  identifier: 'user@example.com',
  reason: 'Violation of terms',
  bannedAt: new Date('2026-04-22'),
  expiresAt: new Date('2026-05-22'), // Ban expires after 30 days
  bannedBy: 'admin',
}
```

### Checking Ban Status

In your authentication or API endpoints, use the utility functions:

```typescript
import { checkBanStatus, assertNotBanned } from './utils/banUtils';

// Check if a user is banned
const result = checkBanStatus('user@example.com');
if (result.isBanned) {
  console.log(result.message);
  // Handle banned user
}

// Or throw an error if banned
try {
  assertNotBanned('user@example.com');
  // User is not banned, continue
} catch (error) {
  // User is banned, handle error
  console.error(error.message);
}
```

### Getting Active Bans

To view all currently active bans:

```typescript
import { getActiveBans } from './utils/banUtils';

const activeBans = getActiveBans();
console.log(`${activeBans.length} users are currently banned`);
```

## Integration with Authentication

To integrate this ban system with your authentication:

1. **Add authentication** - Implement user authentication (e.g., OAuth, JWT)
2. **Check on login** - Call `checkBanStatus()` during login
3. **Middleware** - Add middleware to check ban status on protected routes
4. **Admin panel** - Create an admin interface to manage banned users

### Example Middleware

```typescript
// Example: Check ban status in Astro middleware
export const onRequest = async ({ locals, redirect }, next) => {
  const user = locals.user; // Assuming user is set by auth middleware

  if (user) {
    const banStatus = checkBanStatus(user.email);
    if (banStatus.isBanned) {
      return redirect('/banned');
    }
  }

  return next();
};
```

## API Integration

For API endpoints that require authentication:

```typescript
// Example API endpoint
export async function POST({ request }) {
  const { userEmail } = await request.json();

  // Check ban status before processing
  try {
    assertNotBanned(userEmail);
    // Process request
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 403 }
    );
  }
}
```

## Future Enhancements

Consider these improvements for a production system:

- **Database storage** - Move banned users to a database (D1, KV, or external DB)
- **Admin API** - Create API endpoints to manage bans programmatically
- **Ban history** - Track ban/unban history
- **Ban notifications** - Email users when they are banned or unbanned
- **IP bans** - Add support for IP-based bans
- **Appeal system** - Allow users to appeal bans

## Notes

- This is a basic implementation suitable for small sites or as a starting point
- For production use with many users, consider moving to a database
- The `identifier` field can be adapted to match your authentication system (email, username, user ID, etc.)
- All ban checks are case-insensitive
