// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import GoogleLogin from './components/GoogleLogin';
// import Dashboard from './components/Dashboard';
// import RefreshHandler from './utils/RefreshHandler';
// import NotFound from './components/NotFound';
// import ResponsiveNavbar from './components/ResponsiveNavbar_02';
// import ForgotPasswordPage from './components/ForgotPasswordPage';
// import ResetPasswordPage from './components/ResetPasswordPage.jsx';
// import { useAuthStore } from './stores/authStore';
// import RolePage from './components/RolePage.jsx';
// import SignUpOptionsPage from './components/SignUpOptionsPage.jsx';
// import RequestEmailPage from './components/RequestEmailPage.jsx';
// import VerifyCodePage from './components/VerifyCodePage.jsx';
// import SignUpForm from './components/SignUpForm.jsx';
// import ClientDashboardLayout from './components/layouts/ClientDashboardLayout.jsx';
// import JobPostPage from './pages/JobPostPage.jsx';

// function App() {
//     const isLoggedIn = useAuthStore((state) => !!state.auth.accessToken);

//     return (
//         <GoogleOAuthProvider clientId="594020140961-v65bf3ds968j4gg4sd0356be32s8fj33.apps.googleusercontent.com">
//             <BrowserRouter>
//                 <RefreshHandler />
//                 {/* Render Navbar only for public routes */}
//                 {!isLoggedIn && <ResponsiveNavbar isLoggedIn={isLoggedIn} />}
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route path="/" element={<h1>Welcome to Jobster!</h1>} />
//                     <Route path="/login" element={<GoogleLogin />} />
//                     <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//                     <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
//                     <Route path="/role-page" element={<RolePage />} />
//                     <Route path="/sign-up-options" element={<SignUpOptionsPage />} />
//                     <Route path="/request-email" element={<RequestEmailPage />} />
//                     <Route path="/verify-code-page" element={<VerifyCodePage />} />
//                     <Route path="/sign-up-page" element={<SignUpForm />} />
//                     <Route path="/not-found" element={<NotFound />} />
                    
//                     {/* Client Dashboard Routes */}
//                     <Route
//                         path="/dashboard/*"
//                         element={
//                             isLoggedIn ? (
//                                 <ClientDashboardLayout>
//                                     <Routes>
//                                         <Route path="/" element={<Dashboard />} />
//                                         <Route path="/job-post-page" element={<JobPostPage />} />
//                                         {/* Add more dashboard-related routes here */}
//                                     </Routes>
//                                 </ClientDashboardLayout>
//                             ) : (
//                                 <Navigate to="/login" />
//                             )
//                         }
//                     />

//                     {/* Catch-All Route */}
//                     <Route path="*" element={<NotFound />} />
//                 </Routes>
//             </BrowserRouter>
//         </GoogleOAuthProvider>
//     );
// }

// export default App;

import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import Dashboard from "./components/Dashboard";
import RefreshHandler from "./utils/RefreshHandler";
import NotFound from "./components/NotFound";
import ResponsiveNavbar from "./components/ResponsiveNavbar_02";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";
import { useAuthStore } from "./stores/authStore";
import RolePage from "./components/RolePage.jsx";
import SignUpOptionsPage from "./components/SignUpOptionsPage.jsx";
import RequestEmailPage from "./components/RequestEmailPage.jsx";
import VerifyCodePage from "./components/VerifyCodePage.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import ClientDashboardLayout from "./components/layouts/ClientDashboardLayout.jsx";
import JobPostPage from "./pages/JobPostPage.jsx";

function App() {
    const isLoggedIn = useAuthStore((state) => !!state.auth.accessToken);

    return (
        <GoogleOAuthProvider clientId="594020140961-v65bf3ds968j4gg4sd0356be32s8fj33.apps.googleusercontent.com">
            <BrowserRouter>
                <RefreshHandler />
                {/* Render Navbar only for public routes */}
                {!isLoggedIn && <ResponsiveNavbar isLoggedIn={isLoggedIn} />}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<h1>Welcome to Jobster!</h1>} />
                    <Route path="/login" element={<GoogleLogin />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                    <Route path="/role-page" element={<RolePage />} />
                    <Route path="/sign-up-options" element={<SignUpOptionsPage />} />
                    <Route path="/request-email" element={<RequestEmailPage />} />
                    <Route path="/verify-code-page" element={<VerifyCodePage />} />
                    <Route path="/sign-up-page" element={<SignUpForm />} />
                    <Route path="/not-found" element={<NotFound />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard/*"
                        element={
                            isLoggedIn ? (
                                <ClientDashboardLayout />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    >
                        {/* Nested Routes */}
                        <Route index element={<Dashboard />} />
                        <Route path="job-post-page" element={<JobPostPage />} />
                    </Route>

                    {/* Catch-All Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
