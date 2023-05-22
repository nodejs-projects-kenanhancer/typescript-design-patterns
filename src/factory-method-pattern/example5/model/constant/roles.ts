export const ROLES = [
  "Member",
  "Moderator",
  "Editor",
  "Guest",
  "Admin",
  "SuperAdmin",
] as const;

export type RoleType = (typeof ROLES)[number];
