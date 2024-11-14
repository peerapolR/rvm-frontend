import axios from "../config/axios"

export const login = (value) => axios.post("/users/login", value)

export const getMe = () => axios.get("/users/me")

// export const changePin = (value) => axios.post("/users/changePin",value)