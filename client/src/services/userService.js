import axios from "../axios";

const handleLoginAPi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

export { handleLoginAPi }