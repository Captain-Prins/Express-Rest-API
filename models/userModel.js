import fs from 'node:fs/promises';

const userFilePath = new URL(
  "../data/users.json",
  import.meta.url
)

async function AllUsers() {
  const data = await fs.readFile(userFilePath, "utf8");

  return JSON.parse(data);

}

async function writeUsers(users){
  const jsonData = JSON.stringify(users, null, 2);

  await fs.writeFile(userFilePath,jsonData,"utf8");
}


export function getsAllUsers(){
  return AllUsers();
}

export async function getsUserId(userId) {
  const users = await AllUsers();
  return users.find((user) => user.id === userId);
}

export async function CreateNewUsers(name, role) {

  const users = await AllUsers();


  const newId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  const newUser = {
    id: newId,
    name,
    role,
  };

  users.push(newUser);

 await writeUsers(users);
  return newUser;
}

export async function updateUsers(userId, name, role) {
  const users = await AllUsers();
  const newUser = users.find((user) => user.id === userId);

  if (!newUser) {
    return null;
  }

  newUser.name = name;
  newUser.role = role;

 await writeUsers(users);
  return newUser;
}

export async function deleted(userId) {
  const users = await AllUsers();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return null;
  }

  const deletedUser = users.splice(userIndex, 1)[0];

 await writeUsers(users);
  return deletedUser;
}
