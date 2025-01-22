import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({

  auth: JSON.parse(localStorage.getItem('auth')) || { accessToken: null, user: null },
  // Method to update auth data and store it in localStorage
  setAuth: (authData) => {
    const updatedAuth = { ...get().auth, ...authData };
    localStorage.setItem('auth', JSON.stringify(updatedAuth)); // Save to localStorage
    set({ auth: updatedAuth });
  },
  // Method to clear the auth data
  clearAuth: () => {
    localStorage.removeItem('auth'); // Clear localStorage
    set({ auth: { accessToken: null, user: null } });
  },

  // Role selection
  selectedRole: "client", // Default
  setRole: (role)=> set({selectedRole: role}),
  clearRole: ()=> set({selectedRole: "client"}), // set to default
  
  selectedEmail: null,
  setEmail: (email) => set({selectedEmail: email}),
  clearEmail: () => set({selectedEmail: null}),
  


  // Check if the user is logged in
  isLoggedIn: () => !!get().auth.accessToken,

  // Login method that handles the backend authentication
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/emailLogin', { email, password });
      const { accessToken, user } = response.data;
      get().setAuth({ accessToken, user });
      return true;
    } catch (error) {
      console.error('Login Error:', error.response?.data?.message || error.message);
      return false;
    }
  },

  // Logout method to clear the state and redirect the user
  logout: () => {
    get().clearAuth();
  },

  // Set access token directly (called by apiClient when refreshing token)
  setAccessToken: (newAccessToken) => {
    set((state) => {
      const updatedAuth = { ...state.auth, accessToken: newAccessToken };
      localStorage.setItem('auth', JSON.stringify(updatedAuth));
      return { auth: updatedAuth };
    });
  }
}));
