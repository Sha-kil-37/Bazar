import axios from "axios";

// base url
let baseUrl = "https://dummyjson.com/auth";
// user login
export const login = async function (name, password) {
  try {
    let url = `${baseUrl}/login`;
    return await axios.post(url, {
      name: name,
      password: password,
      expiresInMins: 30, // optional, defaults to 60
    });
  } catch (error) {
    return error;
  }
};
//
// get all user
// export const getAllUser = async function () {
//   fetch("https://dummyjson.com/users")
//     .then((res) => res.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error));
// };
