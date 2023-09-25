import { User } from '../../../api/types';

export function getUniquePermissions(user?: User) {
  if (!user) return [];
  if (!user.roles) return [];
  const allPermissions = user.roles.flatMap((role) => role.permissions);
  const uniquePermissions = Array.from(new Set(allPermissions));
  return uniquePermissions;
}
