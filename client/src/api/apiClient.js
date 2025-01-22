import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../stores/authStore.js'; // Import your Zustand store

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/auth', // Base URL for all API calls
  withCredentials: true, // Ensures cookies (e.g., refresh tokens) are included in requests
});

// Utility function to check token expiration
export const checkTokenExpiry = (token) => {
  try {
    const { exp } = jwtDecode(token); // Decode and extract expiration
    const expiryTime = exp * 1000; // Convert expiry to milliseconds
    return Date.now() >= expiryTime; // Check if token is expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat token as expired if decoding fails
  }
};

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const { auth, setAuth } = useAuthStore.getState(); // Access the Zustand store

    // If no access token, proceed without Authorization header
    if (!auth.accessToken) return config;

    // Check if the token is expired
    const isExpired = checkTokenExpiry(auth.accessToken);
    if (isExpired) {
      try {
        // Refresh the token
        const response = await apiClient.post('/refreshToken'); // API call to refresh token
        const newAccessToken = response.data.accessToken;

        // Update Zustand store and localStorage with the new access token
        setAuth({ accessToken: newAccessToken });

        // Update the Authorization header with the new access token
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (err) {
        console.error('Token refresh failed:', err);
        handleLogout(); // Logout on failure
        return Promise.reject(err); // Reject the request
      }
    } else {
      // If token is valid, attach it to Authorization header
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    return config; // Proceed with the updated request
  },
  (error) => Promise.reject(error) // Pass through any request errors
);

// Add a response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized: Logging out...');
      handleLogout(); // Logout on 401 Unauthorized
    }
    return Promise.reject(error); // Pass through other errors
  }
);

// Logout helper function
const handleLogout = async () => {
  try {
    await apiClient.post('/logout'); // Call the backend logout endpoint
  } catch (err) {
    console.error('Logout API failed:', err.message);
  } finally {
    const { logout } = useAuthStore.getState();
    logout(); // Clear Zustand state
    localStorage.removeItem('auth'); // Clear localStorage
    window.location.href = '/login'; // Redirect to login page
  }
};

// Sync logout across tabs
window.addEventListener('storage', (event) => {
  if (event.key === 'auth' && !event.newValue) {
    console.warn('Auth data removed from storage, logging out...');
    handleLogout();
  }
});

export default apiClient;
