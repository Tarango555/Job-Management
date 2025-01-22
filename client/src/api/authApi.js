import apiClient from "./apiClient";

export const googleAuth = async (payload, isSignUp=false) => {
    try {
        const endpoint = isSignUp ? "/google-sign-up" : "/google-login"; // Dynamically set the endpoint
        const response = await apiClient.post(endpoint, payload);
        return response.data;
    } catch (error) {
        console.error('Axios Google request error:', error.response || error.message);
        throw error;
    }
};


export const sendCodeToEmail = async (email) => {
    try {
        const response = await apiClient.post('/send-verification-code', {email});
        return response;
    } catch (error) {
        console.error('Axios sendCodeToEmail request error:', error.response || error.message);
        throw error;
    }
}

export const verifyEmail = async (email, code) => {
    try {
        const response = await apiClient.post('/verify-email', {email, code});
        return response;
    } catch (error) {
        console.error('Axios sendCodeToEmail request error:', error.response || error.message);
        throw error;
    }
}

export const signUp = async (payload) => {
    try {
        const response = await apiClient.post('/sign-up', payload);
        return response;
    } catch (error) {
        console.error('Axios sendCodeToEmail request error:', error.response || error.message);
        throw error;
    }
}

export const emailAuth = async (email, password) => {
    try {
        const response = await apiClient.post('/email-login', {email, password});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message); // Pass the server error message
        } else {
            throw new Error("An unexpected error occurred."); // Generic error message
        }
    }
};