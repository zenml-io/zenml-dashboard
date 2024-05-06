export const getInitials = (fullName: string) => {
  if (!fullName) return '';
  return fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

export const getInitialsFromEmail = (email: string) => {
  if (!email) return '';
  return email
    .split('@')
    .map((name) => name[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};
