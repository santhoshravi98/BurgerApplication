import Axios from 'axios';
const axiosInstance = Axios.create({
    baseURL:"https://burger-demo-21a12.firebaseio.com/"
});
export default axiosInstance;