// // import { useGoogleLogin } from "@react-oauth/google";
// // import { googleAuth, emailAuth } from "../api/authApi.js";
// // import { useNavigate } from 'react-router-dom';
// // import LoginForm from "./LoginForm.jsx";
// // import { useAuthStore } from "../stores/authStore.js";
// // import { useState } from "react";
// // import { useGoogleAuth } from '../hooks/useGoogleAuth';

// // const GoogleLogin = () => {
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [isSigningIn, setIsSigningIn] = useState(false); // New state for button loading
// //     const [error, setError] = useState(""); // State to store error messages
// //     const navigate = useNavigate();
// //     const setAuth = useAuthStore(state => state.setAuth);
// //     const { googleLogin } = useGoogleAuth();

// //     const handleSubmit = async (event) => {

// //         event.preventDefault();
// //         setIsSigningIn(true); // Start loading state
// //         setError(""); // Clear previous errors

// //         try {
            
// //             const result = await emailAuth(email, password);
// //             const { accessToken, user } = result;
// //             // Update global state and persist data
// //             setAuth({ accessToken, user });
// //             // Redirect to dashboard
// //             navigate('/dashboard'); // Optional: RefreshHandler can handle this too

// //         } catch (error) {
// //             setError(error.message); // Set the error message
// //         } finally {
// //             setIsSigningIn(false); // End loading state
// //         }
// //     };

// //     const handleForgotPassword = (e) => {
// //         e.preventDefault();
// //         navigate('/forgot-password');
// //     }

// //     return (
// //         <div>
// //             <LoginForm
// // 				onGoogleLogin={googleLogin}
// // 				onHandleSubmit={handleSubmit}
// //                 onEmailChange={(e) => setEmail(e.target.value)}
// //                 onPasswordChange={(e) => setPassword(e.target.value)}
// //                 onHandleForgotPassword = {handleForgotPassword}
// //                 isSigningIn={isSigningIn}
// //                 errorMessage={error} // Pass error message to LoginForm
// // 			/>
// //         </div>
// //     );
// // };

// // export default GoogleLogin;

// import { useGoogleAuth } from "../hooks/useGoogleAuth";
// import { useAuthStore } from "../stores/authStore";
// import { emailAuth } from "../api/authApi";
// import LoginForm from "./LoginForm";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const GoogleLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSigningIn, setIsSigningIn] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const setAuth = useAuthStore((state) => state.setAuth);
//   const { googleLogin } = useGoogleAuth();

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent page reload
//     setIsSigningIn(true);
//     setError("");

//     try {
//       const result = await emailAuth(email, password);
//       const { accessToken, user } = result;

//       setAuth({ accessToken, user }); // Update global auth state
//       navigate("/dashboard"); // Redirect to dashboard
//     } catch (error) {
//       setError(error.message); // Display error message
//     } finally {
//       setIsSigningIn(false);
//     }
//   };

//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     navigate("/forgot-password");
//   };

//   return (
//     <LoginForm
//       onGoogleLogin={googleLogin}
//       onHandleSubmit={handleSubmit}
//       onEmailChange={(e) => setEmail(e.target.value)}
//       onPasswordChange={(e) => setPassword(e.target.value)}
//       onHandleForgotPassword={handleForgotPassword}
//       isSigningIn={isSigningIn}
//       errorMessage={error}
//     />
//   );
// };

// export default GoogleLogin;

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
