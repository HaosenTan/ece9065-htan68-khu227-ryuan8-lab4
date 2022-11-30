import axios from "axios";

const API_URL = "http://127.0.0.1:3009/api/open/";
// const API_URL = "http://172.20.10.2:3000/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
      Email: email,
      password,
      name: username,
  })
  .then(response =>{
    return response.data;
  });
    // return axios({
    //     method: 'post',
    //     url: API_URL + 'register',
    //     data: {
    //         email,
    //         password,
    //         name: username
    //     }
    // })
    // .then(response => {
    //     return response.data;
    // });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      Email: email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("userInfo");
};

export default {
  register,
  login,
  logout,
};