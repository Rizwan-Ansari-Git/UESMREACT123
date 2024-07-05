
import axios from 'axios';
import EDR_API_URL from './config';

const Api = axios.create({
  baseURL: EDR_API_URL,
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    
  },
  (error) => Promise.reject(error)
);

export default Api;

// import axios from 'axios';
// import { EDR_API_URL1, EDR_API_URL2 } from './config';

// const createApiInstance = (baseURL) => {
//   const api = axios.create({
//     baseURL,
//   });

//   api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('jwtToken');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return api;
// };

// const Api1 = createApiInstance(EDR_API_URL1);
// const Api2 = createApiInstance(EDR_API_URL2);

// export { Api1, Api2 };

