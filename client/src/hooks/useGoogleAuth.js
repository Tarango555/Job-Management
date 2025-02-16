import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api/authApi.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore.js";

export const useGoogleAuth = (setError) => {
  const navigate = useNavigate();
  const { selectedRole, setAuth, clearRole } = useAuthStore();

  const handleGoogleAuth = async (code, isSignUp) => {
    try {
      const payload = isSignUp 
        ? { code, role: selectedRole } // Include role during sign-up
        : { code }; // Role not needed for login

      const response = await googleAuth(payload, isSignUp);

      if (response.status === "success") {
        if (isSignUp) {
          const { user } = response;
          clearRole(); // Clear role from store after successful sign-up
          setAuth({ user });
          navigate('/login');
        } else {
          const { accessToken, user } = response;
          setAuth({ accessToken, user });
          navigate('/dashboard');
        }
      } else {
        // Fallback in case response structure is unexpected
        throw new Error(response.message || "Google authentication failed.");
      }
    } catch (error) {
      // Handle errors and set error messages for the parent component
      if (error.response) {
        const message = error.response.data.message || "An unexpected error occurred.";
        setError(message); // Propagate error to the parent
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const googleSignUp = useGoogleLogin({
    onSuccess: (authResult) => handleGoogleAuth(authResult.code, true),
    onError: (error) => setError("Google sign-up error occurred. Please try again."),
    flow: "auth-code",
  });

  const googleLogin = useGoogleLogin({
    onSuccess: (authResult) => handleGoogleAuth(authResult.code, false),
    onError: (error) => setError("Google login error occurred. Please try again."),
    flow: "auth-code",
  });

  return { googleSignUp, googleLogin };
};
