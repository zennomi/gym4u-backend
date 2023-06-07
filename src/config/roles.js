const allRoles = {
  user: ['user'],
  manager: ['user', 'manager'],
  admin: ['user', 'manager', 'admin'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
