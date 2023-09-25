export function getUniquePermissions(user?: TUser) {
  if (!user) return [];
  const allPermissions = user.roles.flatMap((role) => role.permissions);
  const uniquePermissions = Array.from(new Set(allPermissions));
  return uniquePermissions;
}
