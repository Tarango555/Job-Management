// import e from "express";
// import React, { useState } from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import { verifyEmail } from "../api/authApi";
// import { useAuthStore } from "../stores/authStore";

// const VerifyCodePage = () => {
//     const {code, setCode} = useState("");
//     const { selectedEmail } = useAuthStore();



//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         try {
//             const result = await verifyEmail(selectedEmail, code)
//         } catch (error) {
            
//         }
//     };


//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <Form 
//         onSubmit={handleSubmit}
//         className="p-4 bg-white shadow rounded-3"
//         style={{ width: "100%", maxWidth: "400px" }}
//       >
//         <h3 className="text-center mb-4 text-primary">Enter Verification Code</h3>
//         <Form.Group className="mb-3" controlId="formCode">
//           <Form.Label>Verification Code</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your verification code"
//             name="verificationCode"
//             autoComplete="one-time-code"
//             onChange={(e)=>setCode(e.target.value)}
//             required
//             className="rounded py-3"
//           />
//         </Form.Group>
//         <Button
//           type="submit"
//           className="w-100 rounded py-2"
//           variant="primary"
//         >
//           Verify Code
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default VerifyCodePage;

import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { verifyEmail } from "../api/authApi";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const VerifyCodePage = () => {
  const [code, setCode] = useState(""); // State to hold verification code
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const { selectedEmail } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner
    try {
      const result = await verifyEmail(selectedEmail, code);
      if (result.status === 200) {
        navigate("/sign-up-page");
    } else {
        console.error("Verification failed");
        navigate("/not-found");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow rounded-3"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary">Enter Verification Code</h3>
        <Form.Group className="mb-3" controlId="formCode">
          <Form.Label>Verification Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your verification code"
            name="verificationCode"
            autoComplete="one-time-code"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            required
            className="rounded py-3"
          />
        </Form.Group>
        <Button
          type="submit"
          className="w-100 rounded py-2 d-flex align-items-center justify-content-center"
          variant="primary"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default VerifyCodePage;