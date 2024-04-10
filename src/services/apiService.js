import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:2000/api',
});

const setAuthToken = () => {
    const userData = localStorage.getItem('user');
  
    if (userData) {
        try {
            const user = JSON.parse(userData);
            const { access_token } = user[0];

            if (access_token) {
                const headers = {
                    ...api.defaults.headers.common,
                    Authorization: `Bearer ${access_token}`
                };
                api.defaults.headers.common = headers;
            } else {
                delete api.defaults.headers.common['Authorization'];
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            delete api.defaults.headers.common['Authorization'];
        }
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Call setAuthToken to set initial token
setAuthToken();

export { api, setAuthToken };
