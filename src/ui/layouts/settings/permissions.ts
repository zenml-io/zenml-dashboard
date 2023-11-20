import { User } from '../../../api/types';

// export function getUniquePermissions(user?: User) {
//   if (!user) return [];
//   if (!user.metadata?.roles) return [];
//   const allPermissions = user.metadata?.roles.flatMap(
//     (role) => role.body.permissions,
//   );
//   const uniquePermissions = Array.from(new Set(allPermissions));
//   return uniquePermissions;
// }
