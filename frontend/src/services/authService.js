import axios from 'axios'

const register = async (user)=>{
    await axios.post("user/register", user);
}

const login = async (user)=>{
    const response =  await axios.post("user/login", user);
    if (response.data)  localStorage.setItem("user", JSON.stringify(response.data));
    return response;
}

const authServices = {
    register,
    login
};

export default authServices;