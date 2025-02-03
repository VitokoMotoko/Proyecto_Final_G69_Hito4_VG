// Este uso de BD será temporal solo para el diseño del Front.. despues manejaré losd atos con PostgreSQL
const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  export const addUser = (user) => {
    const users = getUsersFromLocalStorage();
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { ...user, id };
    users.push(newUser);
    saveUsersToLocalStorage(users);
    return newUser;
  };
  
  export const getUserByEmail = (email) => {
    const users = getUsersFromLocalStorage();
    return users.find(user => user.email === email);
  };
  
  export const getUserByNickname = (nickname) => {
    const users = getUsersFromLocalStorage();
    return users.find(user => user.nickname === nickname);
  };
  
  export const getUserByEmailAndPassword = (email, password) => {
    const users = getUsersFromLocalStorage();
    return users.find(user => user.email === email && user.password === password);
  };