import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useAuthStore } from "../stores/authStore";
import { emailAuth } from "../api/authApi";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GoogleLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  // Pass setError to useGoogleAuth
  const { googleLogin } = useGoogleAuth( setError );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSigningIn(true);
    setError("");

    try {
      const result = await emailAuth(email, password);
      const { accessToken, user } = result;

      setAuth({ accessToken, user });
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <LoginForm
      onGoogleLogin={googleLogin}
      onHandleSubmit={handleSubmit}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onHandleForgotPassword={handleForgotPassword}
      isSigningIn={isSigningIn}
      errorMessage={error} // Display error in the same place
    />
  );
};

export default GoogleLogin;
