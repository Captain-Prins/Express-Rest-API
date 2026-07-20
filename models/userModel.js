import users from "../data/users.js";

export function getsAllUsers() {
  return users;
}

export function getsUserId(userId) {
  return users.find((user) => user.id === userId);
}

export function CreateNewUsers(name, role) {
  const newId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  const newUser = {
    id: newId,
    name,
    role,
  };

  users.push(newUser);

  return newUser;
}

export function updateUsers(userId, name, role) {
  const newUser = getsUserId(userId);

  if (!newUser) {
    return null;
  }

  newUser.name = name;
  newUser.role = role;

  return newUser;
}

export function deleted(userId) {
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return null;
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  return deletedUser;
}
