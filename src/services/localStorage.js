const ACCESS_TOKEN = "access_token";

export const getToken = () => localStorage.getItem(ACCESS_TOKEN);

export const setToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);

export const removeToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const setCurrentPage = (page) => {
  localStorage.setItem("page", page);
};

export const getCurrentPage = () => localStorage.getItem("page");

// export const getToken = () => {
//   if (typeof window !== "undefined") {
//     localStorage.getItem(ACCESS_TOKEN)
//       ? JSON.parse(localStorage.getItem(ACCESS_TOKEN))
//       : null;
//   }
// };
