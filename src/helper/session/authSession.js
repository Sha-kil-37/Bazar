export const setAuth = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
//
export const getAuth = () => {
  return JSON.parse(localStorage.getItem("user"));
};
