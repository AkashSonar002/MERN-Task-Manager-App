import {toast} from 'react-toastify'
export const notify = (message, type) => {
    toast[type](message);
}
export const API_URL = 'http://localhost:5001';



// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Ensure toast is configured (ideally once in your app root)
// export const notify = (message, type = 'info') => {
//   if (toast[type]) {
//     toast[type](message);
//   } else {
//     toast.info(message); // fallback if invalid type
//   }
// };

// export const API_URL = 'http://localhost:5001';